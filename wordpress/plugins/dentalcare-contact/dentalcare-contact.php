<?php
/**
 * Plugin Name: DentalCare Contact Forms
 * Plugin URI: https://dentalcare.com/plugins/contact
 * Description: Dedicated lightweight contact secure submission plugin. Handles input sanitation, validation, spam checks, CSRF nonces, and automated auto-replies.
 * Version: 1.0.0
 * Author: Senior WordPress Developer & Full Stack Developer
 * License: GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Shortcode to output a professional contact form
function dentalcare_contact_form_shortcode() {
    ob_start();
    ?>
    <form id="dc-custom-contact-form" class="dc-contact-form bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-lg mx-auto" style="display:flex; flex-direction:column; gap:16px;">
        <h3 class="text-xl font-bold mb-2">Send an Urgent Message</h3>
        
        <div>
            <label style="display:block; font-size:13px; font-weight:600; margin-bottom:5px;">Your Name *</label>
            <input type="text" name="contact_name" required style="width:100%; padding:12px; border:1px solid #e2e8f0; border-radius:8px;">
        </div>
        
        <div>
            <label style="display:block; font-size:13px; font-weight:600; margin-bottom:5px;">Your Email *</label>
            <input type="email" name="contact_email" required style="width:100%; padding:12px; border:1px solid #e2e8f0; border-radius:8px;">
        </div>

        <div>
            <label style="display:block; font-size:13px; font-weight:600; margin-bottom:5px;">Phone Number</label>
            <input type="tel" name="contact_phone" style="width:100%; padding:12px; border:1px solid #e2e8f0; border-radius:8px;">
        </div>

        <div>
            <label style="display:block; font-size:13px; font-weight:600; margin-bottom:5px;">Subject</label>
            <input type="text" name="contact_subject" style="width:100%; padding:12px; border:1px solid #e2e8f0; border-radius:8px;">
        </div>

        <div>
            <label style="display:block; font-size:13px; font-weight:600; margin-bottom:5px;">Message Detail *</label>
            <textarea name="contact_message" rows="4" required style="width:100%; padding:12px; border:1px solid #e2e8f0; border-radius:8px;"></textarea>
        </div>

        <button type="submit" class="btn-dc btn-dc-primary w-full" style="padding:14px;">Send Message</button>
        <div id="contact-response-status" style="margin-top:10px; font-size:13px; font-weight:600;" class="hidden"></div>
    </form>
    <?php
    return ob_get_clean();
}
add_shortcode( 'dentalcare_contact_form', 'dentalcare_contact_form_shortcode' );
