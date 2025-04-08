import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileAudio, Download, AlertCircle, PlayCircle, StopCircle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from "sonner";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import SpaceBackground from '@/components/SpaceBackground';
import { QRCodeCanvas } from 'qrcode.react';

const AudioToQR = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(250);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [audioTooLarge, setAudioTooLarge] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  
  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      
      if (!file.type.startsWith('audio/')) {
        toast.error('Please select an audio file');
        return;
      }
      
      setSelectedFile(file);
      setAudioTooLarge(false);
      setErrorMessage(null);
      setBase64Data(null);
      setIsPlaying(false);
      
      if (file.size > 1 * 1024 * 1024) {
        setAudioTooLarge(true);
        toast.error('Audio is too large to encode in a QR code (max 1MB)');
      } else if (file.size > 500 * 1024) {
        toast.warning('Audio is large and may result in a complex QR code');
      }
      
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };
  
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .catch(error => {
          console.error('Error playing audio:', error);
          toast.error('Failed to play audio');
        });
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };
  
  const convertAudioToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };
  
  const generateQRCode = async () => {
    if (!selectedFile) {
      toast.error("Please select an audio file first");
      return;
    }
    
    if (audioTooLarge) {
      toast.error("Audio is too large to encode in a QR code");
      return;
    }
    
    setIsGenerating(true);
    setErrorMessage(null);
    
    try {
      const base64Audio = await convertAudioToBase64(selectedFile);
      setBase64Data(base64Audio);
      
      toast.success("QR code generated successfully");
    } catch (error) {
      console.error("Error generating QR code:", error);
      setErrorMessage("Failed to generate QR code. Please try again with a different audio file.");
      setBase64Data(null);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownload = () => {
    if (!base64Data) return;
    
    const canvas = document.getElementById('audio-qr-code') as HTMLCanvasElement;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `audio-qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR Code downloaded successfully!");
  };
  
  const handleRemoveAudio = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setBase64Data(null);
    setErrorMessage(null);
    setAudioTooLarge(false);
    setIsPlaying(false);
  };

  return (
    <>
      <Helmet>
        <title>Audio to QR Code - Convert Sound Files to QR | MyToolbox</title>
        <meta name="description" content="Convert audio files to QR codes. Share music, sound effects, voice messages and more through scannable QR codes." />
        <meta name="keywords" content="audio to qr code, sound to qr, voice to qr code, music qr code, audio converter" />
      </Helmet>
      
      <SpaceBackground />
      <Header />
      
      <main className="container mx-auto px-4 py-10 min-h-screen">
        <BackButton />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Audio to QR Code</h1>
            <p className="text-lg text-muted-foreground">
              Convert audio files to scannable QR codes to share sounds easily
            </p>
          </div>
          
          <Alert className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            <Info className="h-4 w-4" />
            <AlertTitle>Size Limitations</AlertTitle>
            <AlertDescription>
              Only small audio files (under 1MB) can be encoded into QR codes. For best results, 
              use files under 500KB with shorter duration or compressed formats.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardContent className="pt-6 space-y-6">
                {!selectedFile ? (
                  <UploadBox
                    title="Upload your audio"
                    subtitle="Select a small audio file to convert to QR code (MP3, WAV, M4A)"
                    acceptedFileTypes="audio/*"
                    onFileSelect={handleFileSelect}
                    multiple={false}
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Selected Audio</Label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleRemoveAudio}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="border rounded-lg overflow-hidden bg-background/50 p-4">
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={togglePlayPause}
                            className="h-12 w-12 rounded-full"
                          >
                            {isPlaying ? (
                              <StopCircle className="h-6 w-6" />
                            ) : (
                              <PlayCircle className="h-6 w-6" />
                            )}
                          </Button>
                          <div className="flex-1">
                            <div className="text-sm font-medium truncate">
                              {selectedFile.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {Math.round(selectedFile.size / 1024)} KB
                            </div>
                          </div>
                        </div>
                        
                        <audio 
                          ref={audioRef}
                          src={previewUrl || ''}
                          className="hidden"
                          onEnded={handleAudioEnded}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="qrSize">QR Code Size</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="qrSize"
                          min={100}
                          max={500}
                          step={10}
                          value={[qrSize]}
                          onValueChange={(values) => setQrSize(values[0])}
                          className="flex-1"
                        />
                        <span className="text-sm w-12 text-right">{qrSize}px</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={generateQRCode}
                      disabled={isGenerating || audioTooLarge}
                    >
                      {isGenerating ? 'Generating...' : 'Generate QR Code'}
                    </Button>
                    
                    {errorMessage && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </Alert>
                    )}
                    
                    {audioTooLarge && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          This audio file exceeds the 1MB size limit for QR code encoding.
                          Please select a smaller file or compress your audio first.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardContent className="flex flex-col items-center justify-center min-h-[400px] p-6">
                {base64Data ? (
                  <div className="space-y-6 w-full flex flex-col items-center">
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                      <QRCodeCanvas 
                        id="audio-qr-code"
                        value={base64Data}
                        size={qrSize}
                        level="L"
                      />
                    </div>
                    
                    <Button onClick={handleDownload} className="gap-2">
                      <Download size={16} />
                      Download QR Code
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      Note: This QR code contains the entire audio data. When scanned, most QR code 
                      readers will allow you to play the audio. Complex or large audio files may result 
                      in QR codes that are difficult to scan.
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <FileAudio size={100} className="text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Upload a small audio file and generate a QR code to see the result here
                    </p>
                    <p className="text-xs text-muted-foreground max-w-md">
                      Only small audio files work well in QR codes. For best results, use short 
                      audio clips with compressed formats (MP3, AAC).
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-card/30 backdrop-blur rounded-lg p-6 border border-border/50">
            <h2 className="text-xl font-semibold mb-4">About Audio to QR Code</h2>
            <div className="space-y-4 text-sm">
              <p>
                This tool embeds your audio data directly within a QR code. When scanned, compatible QR code readers 
                will display or allow you to play the embedded audio.
              </p>
              <p>
                <strong>Suggested uses:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Short voice messages or announcements</li>
                <li>Sound effects for events or presentations</li>
                <li>Short music clips or jingles</li>
                <li>Language pronunciation guides</li>
              </ul>
              <p className="mt-4">
                <strong>Important notes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Only small audio files (under 1MB) can be encoded in QR codes</li>
                <li>Best results come from files under 500KB</li>
                <li>We recommend using compressed formats (MP3, AAC) rather than WAV</li>
                <li>All processing happens in your browser - your audio is never uploaded to our servers</li>
                <li>Not all QR code scanners support embedded audio playback</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AudioToQR;
