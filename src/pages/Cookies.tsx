
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10">
        <section className="glass-card rounded-xl p-8 mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">Cookie Policy</h1>
          
          <div className="space-y-4 text-foreground">
            <p><strong>Last Updated: April 04, 2025</strong></p>
            
            <p>
              This Cookie Policy explains how Image2PDF uses cookies and similar technologies to recognize you when
              you visit our website. It explains what these technologies are and why we use them, as well as your
              rights to control our use of them.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website.
              Cookies are widely used by website owners to make their websites work efficiently and provide reporting
              information.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Cookies</h2>
            <p>
              Image2PDF uses cookies for several reasons:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To remember your preferences and settings</li>
              <li>To understand how you use our website</li>
              <li>To enhance the performance and functionality of our service</li>
              <li>To provide analytics about how our website is used</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Types of Cookies We Use</h2>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core functionality such as
              security, network management, and accessibility. You may disable these by changing your browser settings,
              but this may affect how the website functions.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Analytics Cookies</h3>
            <p>
              These cookies collect information that helps us understand how you use our website, which pages you
              visited and when, and how many people are using specific features. All information these cookies collect
              is aggregated and anonymous.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Preference Cookies</h3>
            <p>
              These cookies allow our website to remember choices you make (such as your preferred theme) and provide
              enhanced, personalized features.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Your Cookie Choices</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit
              the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer
              be personalized to you.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
              Cookie Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
              <a href="mailto:image2pdfsite@gmail.com" className="text-primary hover:underline ml-1">image2pdfsite@gmail.com</a>
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookies;
