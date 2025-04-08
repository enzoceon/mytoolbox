import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import AudioTrimmer from "./pages/AudioTrimmer";
import OcrTool from "./pages/OcrTool";
import AiContentSummarizer from "./pages/AiContentSummarizer";
import CurrencyConverter from "./pages/CurrencyConverter";
import TextReplacer from "./pages/TextReplacer";
import ImageCropper from "./pages/ImageCropper";
import TextToHandwriting from "./pages/TextToHandwriting";
import TextToEmoji from "./pages/TextToEmoji";
import VideoToGif from "./pages/VideoToGif";
import ImageToQR from "./pages/ImageToQR";
import VideoToQR from "./pages/VideoToQR";
import AudioToQR from "./pages/AudioToQR";
import FileRenamer from "./pages/FileRenamer";
import { FileRenamerProvider } from "./components/file-renamer/FileRenamerProvider";
import AiImageGenerator from "./pages/AiImageGenerator";
import AiTextGenerator from "./pages/AiTextGenerator";
import AiChatbot from "./pages/AiChatbot";
import ComingSoon from "./pages/ComingSoon";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

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
        <Route path="/audio-trimmer" element={<AudioTrimmer />} />
        <Route path="/ocr-tool" element={<OcrTool />} />
        <Route path="/ai-content-summarizer" element={<AiContentSummarizer />} />
        <Route path="/ai-image-generator" element={<ComingSoon />} />
        <Route path="/ai-text-generator" element={<AiTextGenerator />} />
        <Route path="/ai-chatbot" element={<AiChatbot />} />
        
        <Route path="/image-to-qr" element={<ImageToQR />} />
        <Route path="/video-to-qr" element={<VideoToQR />} />
        <Route path="/audio-to-qr" element={<AudioToQR />} />
        
        <Route path="/currency-converter" element={<CurrencyConverter />} />
        <Route path="/text-replacer" element={<TextReplacer />} />
        <Route path="/image-cropper" element={<ImageCropper />} />
        <Route path="/text-to-handwriting" element={<TextToHandwriting />} />
        <Route path="/text-to-emoji" element={<TextToEmoji />} />
        <Route path="/video-to-gif" element={<VideoToGif />} />
        
        <Route path="/tools" element={<AllTools />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/file-renamer" element={
          <FileRenamerProvider>
            <FileRenamer />
          </FileRenamerProvider>
        } />
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
