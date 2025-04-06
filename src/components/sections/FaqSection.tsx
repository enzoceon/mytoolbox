
import React, { useEffect, useRef } from 'react';

const FaqSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const faqItems = entry.target.querySelectorAll('.faq-item');
            faqItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('stagger-animate');
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
    <section className="py-6 px-4 sm:px-8 mb-8" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center glow-text">Frequently Asked Questions</h2>
        
        <div className="space-y-4 mt-6">
          <div className="glass-card p-5 rounded-xl faq-item opacity-0">
            <h3 className="text-lg font-semibold mb-2">How do I convert images to PDF?</h3>
            <p className="text-muted-foreground">
              Simply drag and drop your images onto the upload area, or click to select files from your device. Once uploaded, click the "Convert to PDF" button and download your PDF when ready.
            </p>
          </div>
          
          <div className="glass-card p-5 rounded-xl faq-item opacity-0">
            <h3 className="text-lg font-semibold mb-2">What image formats are supported?</h3>
            <p className="text-muted-foreground">
              Image2PDF supports all common image formats including JPG, JPEG, PNG, GIF, BMP, WEBP, and TIFF. If you have images in other formats, you may need to convert them first.
            </p>
          </div>
          
          <div className="glass-card p-5 rounded-xl faq-item opacity-0">
            <h3 className="text-lg font-semibold mb-2">Is there a limit to how many images I can convert?</h3>
            <p className="text-muted-foreground">
              You can convert multiple images at once, but for optimal performance, we recommend keeping the total file size under 50MB. If you need to convert larger batches, you may want to process them in smaller groups.
            </p>
          </div>
          
          <div className="glass-card p-5 rounded-xl faq-item opacity-0">
            <h3 className="text-lg font-semibold mb-2">Are my images safe when using this tool?</h3>
            <p className="text-muted-foreground">
              Absolutely! Your images are processed entirely in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive documents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
