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
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { ImageConversionProvider } from "./components/conversion/ImageConversionProvider";
import ConverterSection from "./components/sections/ConverterSection";

// ScrollToTop component to handle scrolling on route changes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, let the hash link handling work
    if (!hash) {
      // Otherwise, scroll to top on route change
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// Custom component to handle context menu prevention
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

// Create AppContent component to use hooks inside BrowserRouter
const AppContent = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <ContextMenuHandler />
      <Routes>
        <Route path="/" element={<AllTools />} />
        <Route path="/converter" element={
          <ImageConversionProvider>
            <ConverterSection />
          </ImageConversionProvider>
        } />
        <Route path="/pdf-to-image" element={<PdfToImage />} />
        <Route path="/tools" element={<AllTools />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/contact" element={<Contact />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
