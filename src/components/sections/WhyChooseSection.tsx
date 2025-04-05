
import React from 'react';

const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-6 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Image2PDF?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">100% Free & No Watermarks</h3>
            <p className="text-muted-foreground">
              Unlike many other conversion tools, Image2PDF is completely free to use with no hidden fees or watermarks on your documents. We believe essential digital tools should be accessible to everyone.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Privacy First Approach</h3>
            <p className="text-muted-foreground">
              Your images are processed entirely in your browser and never uploaded to any server. This ensures your sensitive documents remain private and secure throughout the conversion process.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">High-Quality Conversion</h3>
            <p className="text-muted-foreground">
              Our tool preserves the original dimensions and quality of your images, resulting in professional-looking PDF documents suitable for both personal and business use.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">No Installation Required</h3>
            <p className="text-muted-foreground">
              Image2PDF works directly in your web browser - no need to download or install any software. Access our tool anytime, from any device with an internet connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
