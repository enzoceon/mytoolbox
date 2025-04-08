
import React, { useState, useRef } from 'react';
import { FileAudio, QrCode, Download, AlertTriangle, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Helmet } from 'react-helmet-async';
import SpaceBackground from '@/components/SpaceBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import UploadBox from '@/components/UploadBox';
import AdPlacement from '@/components/AdPlacement';
import QRCode from 'qrcode.react';

const AudioToQR = () => {
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState<number>(200);
  const [qrColor, setQrColor] = useState<string>('#000000');
  const [qrBgColor, setQrBgColor] = useState<string>('#ffffff');
  const [loading, setLoading] = useState<boolean>(false);
  const [audioTooLarge, setAudioTooLarge] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('audio/')) {
        toast.error("Please select an audio file");
        return;
      }
      
      // Validate file size (max 5MB for direct encoding)
      if (file.size > 5 * 1024 * 1024) {
        setAudioTooLarge(true);
        toast.warning("Audio is large and will only be previewed locally. The QR code will contain metadata only.", {
          duration: 5000,
        });
      } else {
        setAudioTooLarge(false);
      }
      
      // Set the selected file and preview
      setSelectedAudio(file);
      setAudioPreview(URL.createObjectURL(file));
      setQrCodeValue(null); // Reset QR code when new audio is selected
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const generateQRCode = () => {
    if (!selectedAudio) {
      toast.error("Please select an audio file first");
      return;
    }
    
    setLoading(true);
    
    if (audioTooLarge) {
      // For large audio files, create a QR code with audio metadata instead of the actual content
      const metadata = {
        name: selectedAudio.name,
        type: selectedAudio.type,
        size: selectedAudio.size,
        lastModified: selectedAudio.lastModified,
        description: "This QR code contains audio metadata. The actual audio is too large to encode directly."
      };
      
      setQrCodeValue(JSON.stringify(metadata));
      setLoading(false);
      toast.success("QR Code with audio metadata generated successfully!");
    } else {
      // For smaller audio files, try to encode the actual content
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          // Set QR code value to the data URL
          setQrCodeValue(e.target.result as string);
          setLoading(false);
          toast.success("QR Code generated successfully!");
        }
      };
      reader.onerror = () => {
        toast.error("Failed to read the audio file");
        setLoading(false);
      };
      reader.readAsDataURL(selectedAudio);
    }
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    try {
      const canvas = qrRef.current.querySelector('canvas');
      if (!canvas) {
        toast.error("QR Code canvas not found");
        return;
      }
      
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `audio-qr-code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success("QR Code downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download QR Code");
    }
  };

  const resetState = () => {
    if (audioPreview) {
      URL.revokeObjectURL(audioPreview);
    }
    setSelectedAudio(null);
    setAudioPreview(null);
    setQrCodeValue(null);
    setAudioTooLarge(false);
    setIsPlaying(false);
  };

  return (
    <>
      <Helmet>
        <title>Audio to QR Code Converter - Free Online Tool | EveryTools</title>
        <meta name="description" content="Convert your audio files to QR codes for easy sharing. No registration, no watermarks, all processing happens in your browser." />
        <link rel="canonical" href="https://everytools.site/audio-to-qr" />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Audio</span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">QR Code</span>
              <span className="text-white"> Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert your audio files to QR codes for easy sharing. No registration required.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/40">
              <h2 className="text-xl font-semibold mb-4 text-center">Upload Audio</h2>
              
              {!audioPreview ? (
                <UploadBox 
                  title="Drop your audio file here"
                  subtitle="Select an audio file to convert to QR code"
                  acceptedFileTypes="audio/*"
                  onFileSelect={handleFileSelect}
                  multiple={false}
                />
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-md overflow-hidden border border-white/10 p-4 bg-black/20">
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        onClick={togglePlay}
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </Button>
                      <div className="flex-1">
                        <p className="text-sm font-medium truncate">{selectedAudio?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedAudio?.size ?? 0) < 1024 * 1024
                            ? `${Math.round((selectedAudio?.size ?? 0) / 1024)} KB`
                            : `${Math.round((selectedAudio?.size ?? 0) / (1024 * 1024) * 10) / 10} MB`}
                        </p>
                        <audio
                          ref={audioRef}
                          src={audioPreview}
                          onEnded={handleAudioEnd}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {audioTooLarge && (
                    <div className="text-center text-sm text-yellow-400 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span>This audio file is too large for full encoding. The QR code will contain metadata only.</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="destructive" 
                      onClick={resetState}
                    >
                      Remove
                    </Button>
                    <Button 
                      onClick={generateQRCode}
                      disabled={loading}
                    >
                      {loading ? (
                        <>Generating QR Code...</>
                      ) : (
                        <>
                          <QrCode className="mr-2 h-4 w-4" />
                          Generate QR Code
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/40">
              <h2 className="text-xl font-semibold mb-4 text-center">QR Code Result</h2>
              
              {qrCodeValue ? (
                <div className="space-y-6 flex flex-col items-center">
                  <div ref={qrRef} className="p-4 bg-white rounded-lg shadow-lg">
                    <QRCode 
                      value={qrCodeValue} 
                      size={qrSize}
                      fgColor={qrColor}
                      bgColor={qrBgColor}
                      level="H"
                      renderAs="canvas"
                    />
                  </div>
                  
                  <div className="w-full grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">QR Size</label>
                      <input 
                        type="range" 
                        min="100" 
                        max="300" 
                        value={qrSize} 
                        onChange={(e) => setQrSize(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">QR Color</label>
                      <input 
                        type="color" 
                        value={qrColor} 
                        onChange={(e) => setQrColor(e.target.value)}
                        className="w-full h-8 cursor-pointer rounded"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={downloadQRCode}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    {audioTooLarge ? 
                      "Note: This QR code contains audio metadata only, not the actual audio content due to size limitations." :
                      "Note: The QR code contains the audio data. Some QR code scanners may have difficulties reading codes with large amounts of data."
                    }
                  </p>
                </div>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                  <QrCode className="h-16 w-16 mb-4 opacity-20" />
                  <p>Upload an audio file and generate a QR code to see the result here</p>
                </div>
              )}
            </div>
          </div>
          
          <AdPlacement format="horizontal" className="mt-8" contentLoaded={true} />
          
          <div className="mt-8 bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/40">
            <h2 className="text-xl font-semibold mb-4">About Audio to QR Code Conversion</h2>
            <p className="mb-4">
              This tool allows you to convert audio files into QR codes. For small audio files (under 5MB), the QR code will contain
              the actual audio data. For larger files, the QR code will contain metadata about the audio.
            </p>
            <p className="mb-4">
              When someone scans the QR code with a compatible QR code reader, they can listen to the audio (for small files)
              or see information about the audio file (for larger files).
            </p>
            <p>
              All processing happens directly in your browser - your audio files are never uploaded to any server, 
              ensuring your privacy and data security.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AudioToQR;
