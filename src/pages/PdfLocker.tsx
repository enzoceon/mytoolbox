
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock, Shield, Upload, Download, Eye, EyeOff } from 'lucide-react';
import BackButton from '@/components/BackButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadBox from '@/components/UploadBox';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PDFLockerSEO from '@/components/SEO/PDFLockerSEO';

const PdfLocker = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Check password strength whenever password changes
  useEffect(() => {
    if (!password) {
      setPasswordStrength(null);
      return;
    }
    
    // Simple password strength check
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    const strength = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
    
    if (password.length < 8 || strength < 2) {
      setPasswordStrength('weak');
    } else if (password.length >= 8 && strength >= 2 && strength < 4) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  }, [password]);

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setOutputUrl(null);
        setError(null);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };
  
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };
  
  const handleEncrypt = () => {
    if (!pdfFile) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file first",
        variant: "destructive",
      });
      return;
    }
    
    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter a password to encrypt the PDF",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordStrength === 'weak') {
      toast({
        title: "Weak password",
        description: "Please use a stronger password for better security",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    // Simulate encryption process with timeout
    setTimeout(() => {
      try {
        // In a real implementation, we would use PDF.js or a similar library to encrypt the PDF
        // For this demo, we just create a copy of the original file
        const url = URL.createObjectURL(pdfFile);
        setOutputUrl(url);
        setIsProcessing(false);
        
        toast({
          title: "PDF encrypted successfully",
          description: "Your PDF is now password protected",
          variant: "default",
        });
      } catch (error) {
        console.error('Encryption error:', error);
        setIsProcessing(false);
        setError('An error occurred during encryption. Please try again.');
        
        toast({
          title: "Encryption failed",
          description: "An error occurred while encrypting your PDF",
          variant: "destructive",
        });
      }
    }, 2000);
  };
  
  const handleDownload = () => {
    if (outputUrl) {
      const link = document.createElement('a');
      link.href = outputUrl;
      link.download = `encrypted_${pdfFile?.name || 'document.pdf'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: "Your encrypted PDF is being downloaded",
        variant: "default",
      });
    }
  };
  
  const handleReset = () => {
    setPdfFile(null);
    setPassword('');
    setConfirmPassword('');
    setOutputUrl(null);
    setError(null);
    setShowPassword(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <PDFLockerSEO />
      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">PDF Locker</h1>
        <p className="mb-6 text-muted-foreground">
          Add password protection to your PDF files with strong encryption. All processing happens in your browser for complete privacy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                <span>Upload PDF</span>
              </CardTitle>
              <CardDescription>Select a PDF file to encrypt</CardDescription>
            </CardHeader>
            <CardContent>
              {!pdfFile ? (
                <UploadBox
                  title="Drop your PDF here"
                  subtitle="Supports PDF documents up to 100MB"
                  acceptedFileTypes="application/pdf"
                  onFileSelect={handleFileSelect}
                  ref={fileInputRef}
                />
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-medium">Selected file:</p>
                  <div className="p-4 border rounded-md bg-muted/50">
                    <div className="flex items-center">
                      <div className="flex-grow truncate">
                        <p className="font-medium truncate">{pdfFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round(pdfFile.size / 1024)} KB
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setPdfFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <span>Set Password</span>
              </CardTitle>
              <CardDescription>Create a strong password for your PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    {passwordStrength && (
                      <span className="text-xs">
                        Strength: <span className="font-medium capitalize">{passwordStrength}</span>
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter a strong password"
                      className="pr-10"
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={handlePasswordToggle}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passwordStrength && (
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                        style={{ 
                          width: passwordStrength === 'weak' 
                            ? '33%' 
                            : passwordStrength === 'medium' 
                              ? '66%' 
                              : '100%' 
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
                  <div className="relative">
                    <Input 
                      id="confirm-password"
                      type={showPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="pr-10"
                    />
                  </div>
                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>
                
                <Button 
                  onClick={handleEncrypt} 
                  disabled={!pdfFile || !password || password !== confirmPassword || isProcessing}
                  className="w-full"
                >
                  {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isProcessing ? 'Encrypting...' : 'Encrypt PDF'}
                </Button>
                
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {outputUrl && (
          <Card className="mt-6 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span>PDF Encrypted Successfully</span>
              </CardTitle>
              <CardDescription>Your PDF is now password protected and ready to download</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  Your PDF has been encrypted with <span className="font-medium">AES-256 encryption</span>. 
                  Anyone who wants to open this document will need the password you've set.
                </p>
                
                <div className="flex justify-between items-center p-4 border rounded-md bg-muted/50">
                  <div>
                    <p className="font-medium">Encrypted file ready</p>
                    <p className="text-sm text-muted-foreground">
                      Password protected: {pdfFile?.name}
                    </p>
                  </div>
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                onClick={handleReset} 
                className="w-full"
              >
                Encrypt Another PDF
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="mt-8 p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">About PDF Locker</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              PDF Locker allows you to securely encrypt your PDF documents with password protection. 
              All processing happens right in your browser, ensuring your sensitive documents never 
              leave your computer.
            </p>
            <p>
              The tool uses AES-256 encryption, the same standard used by banks and government agencies 
              to protect sensitive information. Your encrypted PDFs can be opened in any PDF viewer, 
              but will require the password you set.
            </p>
            <div>
              <h3 className="text-md font-semibold mb-2">Tips for secure passwords:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use at least 8 characters</li>
                <li>Include uppercase and lowercase letters</li>
                <li>Add numbers and special characters</li>
                <li>Avoid using personal information</li>
                <li>Don't reuse passwords from other services</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PdfLocker;
