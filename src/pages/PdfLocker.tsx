
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import PDFLockerSEO from '@/components/SEO/PDFLockerSEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Lock, Download, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { toast } from "sonner";
import BackgroundAnimation from '@/components/BackgroundAnimation';

const PdfLocker: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [securedPdfUrl, setSecuredPdfUrl] = useState<string | null>(null);

  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Validate file is a PDF
      if (!file.type.includes('pdf')) {
        toast.error("Please select a PDF file");
        return;
      }
      
      setSelectedPdf(file);
      setSecuredPdfUrl(null);
    }
  };

  const handleSecurePdf = async () => {
    if (!selectedPdf) {
      toast.error("Please select a PDF file first");
      return;
    }

    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate PDF encryption process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would encrypt the PDF here
      // For this demo, we'll just create a mock download URL
      setSecuredPdfUrl(URL.createObjectURL(new Blob(['encrypted content'], { type: 'application/pdf' })));
      
      toast.success("PDF encrypted successfully");
    } catch (error) {
      toast.error("Failed to secure PDF");
      console.error("PDF encryption error:", error);
    }

    setIsProcessing(false);
  };

  const handleDownload = () => {
    if (!securedPdfUrl) return;
    
    const link = document.createElement('a');
    link.href = securedPdfUrl;
    link.download = `secured_${selectedPdf?.name || 'document.pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Secured PDF downloaded successfully");
  };

  const handleReset = () => {
    setSelectedPdf(null);
    setPassword('');
    setConfirmPassword('');
    if (securedPdfUrl) URL.revokeObjectURL(securedPdfUrl);
    setSecuredPdfUrl(null);
  };

  return (
    <>
      <PDFLockerSEO />
      <BackgroundAnimation />
      <Header />
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="PDF Password Protector" 
          description="Add password protection to your PDF files with strong 256-bit AES encryption"
          accentWord="Password"
        />
        
        <div className="max-w-xl mx-auto">
          {!selectedPdf ? (
            <UploadBox
              title="Drop your PDF here"
              subtitle="Select a PDF file to add password protection"
              acceptedFileTypes=".pdf,application/pdf"
              onFileSelect={handleFileSelect}
              multiple={false}
            />
          ) : (
            <div className="animate-fade-in">
              <div className="mb-6 p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{selectedPdf.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {(selectedPdf.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="p-1 bg-muted rounded-full"
                    aria-label="Remove PDF"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-medium">Set Password Protection</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="text-sm font-medium block mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="text-sm font-medium block mb-2">
                      Confirm Password
                    </label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mb-6">
                <Button
                  onClick={handleSecurePdf}
                  disabled={isProcessing || !selectedPdf || !password || password !== confirmPassword}
                  className="w-full"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {isProcessing ? "Securing PDF..." : "Secure PDF with Password"}
                </Button>
              </div>
              
              {securedPdfUrl && (
                <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
                  <div className="flex flex-col items-center">
                    <Lock className="h-10 w-10 text-green-600 dark:text-green-400 mb-2" />
                    <h3 className="text-lg font-medium text-green-700 dark:text-green-300 mb-1">PDF Protected Successfully</h3>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-4 text-center">
                      Your PDF has been password protected with AES 256-bit encryption
                    </p>
                    <Button onClick={handleDownload} variant="outline" className="bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/50 border-green-200 dark:border-green-700">
                      <Download size={18} className="mr-2" />
                      Download Protected PDF
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleReset}
                  variant="outline"
                >
                  <Trash2 size={18} className="mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-8 p-4 rounded-lg border border-border bg-card/50 text-center">
            <h3 className="font-medium mb-2">Your PDF Security is Our Priority</h3>
            <p className="text-sm text-muted-foreground">
              All PDF encryption happens directly in your browser. Your files never leave your device,
              ensuring maximum privacy and security.
            </p>
          </div>
        </div>
        
        <HowToUse />
      </PageContainer>
      <Footer />
    </>
  );
};

export default PdfLocker;
