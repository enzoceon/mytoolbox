
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section id="how-to-use" className="py-16 bg-[#070b19]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Using MyToolbox is simple and straightforward. Follow these three easy steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0c1224] p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow border border-white/10">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-900/30 flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Choose Your Tool</h3>
            <p className="text-sm text-gray-400">
              Browse our collection of tools and select the one you need for your task.
            </p>
          </div>
          
          <div className="bg-[#0c1224] p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow border border-white/10">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-900/30 flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Upload Your Files</h3>
            <p className="text-sm text-gray-400">
              Drag and drop your files or click to browse and select from your device.
            </p>
          </div>
          
          <div className="bg-[#0c1224] p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow border border-white/10">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-900/30 flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Get Results</h3>
            <p className="text-sm text-gray-400">
              Process your files and download the results with a single click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
