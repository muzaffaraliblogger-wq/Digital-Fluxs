<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package DentalCare
 */

get_header();
?>

<main id="primary" class="site-main text-center" style="padding: 120px 0; background-color: var(--neutral-light);">
    <div class="container" style="max-width: 600px;">
        <h1 style="font-size: 120px; color: var(--secondary-color); font-weight: 800; line-height: 1; margin-bottom: 20px;">404</h1>
        <h2 style="font-size: 32px; color: var(--primary-color); margin-bottom: 20px;">Smile, It's Just a Broken Link!</h2>
        <p style="color: #718096; font-size: 18px; margin-bottom: 40px;">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        
        <div style="display: flex; gap: 20px; justify-content: center;">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-dc btn-dc-primary">Return Home</a>
            <a href="<?php echo esc_url( home_url( '/#book' ) ); ?>" class="btn-dc btn-dc-secondary">Book Consultation</a>
        </div>
    </div>
</main>

<?php
get_footer();
