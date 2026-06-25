<?php
/**
 * The template for displaying all single blog posts
 *
 * @package DentalCare
 */

get_header();
?>

<main id="primary" class="site-main" style="padding: 60px 0; background-color: var(--neutral-light);">
    <div class="container" style="max-width: 900px;">
        <?php while ( have_posts() ) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white p-10 rounded-2xl shadow-sm'); ?>>
                
                <header class="entry-header" style="margin-bottom: 30px;">
                    <div class="post-meta" style="color: var(--secondary-color); font-weight: 600; font-size: 14px; margin-bottom: 10px; text-transform: uppercase;">
                        <?php the_category(', '); ?> &bull; <?php the_date(); ?>
                    </div>
                    <?php the_title( '<h1 class="entry-title" style="font-size: 38px; color: var(--primary-color); line-height: 1.2;">', '</h1>' ); ?>
                    
                    <div class="author-meta" style="display: flex; align-items: center; gap: 10px; margin-top: 15px; font-size: 14px; color: #718096;">
                        <span class="avatar" style="width: 32px; height: 32px; background: #e2e8f0; border-radius: 50%; display: inline-block;"></span>
                        <span>By <?php the_author(); ?></span>
                    </div>
                </header>

                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="post-thumbnail" style="margin-bottom: 35px; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-premium);">
                        <?php the_post_thumbnail('large', array('style' => 'width:100%; height:auto;')); ?>
                    </div>
                <?php endif; ?>

                <div class="entry-content" style="font-size: 17px; color: var(--neutral-dark); line-height: 1.8;">
                    <?php
                    the_content();
                    ?>
                </div>

                <footer class="entry-footer" style="margin-top: 50px; border-top: 1px solid #edf2f7; padding-top: 30px;">
                    <div class="post-tags" style="display: flex; gap: 10px;">
                        <?php the_tags('<span class="tag-label">Tags:</span> <span class="tag-item" style="background:#edf2f7; padding:4px 10px; border-radius:12px; font-size:12px;">', '</span> <span class="tag-item" style="background:#edf2f7; padding:4px 10px; border-radius:12px; font-size:12px;">', '</span>'); ?>
                    </div>
                </footer>

            </article>

            <!-- Related posts and comments fallback -->
            <div class="comments-area bg-white p-10 rounded-2xl shadow-sm mt-8">
                <?php
                if ( comments_open() || get_comments_number() ) :
                    comments_template();
                endif;
                ?>
            </div>

        <?php endwhile; ?>
    </div>
</main>

<?php
get_footer();
