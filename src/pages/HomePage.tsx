
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, FileImage, Check, Shield, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Image to PDF - Free Online Image to PDF Converter | No Registration Required</title>
        <meta name="description" content="Instantly convert JPG, PNG, GIF, BMP, WEBP, TIFF and other image formats to PDF for free. No registration, no watermarks, no file size limits. Fast. Free. Fluid." />
        <link rel="canonical" href="https://image2pdf.site/" />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Transform Images to <span className="bg-gradient-primary bg-clip-text text-transparent">PDFs</span> in Seconds
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Convert single or multiple images to PDF while preserving exact dimensions and quality. Fast. Free. Fluid.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/">
                    <Button size="lg" className="bg-gradient-primary hover:shadow-lg transition-shadow">
                      Start Converting <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/#how-to-use">
                    <Button variant="outline" size="lg">
                      How It Works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-lg">
                  <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                  <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                  <div className="relative glass-card rounded-2xl shadow-xl p-8 backdrop-blur-sm">
                    <div className="flex items-center justify-center h-48 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <FileImage className="h-24 w-24 text-gray-400" />
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
                      <div className="h-2 bg-gradient-primary rounded-full w-3/4"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">Converting images_001.jpg to PDF...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Tool?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our image to PDF converter is designed with simplicity and efficiency in mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Free</h3>
                <p className="text-muted-foreground">No hidden fees, subscriptions, or watermarks. Just a completely free tool.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                <p className="text-muted-foreground">All processing happens in your browser. Your files never leave your device.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">Convert multiple images to PDF in just seconds with our optimized process.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <FileImage className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">High Quality</h3>
                <p className="text-muted-foreground">Maintains the original image quality in your converted PDFs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-to-use" className="py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Converting your images to PDF is simple and fast. Follow these three easy steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop multiple image files or click to browse and select from your device.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Convert to PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Click the "Convert to PDF" button to transform your images into a high-quality PDF document.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Download PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Once conversion is complete, download your PDF file with a single click.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/">
                <Button size="lg" className="bg-gradient-primary hover:shadow-lg transition-shadow">
                  Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-primary text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Convert Your Images?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Our tool is completely free, with no registration required. Convert your images to PDF now!
            </p>
            <Link to="/">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Start Converting Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
