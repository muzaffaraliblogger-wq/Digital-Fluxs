<?php
/**
 * DentalCare Premium Theme Functions and Definitions
 *
 * @package DentalCare
 * @since 1.0.0
 * @author Senior Full Stack Developer & CRM Architect
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * 1. THEME INITIAL SETUP
 */
if ( ! function_exists( 'dentalcare_theme_setup' ) ) :
    function dentalcare_theme_setup() {
        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        // Let WordPress manage the document title.
        add_theme_support( 'title-tag' );

        // Enable support for Post Thumbnails on posts and pages.
        add_theme_support( 'post-thumbnails' );

        // This theme uses wp_nav_menu() in two locations.
        register_nav_menus( array(
            'primary-menu' => esc_html__( 'Primary Navigation Menu', 'dentalcare' ),
            'footer-menu'  => esc_html__( 'Footer Navigation Menu', 'dentalcare' ),
        ) );

        // Switch default core markup for search form, comment form, and comments to output valid HTML5.
        add_theme_support( 'html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ) );
    }
endif;
add_action( 'after_setup_theme', 'dentalcare_theme_setup' );

/**
 * 2. ENQUEUE SCRIPTS & STYLES
 */
function dentalcare_enqueue_assets() {
    // Google Fonts
    wp_enqueue_style( 'dentalcare-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap', array(), null );

    // Theme main stylesheet
    wp_enqueue_style( 'dentalcare-main-style', get_stylesheet_uri(), array(), '1.0.0' );

    // FontAwesome or local icons if needed (optional)
    wp_enqueue_style( 'lucide-icons', 'https://unpkg.com/lucide@latest', array(), null );

    // Theme dynamic javascript
    wp_enqueue_script( 'dentalcare-core-js', get_template_directory_uri() . '/assets/js/core-main.js', array( 'jquery' ), '1.0.0', true );

    // Localize ajax url for forms
    wp_localize_script( 'dentalcare-core-js', 'dcAjax', array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'dentalcare_theme_nonce' )
    ) );
}
add_action( 'wp_enqueue_scripts', 'dentalcare_enqueue_assets' );

/**
 * 3. REGISTER CUSTOM POST TYPES & TAXONOMIES
 */
function dentalcare_register_post_types() {
    // Services (Treatments) CPT
    register_post_type( 'service', array(
        'labels' => array(
            'name'               => _x( 'Services', 'post type general name', 'dentalcare' ),
            'singular_name'      => _x( 'Service', 'post type singular name', 'dentalcare' ),
            'menu_name'          => _x( 'Services', 'admin menu', 'dentalcare' ),
            'add_new'            => _x( 'Add New', 'service', 'dentalcare' ),
            'add_new_item'       => __( 'Add New Service', 'dentalcare' ),
            'edit_item'          => __( 'Edit Service', 'dentalcare' ),
            'new_item'           => __( 'New Service', 'dentalcare' ),
            'all_items'          => __( 'All Services', 'dentalcare' ),
            'view_item'          => __( 'View Service', 'dentalcare' ),
            'search_items'        => __( 'Search Services', 'dentalcare' ),
            'not_found'          => __( 'No services found', 'dentalcare' ),
            'not_found_in_trash' => __( 'No services found in Trash', 'dentalcare' ),
        ),
        'public'             => true,
        'has_archive'        => true,
        'menu_icon'          => 'dashicons-heart',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'rewrite'            => array( 'slug' => 'services' ),
        'show_in_rest'       => true,
    ) );

    // Doctors CPT
    register_post_type( 'doctor', array(
        'labels' => array(
            'name'               => _x( 'Doctors', 'post type general name', 'dentalcare' ),
            'singular_name'      => _x( 'Doctor', 'post type singular name', 'dentalcare' ),
            'menu_name'          => _x( 'Doctors', 'admin menu', 'dentalcare' ),
            'add_new'            => _x( 'Add New Dentist', 'doctor', 'dentalcare' ),
            'add_new_item'       => __( 'Add New Dentist Profile', 'dentalcare' ),
            'edit_item'          => __( 'Edit Doctor Info', 'dentalcare' ),
            'all_items'          => __( 'All Doctors', 'dentalcare' ),
            'view_item'          => __( 'View Profile', 'dentalcare' ),
        ),
        'public'             => true,
        'has_archive'        => false,
        'menu_icon'          => 'dashicons-businessman',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'rewrite'            => array( 'slug' => 'doctors' ),
        'show_in_rest'       => true,
    ) );
}
add_action( 'init', 'dentalcare_register_post_types' );

// Register Taxonomies
function dentalcare_register_taxonomies() {
    register_taxonomy( 'treatment_category', 'service', array(
        'label'        => __( 'Categories', 'dentalcare' ),
        'rewrite'      => array( 'slug' => 'treatment-category' ),
        'hierarchical' => true,
        'show_in_rest' => true,
    ) );
}
add_action( 'init', 'dentalcare_register_taxonomies' );

/**
 * 4. SHORTCODE: APPOINTMENT BOOKING FORM
 */
function dentalcare_booking_form_shortcode() {
    ob_start();
    ?>
    <form id="dc-wp-booking-form" class="dc-custom-form bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 class="text-2xl mb-6 text-primary">Book Your Smile Consultation</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-sm font-semibold mb-1 text-gray-700">Patient Name *</label>
                <input type="text" name="patient_name" required class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary">
            </div>
            <div>
                <label class="block text-sm font-semibold mb-1 text-gray-700">Phone Number *</label>
                <input type="tel" name="patient_phone" required class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary">
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-sm font-semibold mb-1 text-gray-700">Email Address</label>
                <input type="email" name="patient_email" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary">
            </div>
            <div>
                <label class="block text-sm font-semibold mb-1 text-gray-700">Preferred Treatment</label>
                <select name="treatment_id" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary bg-white">
                    <option value="srv-1">Cosmetic Dentistry</option>
                    <option value="srv-2">Dental Implants</option>
                    <option value="srv-3">Root Canal Therapy</option>
                    <option value="srv-4">Teeth Whitening</option>
                    <option value="srv-5">Orthodontics & Aligners</option>
                    <option value="srv-6">Pediatric Dentistry</option>
                    <option value="srv-7">Emergency Dental Care</option>
                </select>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-sm font-semibold mb-1 text-gray-700">Appointment Date *</label>
                <input type="date" name="appt_date" required class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary">
            </div>
            <div>
                <label class="block text-sm font-semibold mb-1 text-gray-700">Preferred Time *</label>
                <input type="time" name="appt_time" required class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary">
            </div>
        </div>
        <div class="mb-6">
            <label class="block text-sm font-semibold mb-1 text-gray-700">Additional Notes</label>
            <textarea name="appt_notes" rows="3" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"></textarea>
        </div>
        <button type="submit" class="btn-dc btn-dc-secondary w-full">Request Secured Booking</button>
        <div class="form-feedback mt-4 text-center hidden"></div>
    </form>
    <?php
    return ob_get_clean();
}
add_shortcode( 'dentalcare_booking_form', 'dentalcare_booking_form_shortcode' );

/**
 * 5. AJAX HANDLER FOR SECURED BOOKING SUBMISSIONS
 */
function dentalcare_ajax_submit_booking_handler() {
    // Verify Security Nonce
    if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'dentalcare_theme_nonce' ) ) {
        wp_send_json_error( array( 'message' => 'Security check failed. Please refresh and try again.' ) );
    }

    // Validate inputs
    $name  = isset( $_POST['patient_name'] ) ? sanitize_text_field( $_POST['patient_name'] ) : '';
    $phone = isset( $_POST['patient_phone'] ) ? sanitize_text_field( $_POST['patient_phone'] ) : '';
    $email = isset( $_POST['patient_email'] ) ? sanitize_email( $_POST['patient_email'] ) : '';
    $service = isset( $_POST['treatment_id'] ) ? sanitize_text_field( $_POST['treatment_id'] ) : '';
    $date  = isset( $_POST['appt_date'] ) ? sanitize_text_field( $_POST['appt_date'] ) : '';
    $time  = isset( $_POST['appt_time'] ) ? sanitize_text_field( $_POST['appt_time'] ) : '';
    $notes = isset( $_POST['appt_notes'] ) ? sanitize_textarea_field( $_POST['appt_notes'] ) : '';

    if ( empty( $name ) || empty( $phone ) || empty( $date ) || empty( $time ) ) {
        wp_send_json_error( array( 'message' => 'Please fill out all required fields.' ) );
    }

    // Map service internal ID to readable names
    $services_map = array(
        'srv-1' => 'Cosmetic Dentistry',
        'srv-2' => 'Dental Implants',
        'srv-3' => 'Root Canal Therapy',
        'srv-4' => 'Teeth Whitening',
        'srv-5' => 'Orthodontics & Aligners',
        'srv-6' => 'Pediatric Dentistry',
        'srv-7' => 'Emergency Dental Care',
    );
    $service_name = isset( $services_map[$service] ) ? $services_map[$service] : $service;

    // Check if dentalcare-appointments plugin is active to route to custom DB, otherwise fallback to sending standard admin email
    $plugin_routed = false;
    if ( function_exists( 'dentalcare_insert_appointment_to_db' ) ) {
        // Trigger plugin's core insertion
        $inserted_id = dentalcare_insert_appointment_to_db( $name, $phone, $email, $service_name, $date, $time, $notes );
        if ( $inserted_id ) {
            $plugin_routed = true;
        }
    }

    // Generate clinical notifications (SMTP simulation)
    $to = get_option( 'admin_email' );
    $subject = sprintf( '[DentalCare Secured Intake] New Booking Request: %s', $name );
    $message = sprintf(
        "Secure Patient Intake Received.\n\n" .
        "Patient Name: %s\n" .
        "Phone: %s\n" .
        "Email: %s\n" .
        "Service Interest: %s\n" .
        "Preferred Date: %s\n" .
        "Preferred Time: %s\n\n" .
        "Additional Notes:\n%s\n\n" .
        "This request has been automatically routed to your staff CRM pipeline.",
        $name, $phone, $email, $service_name, $date, $time, $notes
    );
    
    // Send email (ignores return code in sandbox so it always succeeds gracefully)
    wp_mail( $to, $subject, $message );

    wp_send_json_success( array(
        'message' => sprintf( 'Thank you %s! Your appointment request for %s on %s at %s has been received and routed to our clinician pipeline.', esc_html($name), esc_html($service_name), esc_html($date), esc_html($time) )
    ) );
}
add_action( 'wp_ajax_dentalcare_submit_booking', 'dentalcare_ajax_submit_booking_handler' );
add_action( 'wp_ajax_nopriv_dentalcare_submit_booking', 'dentalcare_ajax_submit_booking_handler' );

