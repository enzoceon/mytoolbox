
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, FileImage, Check, Shield, Clock, FileText, Music, Video, Image, Hammer, Scale, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>EveryTools - Free Online Tools For Everyone | No Registration Required</title>
        <meta name="description" content="Access free online tools for file conversion, editing, and much more. No registration, no watermarks, no file size limits. Fast. Free. Fluid." />
        <link rel="canonical" href="https://everytools.site/" />
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
                  The <span className="bg-gradient-primary bg-clip-text text-transparent">Digital Toolbox</span> For Everyone
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Dozens of powerful online tools to make your digital life easier. Convert, edit, and transform files with no registration required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/tools">
                    <Button size="lg" className="bg-gradient-primary hover:shadow-lg transition-shadow">
                      See All Tools <ArrowRight className="ml-2 h-5 w-5" />
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <FileImage className="h-10 w-10 text-blue-500 mb-2" />
                        <p className="text-xs font-medium">Image Tools</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <FileText className="h-10 w-10 text-green-500 mb-2" />
                        <p className="text-xs font-medium">Document Tools</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Video className="h-10 w-10 text-purple-500 mb-2" />
                        <p className="text-xs font-medium">Video Tools</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Music className="h-10 w-10 text-red-500 mb-2" />
                        <p className="text-xs font-medium">Audio Tools</p>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-6 mb-2">
                      <div className="h-2 bg-gradient-primary rounded-full w-3/4"></div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">30+ tools and growing</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our tools are designed with simplicity and efficiency in mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">Our tools are optimized for speed, delivering results in seconds not minutes.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Private</h3>
                <p className="text-muted-foreground">All processing happens in your browser. Your files never leave your device.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Hammer className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Versatile Tools</h3>
                <p className="text-muted-foreground">A comprehensive collection of tools for all your digital needs in one place.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Registration</h3>
                <p className="text-muted-foreground">No accounts, no forms, no hassle. Just powerful tools ready when you need them.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Tools</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our most-used tools that users love.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Image to PDF</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Convert single or multiple images to PDF while preserving quality.
                </p>
                <Link to="/converter">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Use Tool
                  </Button>
                </Link>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">PDF to Word</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Convert PDF documents to editable Word files easily.
                </p>
                <Link to="/tools">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Use Tool
                  </Button>
                </Link>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-50 flex items-center justify-center">
                  <Video className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Video Compressor</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compress video files without significant quality loss.
                </p>
                <Link to="/tools">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Use Tool
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/tools">
                <Button size="lg" className="bg-gradient-primary hover:shadow-lg transition-shadow">
                  See All Tools <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-to-use" className="py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Using EveryTools is simple and straightforward. Follow these three easy steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <Check className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose Your Tool</h3>
                <p className="text-sm text-muted-foreground">
                  Browse our collection of tools and select the one you need for your task.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Your Files</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your files or click to browse and select from your device.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Results</h3>
                <p className="text-sm text-muted-foreground">
                  Process your files and download the results with a single click.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EveryTools.site?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We stand out from other online tool providers for these important reasons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Everything in One Place</h3>
                <p className="text-muted-foreground">
                  Instead of bookmarking dozens of different websites, EveryTools brings all the utilities you need into one accessible platform. From file conversion to media editing, we've got it all.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">100% Free & No Watermarks</h3>
                <p className="text-muted-foreground">
                  Unlike many other conversion tools, EveryTools is completely free to use with no hidden fees or watermarks on your documents. We believe essential digital tools should be accessible to everyone.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Uncompromising Privacy</h3>
                <p className="text-muted-foreground">
                  Your files are processed entirely in your browser and never uploaded to any server. This ensures your sensitive documents remain private and secure throughout the conversion process.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Simple & Intuitive Design</h3>
                <p className="text-muted-foreground">
                  We've designed EveryTools to be incredibly easy to use. No technical knowledge required - just select your tool, upload your files, and get results instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find quick answers to common questions about our tools and services.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Are EveryTools services really free?</h3>
                <p className="text-muted-foreground">
                  Yes! All our tools are completely free to use. We don't require registration, payment information, or subscriptions. We believe essential digital tools should be accessible to everyone.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">How secure are my files?</h3>
                <p className="text-muted-foreground">
                  Your security is our top priority. All file processing happens directly in your browser - your files never leave your device. We don't store, see, or have access to any of your files or their contents.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Are there limits to file sizes?</h3>
                <p className="text-muted-foreground">
                  Since processing happens in your browser, file size limits depend on your device's capabilities. Most modern devices can handle files up to 100MB without issues. For very large files, you may experience slower processing times.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Can I use EveryTools on my mobile device?</h3>
                <p className="text-muted-foreground">
                  Absolutely! EveryTools is fully responsive and works on smartphones and tablets as well as desktop computers. Our interface adjusts automatically to provide the best experience on any device.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">How often do you add new tools?</h3>
                <p className="text-muted-foreground">
                  We're constantly expanding our collection of tools. We typically add 2-3 new tools each month based on user feedback and requests. Have a suggestion? Let us know through our contact page!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-primary text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Your Digital Life?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Access our complete collection of free online tools now. No registration required!
            </p>
            <Link to="/tools">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Explore All Tools
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
