/**
 * DentalCare Theme - Core Main JavaScript Actions
 *
 * Handles client-side interactivity, dynamic booking submissions, and smooth scroll transitions.
 *
 * @package DentalCare
 * @since 1.0.0
 */

jQuery(document).ready(function($) {
    "use strict";

    // Initialize Lucide Icons if available
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Dynamic Before & After Image Slider on Home Page
    var $rangeInput = $('#slider-range-input');
    var $clippedImage = $('#after-image-clip');
    var $sliderHandle = $('#slider-handle');

    if ($rangeInput.length && $clippedImage.length && $sliderHandle.length) {
        $rangeInput.on('input change', function() {
            var value = $(this).val();
            $clippedImage.css('width', value + '%');
            $sliderHandle.css('left', value + '%');
        });
    }

    // AJAX Appointment Form Submission with Localized Nonce
    var $bookingForm = $('#dc-wp-booking-form');
    var $formFeedback = $('.form-feedback');

    if ($bookingForm.length) {
        $bookingForm.on('submit', function(e) {
            e.preventDefault();
            
            var $submitBtn = $bookingForm.find('button[type="submit"]');
            var originalBtnText = $submitBtn.text();
            
            $submitBtn.prop('disabled', true).text('Processing Secured Request...');
            $formFeedback.removeClass('hidden success error').addClass('info').text('Routing secure submission to clinic CRM...').fadeIn();

            var formData = {
                action: 'dentalcare_submit_booking',
                nonce: dcAjax.nonce,
                patient_name: $bookingForm.find('input[name="patient_name"]').val(),
                patient_phone: $bookingForm.find('input[name="patient_phone"]').val(),
                patient_email: $bookingForm.find('input[name="patient_email"]').val(),
                treatment_id: $bookingForm.find('select[name="treatment_id"]').val(),
                appt_date: $bookingForm.find('input[name="appt_date"]').val(),
                appt_time: $bookingForm.find('input[name="appt_time"]').val(),
                appt_notes: $bookingForm.find('textarea[name="appt_notes"]').val()
            };

            $.ajax({
                url: dcAjax.ajaxUrl,
                type: 'POST',
                data: formData,
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        $formFeedback.removeClass('info error').addClass('success')
                            .html('<strong style="color: #25D366;">Submission Secured!</strong><br>' + response.data.message);
                        $bookingForm[0].reset();
                    } else {
                        $formFeedback.removeClass('info success').addClass('error')
                            .html('<strong style="color: #EF4444;">Error:</strong> ' + response.data.message);
                    }
                },
                error: function(xhr, status, error) {
                    $formFeedback.removeClass('info success').addClass('error')
                        .html('<strong style="color: #EF4444;">Network Error:</strong> Unable to connect to dental servers. Please try again.');
                    console.error('AJAX Error:', error);
                },
                complete: function() {
                    $submitBtn.prop('disabled', false).text(originalBtnText);
                }
            });
        });
    }

    // Smooth Scroll for Navigation Anchors
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 90
            }, 800);
        }
    });
});
