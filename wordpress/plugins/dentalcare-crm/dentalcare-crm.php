<?php
/**
 * Plugin Name: DentalCare CRM
 * Plugin URI: https://dentalcare.com/plugins/crm
 * Description: Enterprise Patient and Lead management system for DentalCare clinics. Automatically bridges wordpress lead generation with administrative workflow pipelines.
 * Version: 1.0.0
 * Author: Senior CRM Architect & Health Software Engineer
 * License: GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Database activation hook to create/confirm custom tables
function dentalcare_crm_activate() {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'dc_leads';

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50) NOT NULL,
        service_interest VARCHAR(100) DEFAULT 'General Consultation',
        status ENUM('New', 'Contacted', 'Qualified', 'Booked', 'Closed') DEFAULT 'New',
        source VARCHAR(100) DEFAULT 'Website Form',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) $charset_collate;";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}
register_activation_hook( __FILE__, 'dentalcare_crm_activate' );

// Add custom menu page in WordPress Admin for Lead Management Dashboard
function dentalcare_crm_admin_menu() {
    add_menu_page(
        'DentalCare CRM',
        'Clinic CRM',
        'manage_options',
        'dentalcare-crm',
        'dentalcare_crm_render_page',
        'dashicons-groups',
        25
    );
}
add_action( 'admin_menu', 'dentalcare_crm_admin_menu' );

// Render Admin CRM Dashboard Page
function dentalcare_crm_render_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'dc_leads';
    
    // Simple filter handling
    $status_filter = isset($_GET['lead_status']) ? sanitize_text_field($_GET['lead_status']) : '';
    
    if ($status_filter) {
        $leads = $wpdb->get_results( $wpdb->prepare("SELECT * FROM $table_name WHERE status = %s ORDER BY created_at DESC", $status_filter) );
    } else {
        $leads = $wpdb->get_results( "SELECT * FROM $table_name ORDER BY created_at DESC" );
    }
    
    ?>
    <div class="wrap" style="background:#f1f5f9; padding:20px; border-radius:10px;">
        <h1 style="font-family:'Poppins', sans-serif; color:#0f4c81; font-weight:700;">DentalCare CRM Dashboard</h1>
        <p>Manage patient pipelines, review international dental consults, and track leads status.</p>
        
        <!-- Filter Tabs -->
        <div style="margin:20px 0; display:flex; gap:10px;">
            <a href="?page=dentalcare-crm" class="button <?php echo empty($status_filter)?'button-primary':'';?>">All Leads</a>
            <a href="?page=dentalcare-crm&lead_status=New" class="button <?php echo $status_filter==='New'?'button-primary':'';?>">New</a>
            <a href="?page=dentalcare-crm&lead_status=Contacted" class="button <?php echo $status_filter==='Contacted'?'button-primary':'';?>">Contacted</a>
            <a href="?page=dentalcare-crm&lead_status=Qualified" class="button <?php echo $status_filter==='Qualified'?'button-primary':'';?>">Qualified</a>
            <a href="?page=dentalcare-crm&lead_status=Booked" class="button <?php echo $status_filter==='Booked'?'button-primary':'';?>">Booked</a>
        </div>

        <table class="wp-list-table widefat fixed striped" style="box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-radius:8px; overflow:hidden;">
            <thead>
                <tr style="background:#0f4c81; color:#fff;">
                    <th style="padding:12px; color:white;"><strong>Created Date</strong></th>
                    <th style="padding:12px; color:white;"><strong>Patient Name</strong></th>
                    <th style="padding:12px; color:white;"><strong>Phone</strong></th>
                    <th style="padding:12px; color:white;"><strong>Email</strong></th>
                    <th style="padding:12px; color:white;"><strong>Service Interest</strong></th>
                    <th style="padding:12px; color:white;"><strong>Source</strong></th>
                    <th style="padding:12px; color:white;"><strong>Status</strong></th>
                    <th style="padding:12px; color:white;"><strong>Notes</strong></th>
                </tr>
            </thead>
            <tbody>
                <?php if ( !empty($leads) ) : ?>
                    <?php foreach($leads as $lead) : ?>
                        <tr>
                            <td><?php echo esc_html( date('M d, Y h:i A', strtotime($lead->created_at)) ); ?></td>
                            <td><strong><?php echo esc_html($lead->full_name); ?></strong></td>
                            <td><?php echo esc_html($lead->phone); ?></td>
                            <td><?php echo esc_html($lead->email); ?></td>
                            <td><span style="background:#e0f7fa; color:#006064; padding:3px 8px; border-radius:10px; font-size:11px;"><?php echo esc_html($lead->service_interest); ?></span></td>
                            <td><?php echo esc_html($lead->source); ?></td>
                            <td>
                                <span class="badge" style="
                                    font-weight:600; font-size:11px; padding:4px 8px; border-radius:12px;
                                    background:<?php echo $lead->status === 'New' ? '#ffebee' : ($lead->status === 'Booked' ? '#e8f5e9' : '#fff3e0'); ?>;
                                    color:<?php echo $lead->status === 'New' ? '#c62828' : ($lead->status === 'Booked' ? '#2e7d32' : '#ef6c00'); ?>;
                                "><?php echo esc_html($lead->status); ?></span>
                            </td>
                            <td><span style="font-size:12px; color:#555;"><?php echo esc_html($lead->notes); ?></span></td>
                        </tr>
                    <?php endforeach; ?>
                <?php else : ?>
                    <tr>
                        <td colspan="8" style="text-align:center; padding:20px;">No patient leads captured yet.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}
