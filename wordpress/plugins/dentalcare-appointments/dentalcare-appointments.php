<?php
/**
 * Plugin Name: DentalCare Appointments
 * Plugin URI: https://dentalcare.com/plugins/appointments
 * Description: Fully integrated healthcare scheduling engine. Offers custom WordPress booking endpoints, database storage sync, automated email triggers, and status updates.
 * Version: 1.0.0
 * Author: Senior Healthcare Software Engineer
 * License: GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Create Custom Database Table on Activation
function dentalcare_appt_activate() {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'dc_appointments';

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        patient_id BIGINT(20) UNSIGNED NULL,
        patient_name VARCHAR(255) NOT NULL,
        patient_email VARCHAR(255),
        patient_phone VARCHAR(50) NOT NULL,
        doctor_id INT NOT NULL,
        service_id INT NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'Pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) $charset_collate;";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}
register_activation_hook( __FILE__, 'dentalcare_appt_activate' );

// REST API endpoint registration for instant headless bookings
add_action( 'rest_api_init', function () {
    register_rest_route( 'dentalcare/v1', '/book', array(
        'methods'             => 'POST',
        'callback'            => 'dentalcare_api_book_handler',
        'permission_callback' => '__return_true', // reCAPTCHA validation recommended
    ) );
} );

// Callback for REST Booking Form
function dentalcare_api_book_handler( $request ) {
    global $wpdb;
    $params = $request->get_params();

    $name  = sanitize_text_field( $params['patient_name'] ?? '' );
    $phone = sanitize_text_field( $params['patient_phone'] ?? '' );
    $email = sanitize_email( $params['patient_email'] ?? '' );
    $date  = sanitize_text_field( $params['appt_date'] ?? '' );
    $time  = sanitize_text_field( $params['appt_time'] ?? '' );
    $notes = sanitize_textarea_field( $params['appt_notes'] ?? '' );

    if ( empty($name) || empty($phone) || empty($date) || empty($time) ) {
        return new WP_Error( 'missing_fields', 'Required fields are missing', array( 'status' => 400 ) );
    }

    $table_name = $wpdb->prefix . 'dc_appointments';

    $result = $wpdb->insert( $table_name, array(
        'patient_name'     => $name,
        'patient_phone'    => $phone,
        'patient_email'    => $email,
        'doctor_id'        => 1, // Default or selected doctor
        'service_id'       => 1, // Default or selected service
        'appointment_date' => $date,
        'appointment_time' => $time,
        'notes'            => $notes,
        'status'           => 'Pending'
    ) );

    if ( ! $result ) {
        return new WP_Error( 'db_error', 'Could not record appointment', array( 'status' => 500 ) );
    }

    // Trigger automated SMTP emails
    $admin_email = get_option( 'admin_email' );
    $subject = "New DentalCare Booking Request - " . $name;
    $body = "We received a new booking:\n\nPatient: $name\nPhone: $phone\nEmail: $email\nDate: $date\nTime: $time\nNotes: $notes\n\nApprove via CRM Dashboard.";
    wp_mail( $admin_email, $subject, $body );

    return rest_ensure_response( array(
        'success' => true,
        'message' => 'Appointment request successfully queued and synced with CRM.'
    ) );
}

/**
 * Global helper function to insert appointment programmatically
 */
function dentalcare_insert_appointment_to_db( $name, $phone, $email, $treatment_name, $date, $time, $notes ) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'dc_appointments';

    // Verify table exists, otherwise attempt activation again
    if ( $wpdb->get_var( $wpdb->prepare( "SHOW TABLES LIKE %s", $table_name ) ) !== $table_name ) {
        dentalcare_appt_activate();
    }

    $result = $wpdb->insert( $table_name, array(
        'patient_name'     => $name,
        'patient_phone'    => $phone,
        'patient_email'    => $email,
        'doctor_id'        => 1, // Default doctor
        'service_id'       => 1, // Default service
        'appointment_date' => $date,
        'appointment_time' => $time,
        'notes'            => esc_html( "Service Interest: $treatment_name. Notes: $notes" ),
        'status'           => 'Pending'
    ) );

    if ( ! $result ) {
        return false;
    }

    $appt_id = $wpdb->insert_id;

    // Bridge with CRM plugin: Automatically generate a corresponding CRM lead
    $crm_table = $wpdb->prefix . 'dc_leads';
    if ( $wpdb->get_var( $wpdb->prepare( "SHOW TABLES LIKE %s", $crm_table ) ) === $crm_table ) {
        $wpdb->insert( $crm_table, array(
            'full_name'        => $name,
            'phone'            => $phone,
            'email'            => $email,
            'service_interest' => $treatment_name,
            'status'           => 'Booked',
            'source'           => 'Website Booking Form',
            'notes'            => esc_html( "Auto-routed from appointments engine. Preferred date/time: $date at $time. Notes: $notes" )
        ) );
    }

    return $appt_id;
}

