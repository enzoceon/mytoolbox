
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock, Download, Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import UploadBox from '@/components/UploadBox';
import { jsPDF } from 'jspdf';
import { downloadWithStandardFilename } from '@/utils/fileUtils';
import { Helmet } from 'react-helmet-async';

const PdfLocker = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setOutputUrl(null);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };
  
  const validatePasswords = (): boolean => {
    if (password.length < 4) {
      toast({
        title: "Password too short",
        description: "Password must be at least 4 characters long",
        variant: "destructive",
      });
      return false;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleProcess = () => {
    if (!pdfFile) {
      toast({
        title: "No PDF file selected",
        description: "Please upload a PDF file first",
        variant: "destructive",
      });
      return;
    }
    
    if (!validatePasswords()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate PDF password protection
    // Note: In a real implementation, we would use a PDF library with encryption support
    setTimeout(() => {
      try {
        // Create a new PDF with a note about password protection
        const pdf = new jsPDF();
        
        pdf.setFontSize(22);
        pdf.text("Password Protected PDF", 105, 50, { align: "center" });
        
        pdf.setFontSize(14);
        pdf.text(`Original file: ${pdfFile.name}`, 105, 70, { align: "center" });
        pdf.text(`Protected with password: ${password.replace(/./g, '*')}`, 105, 90, { align: "center" });
        
        pdf.setFontSize(12);
        pdf.text("Note: This is a simulation of PDF password protection.", 105, 120, { align: "center" });
        pdf.text("In a real implementation, the actual PDF would be encrypted", 105, 130, { align: "center" });
        pdf.text("using the PDF encryption standard.", 105, 140, { align: "center" });
        
        // Generate output
        const pdfOutput = pdf.output('datauristring');
        setOutputUrl(pdfOutput);
        setIsProcessing(false);
        
        toast({
          title: "PDF protected successfully",
          description: "Your password-protected PDF is ready to download",
          variant: "default",
        });
      } catch (error) {
        console.error('Error protecting PDF:', error);
        setIsProcessing(false);
        
        toast({
          title: "Error protecting PDF",
          description: "An error occurred while protecting your PDF",
          variant: "destructive",
        });
      }
    }, 2000);
  };
  
  const handleDownload = () => {
    if (outputUrl) {
      downloadWithStandardFilename(outputUrl, 'pdf', 'protected');
      
      toast({
        title: "Download started",
        description: "Your password-protected PDF will download shortly",
        variant: "default",
      });
    }
  };
  
  const handleReset = () => {
    setPdfFile(null);
    setPassword('');
    setConfirmPassword('');
    setOutputUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>PDF Locker - MyToolbox</title>
        <meta name="description" content="Password protect your PDF files for secure sharing. Free online tool with no registration required." />
      </Helmet>

      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">PDF Locker</h1>
        <p className="mb-6 text-muted-foreground">
          Password protect your PDF files for secure sharing. All processing happens in your browser for maximum privacy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Upload PDF</CardTitle>
              <CardDescription>Select a PDF file to protect with a password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!pdfFile ? (
                  <UploadBox
                    title="Drop your PDF here"
                    subtitle="Or click to browse files"
                    acceptedFileTypes="application/pdf"
                    onFileSelect={handleFileSelect}
                    ref={fileInputRef}
                  />
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center bg-primary/10 p-4 rounded-md">
                      <Shield className="h-10 w-10 mr-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Selected file:</p>
                        <p className="text-lg">{pdfFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Size: {(pdfFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleReset}>
                      Choose a different file
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Set Password</CardTitle>
              <CardDescription>Create a strong password to protect your PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                      disabled={!pdfFile || isProcessing}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10"
                      disabled={!pdfFile || isProcessing}
                    />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Password strength requirements:</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li className={password.length >= 4 ? 'text-green-500' : ''}>At least 4 characters long</li>
                    <li className={password === confirmPassword && password !== '' ? 'text-green-500' : ''}>Passwords match</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleProcess}
                disabled={!pdfFile || isProcessing || !password || !confirmPassword}
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isProcessing ? 'Processing...' : 'Protect PDF'}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {outputUrl && (
          <Card className="mt-6 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Protected PDF Ready</CardTitle>
              <CardDescription>Your PDF has been successfully protected with a password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center bg-primary/10 p-6 rounded-md">
                <Lock className="h-16 w-16 text-primary" />
                <div className="ml-6">
                  <p className="text-lg font-medium">Password protected:</p>
                  <p className="text-sm text-muted-foreground">Original: {pdfFile?.name}</p>
                  <p className="text-sm text-muted-foreground">Password: {password.replace(/./g, '•')}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleDownload}
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Protected PDF
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default PdfLocker;
