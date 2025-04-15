
import React, { useEffect, useRef } from 'react';

const WhyChooseSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('stagger-animate');
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-8 px-4 sm:px-8 bg-gradient-to-b from-background to-background/80" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center glow-text">Why Choose MyToolbox?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 feature-card opacity-0">
            <h3 className="text-xl font-semibold mb-3">100% Free & No Watermarks</h3>
            <p className="text-muted-foreground">
              Unlike many other online tools, MyToolbox is completely free to use with no hidden fees or watermarks on your documents. We believe essential digital tools should be accessible to everyone.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 feature-card opacity-0">
            <h3 className="text-xl font-semibold mb-3">Privacy First Approach</h3>
            <p className="text-muted-foreground">
              Your files are processed entirely in your browser and never uploaded to any server. This ensures your sensitive documents remain private and secure throughout the conversion process.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 feature-card opacity-0">
            <h3 className="text-xl font-semibold mb-3">High-Quality Conversions</h3>
            <p className="text-muted-foreground">
              Our tools preserve the original quality of your files, resulting in professional-looking documents suitable for both personal and business use across all our conversion utilities.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 feature-card opacity-0">
            <h3 className="text-xl font-semibold mb-3">No Installation Required</h3>
            <p className="text-muted-foreground">
              MyToolbox works directly in your web browser - no need to download or install any software. Access our suite of tools anytime, from any device with an internet connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
