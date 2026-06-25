<?php
/**
 * The template for displaying search results pages
 *
 * @package DentalCare
 */

get_header();
?>

<main id="primary" class="site-main" style="padding: 60px 0; background-color: var(--neutral-light);">
    <div class="container">
        <header class="page-header" style="margin-bottom: 50px; text-align: center;">
            <h1 class="page-title" style="font-size: 38px; color: var(--primary-color);">
                <?php
                /* translators: %s: search query. */
                printf( esc_html__( 'Search Results for: %s', 'dentalcare' ), '<span style="color:var(--secondary-color);">' . get_search_query() . '</span>' );
                ?>
            </h1>
        </header>

        <div class="blog-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px;">
            <?php if ( have_posts() ) : ?>
                <?php while ( have_posts() ) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition'); ?> style="display: flex; flex-direction: column; transition: var(--transition-smooth);">
                        <div class="post-content" style="padding: 30px; flex-grow: 1; display: flex; flex-direction: column;">
                            <span style="color: var(--secondary-color); font-weight: 600; font-size: 12px; text-transform: uppercase; margin-bottom: 10px; display: block;"><?php echo get_the_date(); ?></span>
                            <h3 style="font-size: 22px; margin-bottom: 15px;"><a href="<?php the_permalink(); ?>" style="color: var(--primary-color);"><?php the_title(); ?></a></h3>
                            <p style="color: #4A5568; font-size: 15px; margin-bottom: 20px; flex-grow: 1;"><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                            <a href="<?php the_permalink(); ?>" style="font-weight: 700; font-size: 14px; text-transform: uppercase; color: var(--secondary-color);">Read Article &rarr;</a>
                        </div>
                    </article>
                <?php endwhile; ?>
            <?php else : ?>
                <div class="no-results bg-white p-12 rounded-2xl shadow-sm text-center" style="grid-column: 1/-1;">
                    <h3 style="font-size: 24px; color: var(--primary-color); margin-bottom: 15px;">Nothing Found</h3>
                    <p style="color: #718096; margin-bottom: 25px;">Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
                    <form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>" style="max-width: 500px; margin: 0 auto; display: flex; gap: 10px;">
                        <input type="search" class="search-field" placeholder="Search articles..." value="<?php echo get_search_query(); ?>" name="s" style="flex-grow:1; padding: 12px 20px; border-radius:30px; border:1px solid #cbd5e0; outline:none;" />
                        <button type="submit" class="btn-dc btn-dc-primary" style="padding:12px 24px;">Search</button>
                    </form>
                </div>
            <?php endif; ?>
        </div>
    </div>
</main>

<?php
get_footer();
