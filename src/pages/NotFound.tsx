
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Page Not Found - Image2PDF</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to our homepage to convert images to PDF." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="glass-card p-10 rounded-xl text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Page not found</p>
          <p className="mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="px-6 py-3 rounded-full bg-gradient-primary text-white font-medium shadow-lg hover:shadow-indigo-500/40 transition-shadow">
            Return to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
