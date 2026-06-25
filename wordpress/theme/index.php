<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package DentalCare
 * @since 1.0.0
 */

get_header();
?>

<div class="container" style="padding: 60px 20px; min-height: 70vh;">
    <div style="display: grid; grid-template-columns: 1fr; gap: 40px;">
        
        <main id="primary" class="site-main">
            <header class="page-header" style="margin-bottom: 40px;">
                <h1 class="page-title" style="font-size: 36px; margin-bottom: 10px;"><?php esc_html_e( 'DentalCare Clinical News & Oral Hygiene Blog', 'dentalcare' ); ?></h1>
                <p style="color: #718096;"><?php esc_html_e( 'The latest research, surgery breakdowns, and pediatric care tips from our double-board certified dental team.', 'dentalcare' ); ?></p>
            </header>

            <?php if ( have_posts() ) : ?>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px;">
                    <?php
                    while ( have_posts() ) :
                        the_post();
                        ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                            <div>
                                <?php if ( has_post_thumbnail() ) : ?>
                                    <div class="post-thumbnail" style="height: 200px; overflow: hidden;">
                                        <?php the_post_thumbnail( 'medium_large', array( 'style' => 'width: 100%; height: 100%; object-fit: cover;' ) ); ?>
                                    </div>
                                <?php else : ?>
                                    <div class="post-thumbnail-placeholder" style="height: 200px; background: #EDF2F7; display: flex; align-items: center; justify-content: center; color: #A0AEC0;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                                    </div>
                                <?php endif; ?>

                                <div style="padding: 24px;">
                                    <header class="entry-header" style="margin-bottom: 15px;">
                                        <div class="entry-meta" style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--secondary-color); font-weight: bold; margin-bottom: 8px;">
                                            <?php echo get_the_date(); ?>
                                        </div>
                                        <?php the_title( '<h2 class="entry-title" style="font-size: 20px; line-height: 1.4; margin: 0;"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark" style="color: var(--primary-color); text-decoration: none;">', '</a></h2>' ); ?>
                                    </header>

                                    <div class="entry-content" style="color: #4A5568; font-size: 14px; line-height: 1.6;">
                                        <?php the_excerpt(); ?>
                                    </div>
                                </div>
                            </div>

                            <footer class="entry-footer" style="padding: 0 24px 24px 24px;">
                                <a href="<?php echo esc_url( get_permalink() ); ?>" class="btn-dc btn-dc-secondary" style="padding: 8px 18px; font-size: 12px; border-radius: 8px; width: 100%;">
                                    <?php esc_html_e( 'Read Full Article', 'dentalcare' ); ?>
                                </a>
                            </footer>
                        </article>
                    <?php endwhile; ?>
                </div>

                <div class="navigation" style="margin-top: 50px; display: flex; justify-content: center; gap: 15px;">
                    <?php
                    the_posts_pagination( array(
                        'mid_size'  => 2,
                        'prev_text' => sprintf( '&larr; %s', esc_html__( 'Previous', 'dentalcare' ) ),
                        'next_text' => sprintf( '%s &rarr;', esc_html__( 'Next', 'dentalcare' ) ),
                    ) );
                    ?>
                </div>

            <?php else : ?>
                <div style="text-align: center; padding: 40px 0;">
                    <h2><?php esc_html_e( 'No hygiene articles or dental news found.', 'dentalcare' ); ?></h2>
                    <p><?php esc_html_e( 'Please check back later or contact our support team.', 'dentalcare' ); ?></p>
                </div>
            <?php endif; ?>
        </main>

    </div>
</div>

<?php
get_footer();
