import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileCheck, Image } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AdPlacement from '@/components/AdPlacement';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About MyToolbox - Our Story and Mission</title>
        <meta name="description" content="Learn about MyToolbox - our mission, values, and how our free online tools help users convert, edit, and transform files without registration or watermarks." />
        <link rel="canonical" href="https://mytoolbox.site/about" />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10">
        <section className="glass-card rounded-xl p-8 mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">About MyToolbox</h1>
          
          <div className="space-y-4 text-foreground">
            <p>
              Welcome to MyToolbox - your one-stop destination for free, powerful online tools to make your digital life easier.
            </p>
            
            <p>
              Our mission is simple: to provide beautiful, intuitive, and fast tools that help you convert, edit, and transform files
              without the hassle of downloading software or creating accounts.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Our Story</h2>
            <p>
              MyToolbox was created out of frustration with existing online tools that were either cluttered with ads,
              difficult to use, or required payment. We believe that simple digital tools should be accessible to everyone,
              regardless of technical expertise or budget.
            </p>
            
            <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-medium mb-2">Privacy Protected</h3>
                <p className="text-sm text-muted-foreground">Your files never leave your device - all processing happens locally in your browser</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FileCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-medium mb-2">Quality Preserved</h3>
                <p className="text-sm text-muted-foreground">We maintain the original quality and dimensions of your files in all our conversion tools</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Image className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-medium mb-2">Multi-Format Support</h3>
                <p className="text-sm text-muted-foreground">Convert between dozens of different file formats with our comprehensive toolbox</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Our Values</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium">Simplicity:</span> We focus on making powerful tools easy to use.</li>
              <li><span className="font-medium">Privacy:</span> We don't store your files or require personal information.</li>
              <li><span className="font-medium">Accessibility:</span> Our tools are free and work on any device with a web browser.</li>
              <li><span className="font-medium">Beauty:</span> We believe functional tools can also be aesthetically pleasing.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">How It Works</h2>
            <p>
              MyToolbox uses client-side JavaScript to process your files. This means your data never leaves your device -
              all conversions and transformations happen right in your browser, ensuring complete privacy and security.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Content Quality & AdSense Compliance</h2>
            <p>
              At MyToolbox, we are committed to providing high-quality, valuable content to our users. Our pages are designed to offer useful 
              information and functionality, not just to host advertisements. We strictly adhere to Google AdSense Program Policies, ensuring 
              that advertisements appear only alongside substantial, relevant content that provides real value to our users.
            </p>
            
            <p className="mt-6">
              Thank you for choosing MyToolbox for your digital needs. We're constantly working to improve our service,
              so if you have any feedback or suggestions, please don't hesitate to <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </div>
        </section>
        
        {/* AdSense placement with proper surrounding content */}
        <AdPlacement format="rectangle" />
        
        <section className="glass-card rounded-xl p-8 mt-10 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium mb-2">Is MyToolbox really free?</h3>
              <p>Yes! MyToolbox is completely free to use with no hidden costs. We don't require registration or payment information.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium mb-2">Is there a limit to how many files I can process?</h3>
              <p>There's no set limit, but very large batches of files may take longer to process since all conversion happens in your browser.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium mb-2">Are my files safe?</h3>
              <p>Absolutely. Your files never leave your device - all processing happens locally in your browser. We never see, store, or have access to your files.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium mb-2">What file formats are supported?</h3>
              <p>We support dozens of common file formats for images, documents, audio, video, and more. Check the specific tool page for details.</p>
            </div>
            
            <div className="pb-4">
              <h3 className="text-lg font-medium mb-2">Can I use MyToolbox on my mobile device?</h3>
              <p>Yes! MyToolbox is fully responsive and works on smartphones and tablets as well as desktop computers.</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
