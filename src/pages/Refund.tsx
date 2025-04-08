
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Refund = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy - MyToolbox</title>
        <meta name="description" content="Learn about our refund policy for services at MyToolbox." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
          <div className="mb-4">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="glass-card p-8 rounded-xl">
            <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
            
            <div className="space-y-6 text-muted-foreground">
              <p>
                Thank you for choosing MyToolbox. We want to be transparent about our services and policies.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">Free Services</h2>
              <p>
                <strong>All tools and services provided on MyToolbox are completely free of charge.</strong> There are no 
                hidden fees, subscriptions, or payments required to use any of our conversion tools or utilities.
              </p>
              <p className="mt-2">
                Since we do not charge for any of our services, there is no payment process and therefore no refunds are applicable.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">Future Considerations</h2>
              <p>
                In the event that we introduce any premium or paid services in the future:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>We would offer a 14-day money-back guarantee for all first-time purchases.</li>
                <li>Refund requests would need to be submitted within 14 days of the original purchase.</li>
                <li>Refunds would be processed using the original payment method used for the purchase.</li>
              </ul>
              
              <p className="mt-10 text-sm">
                Last Updated: April 8, 2025
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
