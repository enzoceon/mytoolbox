
import React, { useEffect, useRef } from 'react';
import { Check, FileImage, Clock, FileCheck, Star } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const features = entry.target.querySelectorAll('.feature-card');
            features.forEach((feature, index) => {
              setTimeout(() => {
                feature.classList.add('stagger-animate');
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
    <section className="py-6 px-4 sm:px-8 my-2" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Key Features</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center feature-card opacity-0">
            <Check className="h-10 w-10 text-green-500 mb-3 pulse-icon" />
            <h3 className="text-lg font-semibold mb-2">Privacy Focused</h3>
            <p className="text-sm text-muted-foreground">
              Your data stays on your device with client-side processing. No uploads to external servers, ensuring complete privacy.
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center feature-card opacity-0">
            <FileImage className="h-10 w-10 text-blue-500 mb-3 pulse-icon" />
            <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
            <p className="text-sm text-muted-foreground">
              Wide format compatibility including JPG, PNG, WebP, TIFF, GIF, and BMP with automatic format detection.
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center feature-card opacity-0">
            <Clock className="h-10 w-10 text-amber-500 mb-3 pulse-icon" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Advanced algorithms process your files instantly, with batch conversion capabilities for multiple images.
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center feature-card opacity-0">
            <FileCheck className="h-10 w-10 text-purple-500 mb-3 pulse-icon" />
            <h3 className="text-lg font-semibold mb-2">Quality Preserved</h3>
            <p className="text-sm text-muted-foreground">
              Lossless conversion technology ensures your images maintain their original clarity, resolution and color accuracy.
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center feature-card opacity-0">
            <Star className="h-10 w-10 text-yellow-500 mb-3 pulse-icon" />
            <h3 className="text-lg font-semibold mb-2">User-Friendly</h3>
            <p className="text-sm text-muted-foreground">
              Intuitive interface designed for ease of use, making complex conversions simple for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
