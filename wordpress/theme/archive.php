<?php
/**
 * The template for displaying archive pages
 *
 * @package DentalCare
 */

get_header();
?>

<main id="primary" class="site-main" style="padding: 60px 0; background-color: var(--neutral-light);">
    <div class="container">
        <header class="page-header" style="margin-bottom: 50px; text-align: center;">
            <?php
            the_archive_title( '<h1 class="page-title" style="font-size: 40px; color: var(--primary-color);">', '</h1>' );
            the_archive_description( '<div class="archive-description" style="color:#718096; max-width:600px; margin:15px auto 0 auto;">', '</div>' );
            ?>
        </header>

        <div class="blog-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px;">
            <?php if ( have_posts() ) : ?>
                <?php while ( have_posts() ) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition'); ?> style="display: flex; flex-direction: column; transition: var(--transition-smooth);">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <div class="post-thumb">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('medium_large', array('style' => 'width:100%; height:240px; object-fit:cover;')); ?>
                                </a>
                            </div>
                        <?php endif; ?>
                        
                        <div class="post-content" style="padding: 30px; flex-grow: 1; display: flex; flex-direction: column;">
                            <span style="color: var(--secondary-color); font-weight: 600; font-size: 12px; text-transform: uppercase; margin-bottom: 10px; display: block;"><?php echo get_the_date(); ?></span>
                            <h3 style="font-size: 22px; margin-bottom: 15px; font-family: var(--font-display);"><a href="<?php the_permalink(); ?>" style="color: var(--primary-color);"><?php the_title(); ?></a></h3>
                            <p style="color: #4A5568; font-size: 15px; margin-bottom: 20px; flex-grow: 1;"><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                            <a href="<?php the_permalink(); ?>" style="font-weight: 700; font-size: 14px; text-transform: uppercase; color: var(--secondary-color);">Read Article &rarr;</a>
                        </div>
                    </article>
                <?php endwhile; ?>
            <?php else : ?>
                <div class="no-posts" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                    <h3>No articles found matching this criteria.</h3>
                </div>
            <?php endif; ?>
        </div>

        <div class="pagination-wrap" style="margin-top: 50px; text-align: center;">
            <?php the_posts_pagination(array(
                'mid_size'  => 2,
                'prev_text' => '&larr; Prev',
                'next_text' => 'Next &rarr;',
            )); ?>
        </div>
    </div>
</main>

<?php
get_footer();
