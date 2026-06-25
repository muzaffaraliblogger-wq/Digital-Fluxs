<?php
/**
 * The sidebar containing the main widget area
 *
 * @package DentalCare
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
    return;
}
?>

<aside id="secondary" class="widget-area" style="background: var(--white); padding: 30px; border-radius: 16px; box-shadow: var(--shadow-premium);">
    <?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside>
