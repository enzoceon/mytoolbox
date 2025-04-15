
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface GlobalSEOHeadProps {
  noIndex?: boolean;
}

const GlobalSEOHead: React.FC<GlobalSEOHeadProps> = ({ noIndex = false }) => {
  return (
    <Helmet>
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Global Site Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="UTF-8" />
      <meta name="theme-color" content="#111827" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Common Meta Tags */}
      <meta name="author" content="MyToolbox" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="creator" content="MyToolbox" />
      <meta name="publisher" content="MyToolbox" />
      
      {/* Preconnect to Important Domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon Tags */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Facebook and LinkedIn Verification */}
      <meta property="fb:app_id" content="YOUR_FB_APP_ID" />
      <meta property="og:site_name" content="MyToolbox" />
      <meta name="linkedin:owner" content="MyToolbox" />
      
      {/* Twitter Tags */}
      <meta name="twitter:site" content="@MyToolbox" />
      <meta name="twitter:creator" content="@MyToolbox" />
      
      {/* Apple Tags */}
      <meta name="apple-mobile-web-app-title" content="MyToolbox" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#111827" />
      
      {/* Microsoft Tags */}
      <meta name="msapplication-TileColor" content="#111827" />
      <meta name="application-name" content="MyToolbox" />
      
      {/* Alternate Language Links */}
      <link rel="alternate" href="https://mytoolbox.site" hrefLang="x-default" />
      <link rel="alternate" href="https://mytoolbox.site" hrefLang="en" />
      
      {/* Global Site Verification */}
      <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      
      {/* Global Structured Data */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MyToolbox",
          "url": "https://mytoolbox.site",
          "logo": "https://mytoolbox.site/logo.png",
          "sameAs": [
            "https://facebook.com/mytoolbox",
            "https://twitter.com/mytoolbox",
            "https://www.linkedin.com/company/mytoolbox",
            "https://www.youtube.com/c/mytoolbox"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-800-000-0000",
            "contactType": "customer service",
            "availableLanguage": "English"
          }
        }
      `}</script>
      
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://mytoolbox.site/",
          "name": "MyToolbox",
          "description": "Free online tools for conversion, editing, and file manipulation",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://mytoolbox.site/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default GlobalSEOHead;
