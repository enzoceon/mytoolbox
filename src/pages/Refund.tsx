
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';

const Refund = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy - EveryTools</title>
        <meta name="description" content="Learn about our refund policy for premium services at EveryTools." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
          <div className="glass-card p-8 rounded-xl">
            <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
            
            <div className="space-y-6 text-muted-foreground">
              <p>
                Thank you for choosing EveryTools. We value your satisfaction and want to ensure transparency in our refund processes.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">Free Services</h2>
              <p>
                Most of our tools are provided completely free of charge with no payment required. 
                As these services are offered at no cost, no refunds are applicable for the use of our free tools.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">Premium Services</h2>
              <p>
                For any premium services or paid features we may offer:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>We offer a 14-day money-back guarantee for all first-time purchases.</li>
                <li>Refund requests must be submitted within 14 days of the original purchase.</li>
                <li>Refunds will be processed using the original payment method used for the purchase.</li>
                <li>Processing of refunds typically takes 5-10 business days, depending on your payment provider.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">Exclusions</h2>
              <p>
                Please note that refunds may not be available in the following cases:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>If the refund request is made after the 14-day period has elapsed.</li>
                <li>For subscription renewals (after the first payment).</li>
                <li>If there is evidence of fraud or abuse of our services.</li>
                <li>If you have violated our Terms of Service.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">How to Request a Refund</h2>
              <p>
                To request a refund for a premium service, please contact our support team at support@everytools.site with the following information:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Your account email address</li>
                <li>Date of purchase</li>
                <li>Reason for requesting a refund</li>
                <li>Order ID or transaction number (if available)</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">Changes to This Policy</h2>
              <p>
                We may update our Refund Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
              
              <p className="mt-10 text-sm">
                Last Updated: April 7, 2025
              </p>
              
              <p className="mt-6 text-sm">
                If you have any questions about our Refund Policy, please contact us at support@everytools.site.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Refund;
