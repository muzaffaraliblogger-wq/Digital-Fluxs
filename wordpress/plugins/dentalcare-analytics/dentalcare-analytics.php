<?php
/**
 * Plugin Name: DentalCare Analytics
 * Plugin URI: https://dentalcare.com/plugins/analytics
 * Description: Real-time analytics engine to monitor patient appointments, traffic conversions, visitor acquisition rates, and treatment performance.
 * Version: 1.0.0
 * Author: Senior CRM Architect & Health Software Engineer
 * License: GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Simple cookie-based tracking to avoid duplicate stats and log page hits
function dentalcare_track_visitor() {
    if ( is_admin() || wp_is_json_request() ) {
        return;
    }

    if ( ! isset( $_COOKIE['dc_visitor_tracked'] ) ) {
        // Track visual hits / increment visitor metric in DB
        global $wpdb;
        $table_name = $wpdb->prefix . 'dc_analytics_visitors';
        
        // Suppress errors if table doesn't exist yet
        $wpdb->suppress_errors();
        
        $wpdb->query("INSERT INTO $table_name (ip_hash, visited_at) VALUES (MD5('" . $_SERVER['REMOTE_ADDR'] . "'), NOW())");
        
        // Set cookie for 24 hours
        setcookie( 'dc_visitor_tracked', '1', time() + DAY_IN_SECONDS, COOKIEPATH, COOKIE_DOMAIN );
    }
}
add_action( 'template_redirect', 'dentalcare_track_visitor' );
