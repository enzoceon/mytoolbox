
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import AllTools from "./pages/AllTools";
import PdfToImage from "./pages/PdfToImage";
import JPGtoPNG from "./pages/JPGtoPNG";
import QrCodeGenerator from "./pages/QrCodeGenerator";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Contact from "./pages/Contact";
import Refund from "./pages/Refund";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import { ImageConversionProvider } from "./components/conversion/ImageConversionProvider";
import { JPGtoPNGProvider } from "./components/conversion/JPGtoPNGProvider";
import ConverterSection from "./components/sections/ConverterSection";
import ImageCompressor from "./pages/ImageCompressor";
import HtmlToPdf from "./pages/HtmlToPdf";
import ColorPicker from "./pages/ColorPicker";
import PasswordGenerator from "./pages/PasswordGenerator";
import CountdownTimer from "./pages/CountdownTimer";
import TextEditor from "./pages/TextEditor";
import PdfMerger from "./pages/PdfMerger";
import PdfSplitter from "./pages/PdfSplitter";
import PdfCompressor from "./pages/PdfCompressor";
import TextToSpeech from "./pages/TextToSpeech";
import OcrTool from "./pages/OcrTool";
import CurrencyConverter from "./pages/CurrencyConverter";
import TextReplacer from "./pages/TextReplacer";
import ImageCropper from "./pages/ImageCropper";
import TextToHandwriting from "./pages/TextToHandwriting";
import TextToEmoji from "./pages/TextToEmoji";
import ImageToQR from "./pages/ImageToQR";
import VideoToQR from "./pages/VideoToQR";
import AudioToQR from "./pages/AudioToQR";
import FileRenamer from "./pages/FileRenamer";
import { FileRenamerProvider } from "./components/file-renamer/FileRenamerProvider";
import ComingSoon from "./pages/ComingSoon";
import HowToUse from "./pages/HowToUse";
import { restoreScrollPosition } from "./utils/scrollUtils";
import RemoveAudioFromVideo from "./pages/RemoveAudioFromVideo";
import ExtractAudioFromVideo from "./pages/ExtractAudioFromVideo";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ((pathname === '/tools' || pathname === '/') && navigationType === 'POP') {
      setTimeout(() => {
        restoreScrollPosition();
      }, 0);
    } else if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, navigationType]);

  return null;
};

const ContextMenuHandler = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    
    document.addEventListener("contextmenu", handleContextMenu);
    
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return null;
};

const AppContent = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <ContextMenuHandler />
      <Routes>
        <Route path="/" element={<AllTools />} />
        <Route path="/image-to-pdf" element={
          <ImageConversionProvider>
            <ConverterSection />
          </ImageConversionProvider>
        } />
        <Route path="/pdf-to-image" element={<PdfToImage />} />
        <Route path="/jpg-to-png" element={
          <JPGtoPNGProvider>
            <JPGtoPNG />
          </JPGtoPNGProvider>
        } />
        <Route path="/qr-code-generator" element={<QrCodeGenerator />} />
        <Route path="/image-compressor" element={<ImageCompressor />} />
        <Route path="/html-to-pdf" element={<HtmlToPdf />} />
        <Route path="/color-picker" element={<ColorPicker />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/countdown-timer" element={<CountdownTimer />} />
        <Route path="/text-editor" element={<TextEditor />} />
        <Route path="/pdf-merger" element={<PdfMerger />} />
        <Route path="/pdf-splitter" element={<PdfSplitter />} />
        <Route path="/pdf-compressor" element={<PdfCompressor />} />
        <Route path="/text-to-speech" element={<TextToSpeech />} />
        <Route path="/extract-text-from-image" element={<OcrTool />} />
        <Route path="/text-to-emoji" element={<TextToEmoji />} />
        
        <Route path="/ai-image-generator" element={<ComingSoon />} />
        <Route path="/ai-chatbot" element={<ComingSoon />} />
        <Route path="/ai-text-generator" element={<ComingSoon />} />
        <Route path="/ai-content-summarizer" element={<ComingSoon />} />
        <Route path="/audio-trimmer" element={<ComingSoon />} />
        <Route path="/video-to-gif" element={<ComingSoon />} />
        <Route path="/gif-to-video" element={<ComingSoon />} />
        <Route path="/pdf-watermark" element={<ComingSoon />} />
        <Route path="/add-audio-to-video" element={<ComingSoon />} />
        <Route path="/pdf-to-text" element={<ComingSoon />} />
        <Route path="/background-remover" element={<ComingSoon />} />
        <Route path="/pdf-password-remover" element={<ComingSoon />} />
        <Route path="/pixelate-image" element={<ComingSoon />} />
        <Route path="/random-text" element={<ComingSoon />} />
        <Route path="/image-watermark" element={<ComingSoon />} />
        <Route path="/video-compressor" element={<ComingSoon />} />
        <Route path="/video-to-qr-code" element={<ComingSoon />} />
        <Route path="/text-to-handwriting" element={<ComingSoon />} />
        
        <Route path="/image-to-qr" element={<ImageToQR />} />
        <Route path="/video-to-qr" element={<VideoToQR />} />
        <Route path="/audio-to-qr" element={<AudioToQR />} />
        
        <Route path="/currency-converter" element={<CurrencyConverter />} />
        <Route path="/text-replacer" element={<TextReplacer />} />
        <Route path="/image-cropper" element={<ImageCropper />} />
        
        <Route path="/tools" element={<AllTools />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/file-renamer" element={
          <FileRenamerProvider>
            <FileRenamer />
          </FileRenamerProvider>
        } />
        <Route path="/remove-audio-from-video" element={<RemoveAudioFromVideo />} />
        <Route path="/extract-audio-from-video" element={<ExtractAudioFromVideo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
