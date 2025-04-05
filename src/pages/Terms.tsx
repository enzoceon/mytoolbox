
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10">
        <div className="mb-4">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        
        <section className="glass-card rounded-xl p-8 mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">Terms of Service</h1>
          
          <div className="space-y-4 text-foreground">
            <p><strong>Last Updated: April 04, 2025</strong></p>
            
            <p>
              Welcome to Image2PDF. By accessing or using our website, you agree to be bound by these Terms of Service.
              Please read them carefully.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Image2PDF, you agree to comply with and be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Description of Service</h2>
            <p>
              Image2PDF provides an online tool for converting image files (such as JPG, PNG) to PDF format.
              The service is provided "as is" and "as available" without any warranties of any kind.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Use of Service</h2>
            <p>You agree to use Image2PDF only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the service to violate any law or regulation</li>
              <li>Upload illegal, harmful, or infringing content</li>
              <li>Attempt to disrupt or overload our service</li>
              <li>Access or attempt to access any portion of the service by any means other than the interface provided</li>
              <li>Use automated means to access or use the service</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Intellectual Property</h2>
            <p>
              Image2PDF and its original content, features, and functionality are owned by Image2PDF and are protected
              by international copyright, trademark, and other intellectual property laws.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. User Content</h2>
            <p>
              You retain all rights to your content. By using our service, you grant us a non-exclusive, royalty-free 
              license to use, process, and convert the images you upload, solely for the purpose of providing our service
              to you. We do not claim ownership of your content, and we do not store your files on our servers.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Limitation of Liability</h2>
            <p>
              In no event shall Image2PDF, its operators, or affiliates be liable for any indirect, incidental, special,
              consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or
              other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will inform you of any changes by posting the
              updated terms on this page with a new effective date. Your continued use of the service after any such changes
              constitutes your acceptance of the new terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <a href="mailto:image2pdfwebsite@gmail.com" className="text-primary hover:underline ml-1">image2pdfsite@gmail.com</a>
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
