
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10">
        <section className="glass-card rounded-xl p-8 mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">About Image2PDF</h1>
          
          <div className="space-y-4 text-foreground">
            <p>
              Welcome to Image2PDF - the easiest and most elegant way to convert your images to PDF files online.
            </p>
            
            <p>
              Our mission is simple: to provide a beautiful, intuitive, and fast tool that helps you convert images to PDF
              without the hassle of downloading software or creating accounts.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Our Story</h2>
            <p>
              Image2PDF was created out of frustration with existing conversion tools that were either cluttered with ads,
              difficult to use, or required payment. We believe that simple digital tools should be accessible to everyone,
              regardless of technical expertise or budget.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Our Values</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium">Simplicity:</span> We focus on doing one thing exceptionally well.</li>
              <li><span className="font-medium">Privacy:</span> We don't store your images or require personal information.</li>
              <li><span className="font-medium">Accessibility:</span> Our tool is free and works on any device with a web browser.</li>
              <li><span className="font-medium">Beauty:</span> We believe functional tools can also be aesthetically pleasing.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">How It Works</h2>
            <p>
              Image2PDF uses client-side JavaScript to convert your images to PDF files. This means your images never leave your device -
              the conversion happens right in your browser, ensuring your data remains private and secure.
            </p>
            
            <p className="mt-6">
              Thank you for choosing Image2PDF for your conversion needs. We're constantly working to improve our service,
              so if you have any feedback or suggestions, please don't hesitate to contact us.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
