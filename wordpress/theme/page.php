<?php
/**
 * The template for displaying all pages
 *
 * @package DentalCare
 */

get_header();
?>

<main id="primary" class="site-main" style="padding: 60px 0; background-color: var(--neutral-light);">
    <div class="container">
        <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white p-10 rounded-2xl shadow-sm'); ?>>
            <header class="entry-header" style="margin-bottom: 40px; border-bottom: 2px solid #edf2f7; padding-bottom: 20px;">
                <?php the_title( '<h1 class="entry-title" style="font-size:36px; color:var(--primary-color);">', '</h1>' ); ?>
            </header>

            <div class="entry-content" style="font-size: 16px; color: var(--neutral-dark); line-height: 1.8;">
                <?php
                the_content();

                wp_link_pages( array(
                    'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'dentalcare' ),
                    'after'  => '</div>',
                ) );
                ?>
            </div>
        </article>
    </div>
</main>

<?php
get_footer();
