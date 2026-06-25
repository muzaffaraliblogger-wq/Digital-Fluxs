<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  
  <!-- SEO & Social Graph (Open Graph) ready integration -->
  <meta name="description" content="DentalCare - Creating Healthy Smiles For Life. Premium international cosmetic, implant, and family dentistry.">
  <meta property="og:type" content="website">
  <meta property="og:title" content="DentalCare | Creating Healthy Smiles For Life">
  <meta property="og:description" content="Advanced premium dental clinic offering cosmetic, restorative, and pediatric care with custom patient CRM dashboards.">
  <meta property="og:url" content="<?php echo esc_url( home_url('/') ); ?>">
  <meta property="og:image" content="<?php echo esc_url( get_template_directory_uri() . '/assets/img/og-preview.jpg' ); ?>">
  
  <!-- Local Dentist Schema Markup (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "DentalCare Clinic",
    "image": "<?php echo esc_url( get_template_directory_uri() . '/assets/img/og-preview.jpg' ); ?>",
    "url": "<?php echo esc_url( home_url('/') ); ?>",
    "telephone": "+123456789",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "100 Harley Street",
      "addressLocality": "London",
      "postalCode": "W1G 7JD",
      "addressCountry": "UK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5204,
      "longitude": -0.1461
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/dentalcare",
      "https://www.instagram.com/dentalcare"
    ]
  }
  </script>

  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
  <header id="masthead" class="site-header" style="background-color: var(--white); box-shadow: var(--shadow-premium); position: sticky; top: 0; z-index: 100;">
    <div class="container" style="display: flex; align-items: center; justify-content: space-between; padding: 20px;">
      
      <!-- Logo Branding -->
      <div class="site-branding">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" style="font-family: var(--font-display); font-size: 26px; font-weight: 700; color: var(--primary-color); text-decoration: none;">
          Dental<span style="color: var(--secondary-color);">Care</span>
        </a>
        <p class="site-description" style="font-size: 10px; margin: 0; text-transform: uppercase; letter-spacing: 1px; color: var(--secondary-color); font-weight: 500;">
          Creating Healthy Smiles For Life
        </p>
      </div>

      <!-- Navigation Menu -->
      <nav id="site-navigation" class="main-navigation" style="display: flex; align-items: center; gap: 30px;">
        <?php
        wp_nav_menu( array(
          'theme_location' => 'primary-menu',
          'menu_id'        => 'primary-menu-list',
          'container'      => false,
          'menu_class'     => 'primary-nav-menu',
          'fallback_cb'    => function() {
              echo '<ul class="primary-nav-menu" style="display:flex; list-style:none; gap:20px; font-weight:500;">' .
                   '<li><a href="#services">Services</a></li>' .
                   '<li><a href="#about">About</a></li>' .
                   '<li><a href="#blog">Blog</a></li>' .
                   '<li><a href="#contact">Contact</a></li>' .
                   '</ul>';
          }
        ) );
        ?>
        <a href="#book" class="btn-dc btn-dc-primary" style="padding: 10px 24px; font-size: 13px;">Book Appointment</a>
      </nav>

    </div>
  </header>
  <div id="content" class="site-content">
