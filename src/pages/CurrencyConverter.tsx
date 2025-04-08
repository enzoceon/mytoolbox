
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import BackButton from '@/components/BackButton';

const CurrencyConverter = () => {
  return (
    <>
      <Helmet>
        <title>Currency Converter - EveryTools</title>
        <meta name="description" content="Convert between different currencies with up-to-date exchange rates." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Currency</span>
              <span className="text-white"> Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert between different currencies with up-to-date exchange rates.
            </p>
          </div>
          
          <div className="w-full max-w-md mx-auto p-6 bg-card rounded-xl border border-white/10 shadow-lg">
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Currency Converter functionality coming soon!
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CurrencyConverter;
