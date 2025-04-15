
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import BackButton from '@/components/BackButton';
import { FileRenamerProvider } from '@/components/file-renamer/FileRenamerProvider';
import FileRenamerArea from '@/components/file-renamer/FileRenamerArea';
import FileRenamerSEO from '@/components/SEO/FileRenamerSEO';

const FileRenamer = () => {
  return (
    <>
      <FileRenamerSEO />
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container px-4 mx-auto py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">File Renamer</h1>
            <p className="text-muted-foreground">Easily rename multiple files with custom patterns</p>
          </div>
          
          <FileRenamerProvider>
            <FileRenamerArea />
          </FileRenamerProvider>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How to Use the File Renamer</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-lg mb-2">1. Upload Files</h3>
                <p>Select the files you want to rename by dragging and dropping them or using the file browser.</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-lg mb-2">2. Set Renaming Pattern</h3>
                <p>Customize how your files will be renamed using available placeholders:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>{"{name}"} - Original filename without extension</li>
                  <li>{"{ext}"} - File extension</li>
                  <li>{"{index}"} - Sequential number (starting from your chosen number)</li>
                  <li>{"{date}"} - Current date (YYYY-MM-DD format)</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-lg mb-2">3. Add Prefix/Suffix (Optional)</h3>
                <p>You can add text before and/or after the main filename pattern.</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-lg mb-2">4. Preview and Download</h3>
                <p>Review how your files will be renamed and download them as a ZIP archive.</p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FileRenamer;
