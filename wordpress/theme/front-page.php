<?php
/**
 * The template for displaying the premium front page
 *
 * @package DentalCare
 * @since 1.0.0
 */

get_header();

// Before/After Image defaults
$before_image = get_template_directory_uri() . '/assets/img/before.jpg';
$after_image = get_template_directory_uri() . '/assets/img/after.jpg';

// Fallback to high-quality Unsplash defaults if files don't exist
$before_image_url = 'https://images.unsplash.com/photo-1542614471-001ccf2b449c?auto=format&fit=crop&w=600&q=80';
$after_image_url = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80';
?>

<!-- 1. HERO SECTION WITH BEFORE & AFTER SLIDER -->
<section style="background: linear-gradient(135deg, #FFFFFF 0%, #F7FAFC 50%, #E6F4F5 100%); padding: 100px 0; border-bottom: 1px solid #EDF2F7; position: relative; overflow: hidden;">
    <div style="position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(#000 1px, transparent 1px); background-size: 24px 24px; pointer-events: none;"></div>
    
    <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 60px; align-items: center;">
        
        <!-- Left Column: Content -->
        <div style="max-width: 600px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; bg-color: white; padding: 6px 16px; border-radius: 50px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); border: 1px solid #E2E8F0; margin-bottom: 24px; font-size: 11px; font-weight: bold; color: var(--primary-color); text-transform: uppercase; letter-spacing: 1px;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--secondary-color); animation: pulse 2s infinite;"></span>
                VIP International Healthcare
            </div>
            
            <h1 style="font-size: clamp(36px, 5vw, 64px); line-height: 1.1; margin-bottom: 20px; font-weight: 800;">
                Advanced Dental Care For <span style="background: linear-gradient(90deg, var(--primary-color), var(--secondary-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Every Smile.</span>
            </h1>
            
            <p style="color: #4A5568; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Experience the pinnacle of biological oral surgery, premium ceramic veneers, and computed 3D dental diagnostics in luxurious clinical suites. Integrated with custom client-oriented appointment pipelines and automated workflows.
            </p>
            
            <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                <a href="#book" class="btn-dc btn-dc-primary">Book Consultation</a>
                <a href="tel:+1800555019" class="btn-dc btn-dc-secondary">Call Care Team</a>
            </div>
        </div>

        <!-- Right Column: Interactive Before/After Smile Slider -->
        <div style="position: relative;">
            <div style="position: absolute; inset: 0; background: rgba(29, 182, 196, 0.08); border-radius: 24px; transform: rotate(-2deg) scale(1.02); pointer-events: none;"></div>
            
            <div class="before-after-slider-container" style="position: relative; background: white; padding: 16px; border-radius: 24px; box-shadow: var(--shadow-premium); border: 1px solid #EDF2F7; overflow: hidden; user-select: none;">
                
                <div style="position: relative; height: 320px; border-radius: 16px; overflow: hidden;">
                    <!-- Before Image (Classic teeth) -->
                    <div style="position: absolute; inset: 0; background-image: url('<?php echo esc_url($before_image_url); ?>'); background-size: cover; background-position: center;">
                        <div style="position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.6); color: white; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; padding: 4px 10px; border-radius: 4px;">
                            Before Restoration
                        </div>
                    </div>

                    <!-- After Image (Restored smiles) -->
                    <div id="after-image-clip" style="position: absolute; inset: y 0; left: 0; top: 0; bottom: 0; width: 50%; background-image: url('<?php echo esc_url($after_image_url); ?>'); background-size: cover; background-position: center; border-right: 2px solid white;">
                        <div style="position: absolute; top: 12px; right: 12px; background: rgba(29, 182, 196, 0.9); color: white; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; padding: 4px 10px; border-radius: 4px; white-space: nowrap;">
                            DentalCare Smile
                        </div>
                    </div>

                    <!-- Invisible Input Range -->
                    <input type="range" min="0" max="100" value="50" id="slider-range-input" style="position: absolute; inset: 0; opacity: 0; cursor: ew-resize; width: 100%; height: 100%; z-index: 10;">
                    
                    <!-- Handle element -->
                    <div id="slider-handle" style="position: absolute; top: 0; bottom: 0; left: 50%; width: 28px; height: 28px; background: var(--primary-color); color: white; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transform: translate(-50%, -50%); margin-top: 160px; pointer-events: none; font-size: 10px; font-weight: bold; z-index: 5;">
                        &harr;
                    </div>
                </div>

                <div style="padding: 16px 8px 0 8px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; color: var(--secondary-color);">Premium Cosmetic Veneers</span>
                        <h4 style="margin: 4px 0 0 0; font-size: 15px; color: var(--primary-color);">Full Smile Makeover Design</h4>
                    </div>
                    <span style="font-size: 11px; color: #718096; font-style: italic;">Drag to compare</span>
                </div>
            </div>
        </div>

    </div>
</section>

<!-- 2. CLINIC METRICS SECTION -->
<section style="background: white; padding: 60px 0; border-bottom: 1px solid #EDF2F7;">
    <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; text-align: center;">
        <div>
            <p style="font-size: 48px; font-weight: 800; color: var(--primary-color); margin: 0;">15k+</p>
            <p style="font-size: 12px; font-weight: bold; color: #A0AEC0; text-transform: uppercase; letter-spacing: 1px; margin: 5px 0 0 0;">Happy Patients</p>
            <p style="font-size: 11px; color: #718096; margin: 2px 0 0 0;">USA, UK & MENA Region</p>
        </div>
        <div>
            <p style="font-size: 48px; font-weight: 800; color: var(--secondary-color); margin: 0;">25+</p>
            <p style="font-size: 12px; font-weight: bold; color: #A0AEC0; text-transform: uppercase; letter-spacing: 1px; margin: 5px 0 0 0;">Expert Doctors</p>
            <p style="font-size: 11px; color: #718096; margin: 2px 0 0 0;">Columbia & Kings Alumni</p>
        </div>
        <div>
            <p style="font-size: 48px; font-weight: 800; color: var(--primary-color); margin: 0;">99.8%</p>
            <p style="font-size: 12px; font-weight: bold; color: #A0AEC0; text-transform: uppercase; letter-spacing: 1px; margin: 5px 0 0 0;">Success Rate</p>
            <p style="font-size: 11px; color: #718096; margin: 2px 0 0 0;">Zero-Implant Rejections</p>
        </div>
        <div>
            <p style="font-size: 48px; font-weight: 800; color: var(--secondary-color); margin: 0;">100%</p>
            <p style="font-size: 12px; font-weight: bold; color: #A0AEC0; text-transform: uppercase; letter-spacing: 1px; margin: 5px 0 0 0;">Painless Laser</p>
            <p style="font-size: 11px; color: #718096; margin: 2px 0 0 0;">Biological Dental Care</p>
        </div>
    </div>
</section>

<!-- 3. SPECIALTY TREATMENTS SECTION -->
<section id="services" style="background: #F7FAFC; padding: 100px 0; border-bottom: 1px solid #EDF2F7;">
    <div class="container">
        
        <div style="text-align: center; max-width: 650px; margin: 0 auto 60px auto;">
            <span style="color: var(--secondary-color); font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Signature Services</span>
            <h2 style="font-size: 36px; margin: 10px 0 15px 0;">Luxury Specialized Dental Treatments</h2>
            <p style="color: #718096; font-size: 14px;">Biological smile engineering with absolute transparency in process planning, recovery timeline metrics, and clinical support.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
            
            <?php
            // Custom Loop for Service Post Type
            $service_query = new WP_Query( array(
                'post_type'      => 'service',
                'posts_per_page' => 6,
                'orderby'        => 'date',
                'order'          => 'ASC'
            ) );

            if ( $service_query->have_posts() ) :
                while ( $service_query->have_posts() ) : $service_query->the_post();
                    $price = get_post_meta( get_the_ID(), 'service_price', true ) ?: 'Custom Quote';
                    ?>
                    <div style="background: white; border: 1px solid #EDF2F7; border-radius: 20px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.01); display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="width: 48px; height: 48px; background: #F7FAFC; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary-color); margin-bottom: 20px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <h3 style="font-size: 20px; margin-bottom: 5px;"><?php the_title(); ?></h3>
                            <span style="display: inline-block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold; color: var(--secondary-color); margin-bottom: 15px;"><?php echo esc_html($price); ?></span>
                            <div style="color: #718096; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
                                <?php the_excerpt(); ?>
                            </div>
                        </div>
                        <a href="<?php the_permalink(); ?>" style="color: var(--secondary-color); font-weight: bold; font-size: 13px; display: inline-flex; align-items: center; gap: 5px;">
                            View Process Timeline &rarr;
                        </a>
                    </div>
                    <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Static Default Fallbacks (matching React app's premium services)
                $static_services = array(
                    array(
                        'title' => 'Cosmetic Dentistry',
                        'price' => '$1,200 - $2,500 per tooth',
                        'desc'  => 'Premium handcrafted porcelain veneers and smile re-contouring for a flawless Hollywood appearance.'
                    ),
                    array(
                        'title' => 'Dental Implants',
                        'price' => '$3,200 - $5,500',
                        'desc'  => 'Lifetime-guaranteed single tooth or full-mouth restoration utilizing state-of-the-art titanium roots.'
                    ),
                    array(
                        'title' => 'Root Canal Therapy',
                        'price' => '$850 - $1,400',
                        'desc'  => 'Painless microscopic nerve rescue restoring severely infected root chambers with 99.8% precision.'
                    ),
                    array(
                        'title' => 'Teeth Whitening',
                        'price' => '$350 - $600',
                        'desc'  => 'Advanced laser-activated whitening technology delivering up to 8 shades lighter in single session.'
                    )
                );

                foreach ( $static_services as $srv ) :
                    ?>
                    <div style="background: white; border: 1px solid #EDF2F7; border-radius: 20px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.01); display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="width: 48px; height: 48px; background: #F7FAFC; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary-color); margin-bottom: 20px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <h3 style="font-size: 20px; margin-bottom: 5px;"><?php echo esc_html($srv['title']); ?></h3>
                            <span style="display: inline-block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold; color: var(--secondary-color); margin-bottom: 15px;"><?php echo esc_html($srv['price']); ?></span>
                            <p style="color: #718096; font-size: 13px; line-height: 1.6; margin-bottom: 20px;"><?php echo esc_html($srv['desc']); ?></p>
                        </div>
                        <a href="#book" style="color: var(--secondary-color); font-weight: bold; font-size: 13px; display: inline-flex; align-items: center; gap: 5px;">
                            Book Treatment &rarr;
                        </a>
                    </div>
                    <?php
                endforeach;
            endif;
            ?>

        </div>

    </div>
</section>

<!-- 4. MEET THE SPECIALISTS (DOCTORS DIRECTORY) -->
<section style="background: white; padding: 100px 0; border-bottom: 1px solid #EDF2F7;">
    <div class="container">
        
        <div style="text-align: center; max-width: 650px; margin: 0 auto 60px auto;">
            <span style="color: var(--secondary-color); font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Medical Directory</span>
            <h2 style="font-size: 36px; margin: 10px 0 15px 0;">Meet Our World-Class Specialists</h2>
            <p style="color: #718096; font-size: 14px;">Our interdisciplinary team of board-certified implantologists, aesthetic surgeons, and pediatric specialists are committed to dental excellence.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
            
            <?php
            // Custom Loop for Doctor Post Type
            $doctor_query = new WP_Query( array(
                'post_type'      => 'doctor',
                'posts_per_page' => 4,
                'orderby'        => 'date',
                'order'          => 'ASC'
            ) );

            if ( $doctor_query->have_posts() ) :
                while ( $doctor_query->have_posts() ) : $doctor_query->the_post();
                    $role = get_post_meta( get_the_ID(), 'doctor_role', true ) ?: 'Associate Dentist';
                    $image_url = get_the_post_thumbnail_url( get_the_ID(), 'medium' ) ?: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80';
                    ?>
                    <div style="background: white; border: 1px solid #EDF2F7; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.01);">
                        <div style="position: relative; height: 260px; overflow: hidden;">
                            <img src="<?php echo esc_url($image_url); ?>" alt="<?php the_title(); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                            <div style="position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 100%); display: flex; align-items: flex-end; padding: 20px;">
                                <div>
                                    <p style="color: white; font-weight: bold; font-size: 16px; margin: 0;"><?php the_title(); ?></p>
                                    <p style="color: var(--secondary-color); font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin: 2px 0 0 0;"><?php echo esc_html($role); ?></p>
                                </div>
                            </div>
                        </div>
                        <div style="padding: 20px; font-size: 13px; color: #718096; line-height: 1.6; font-style: italic;">
                            "<?php echo get_the_excerpt(); ?>"
                        </div>
                    </div>
                    <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Static Default Fallbacks
                $static_doctors = array(
                    array(
                        'name'  => 'Dr. Alexander Mercer',
                        'role'  => 'Chief Implantologist',
                        'bio'   => 'DDS, MS (Columbia University). Over 18 years of excellence in custom smile restorations.',
                        'image' => 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
                    ),
                    array(
                        'name'  => 'Dr. Sarah Jenkins',
                        'role'  => 'Orthodontics Specialist',
                        'bio'   => 'Ph.D. in Aligner Science & Orthodontic Arts (King\'s College London).',
                        'image' => 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=300&q=80'
                    ),
                    array(
                        'name'  => 'Dr. Michael Chang',
                        'role'  => 'Endodontics Specialist',
                        'bio'   => 'Microscopic Root Canal Therapy expert. Board-certified with international clinical honors.',
                        'image' => 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80'
                    )
                );

                foreach ( $static_doctors as $doc ) :
                    ?>
                    <div style="background: white; border: 1px solid #EDF2F7; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.01);">
                        <div style="position: relative; height: 260px; overflow: hidden;">
                            <img src="<?php echo esc_url($doc['image']); ?>" alt="<?php echo esc_attr($doc['name']); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                            <div style="position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 100%); display: flex; align-items: flex-end; padding: 20px;">
                                <div>
                                    <p style="color: white; font-weight: bold; font-size: 16px; margin: 0;"><?php echo esc_html($doc['name']); ?></p>
                                    <p style="color: var(--secondary-color); font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin: 2px 0 0 0;"><?php echo esc_html($doc['role']); ?></p>
                                </div>
                            </div>
                        </div>
                        <div style="padding: 20px; font-size: 13px; color: #718096; line-height: 1.6; font-style: italic;">
                            "<?php echo esc_html($doc['bio']); ?>"
                        </div>
                    </div>
                    <?php
                endforeach;
            endif;
            ?>

        </div>

    </div>
</section>

<!-- 5. SECURED BOOKING DYNAMIC COMPONENT -->
<section id="book" style="background: #F7FAFC; padding: 100px 0; border-bottom: 1px solid #EDF2F7;">
    <div class="container" style="max-width: 800px;">
        
        <div style="text-align: center; margin-bottom: 50px;">
            <span style="color: var(--secondary-color); font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Interactive Portal</span>
            <h2 style="font-size: 36px; margin: 10px 0 15px 0;">Schedule Your Secured Session</h2>
            <p style="color: #718096; font-size: 14px;">Fill out the clinical intake fields below to request an appointment. Our system routes submission to the staff CRM pipeline instantaneously.</p>
        </div>

        <!-- Render our shortcode directly -->
        <?php echo do_shortcode('[dentalcare_booking_form]'); ?>

    </div>
</section>

<!-- 6. FAQS ACCORDION -->
<section style="background: white; padding: 100px 0;">
    <div class="container" style="max-width: 800px;">
        
        <div style="text-align: center; margin-bottom: 50px;">
            <span style="color: var(--secondary-color); font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Questions & Answers</span>
            <h2 style="font-size: 32px; margin: 10px 0 15px 0;">Patient Frequently Asked Questions</h2>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
            <details style="padding: 20px; border: 1px solid #EDF2F7; border-radius: 12px; cursor: pointer;">
                <summary style="font-weight: bold; color: var(--primary-color); font-size: 16px;">How long does the dental implant restoration process take?</summary>
                <p style="color: #718096; font-size: 14px; margin-top: 10px; line-height: 1.6; margin-bottom: 0;">With computer-guided keyhole planning, implant insertion takes only 25 minutes per root. Osseointegration (bone fusing) typically takes 3 months, followed by custom zirconia crown fitting.</p>
            </details>
            <details style="padding: 20px; border: 1px solid #EDF2F7; border-radius: 12px; cursor: pointer;">
                <summary style="font-weight: bold; color: var(--primary-color); font-size: 16px;">Do you accept international patients and direct currency payments?</summary>
                <p style="color: #718096; font-size: 14px; margin-top: 10px; line-height: 1.6; margin-bottom: 0;">Yes, we accommodate international patients with custom VIP packages including concierge clinic pickup, premium hotel partnerships, and direct payments in USD, GBP, EUR, and AED.</p>
            </details>
            <details style="padding: 20px; border: 1px solid #EDF2F7; border-radius: 12px; cursor: pointer;">
                <summary style="font-weight: bold; color: var(--primary-color); font-size: 16px;">What anesthesia options are available for surgical anxiety?</summary>
                <p style="color: #718096; font-size: 14px; margin-top: 10px; line-height: 1.6; margin-bottom: 0;">We offer tailored anesthesia protocols: from targeted zero-needle local freezing to conscious oral sedation and certified deep IV anesthesia administered by in-house anesthesiologists.</p>
            </details>
        </div>

    </div>
</section>

<!-- Simple client-side javascript for interactive Before/After Slider inside WordPress -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    var rangeInput = document.getElementById('slider-range-input');
    var clippedImage = document.getElementById('after-image-clip');
    var handle = document.getElementById('slider-handle');

    if (rangeInput && clippedImage && handle) {
        rangeInput.addEventListener('input', function(e) {
            var value = e.target.value;
            clippedImage.style.width = value + '%';
            handle.style.left = value + '%';
        });
    }
});
</script>

<?php
get_footer();
