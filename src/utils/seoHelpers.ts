
/**
 * SEO Helpers for MyToolbox
 * Collection of utilities to help with SEO optimization
 */

/**
 * Generates a comprehensive JSON-LD schema for software applications
 * @param params Parameters for the schema
 * @returns JSON-LD schema string
 */
export const generateAppSchema = (params: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  features: string[];
  screenshot: string;
  rating: number;
  ratingCount: number;
  reviewCount: number;
}) => {
  return `
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "${params.name}",
      "applicationCategory": "${params.applicationCategory}",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "${params.description}",
      "url": "${params.url}",
      "featureList": ${JSON.stringify(params.features)},
      "screenshot": "${params.screenshot}",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "${params.rating}",
        "ratingCount": "${params.ratingCount}",
        "reviewCount": "${params.reviewCount}"
      }
    }
  `;
};

/**
 * Generates optimized meta descriptions based on tool type
 * @param toolType Type of tool
 * @param customText Custom text to include
 * @returns Optimized meta description
 */
export const getOptimizedDescription = (toolType: string, customText?: string): string => {
  const baseDescriptions: Record<string, string> = {
    'pdf': 'Process PDF documents easily with our free online tool. No registration required, works directly in your browser with no watermarks.',
    'image': 'Transform and edit images with our free online tool. High-quality processing with no watermarks or registration required.',
    'audio': 'Process audio files with ease using our free online tool. No software installation needed, works directly in your browser.',
    'video': 'Edit video files online for free. No software installation, no watermarks, high-quality output guaranteed.',
    'file': 'Manage and process files efficiently with our free online tool. No registration or software installation required.',
    'text': 'Process text content with our powerful free online tool. Save time with advanced features designed for productivity.',
    'conversion': 'Convert between file formats easily with our free online tool. High-quality conversion with no watermarks or registration needed.',
    'utility': 'Solve everyday digital tasks with our free online utility tool. Designed for simplicity and efficiency.'
  };
  
  const defaultDescription = 'Use our free online tool to complete your task easily. No registration or software installation required.';
  const baseText = baseDescriptions[toolType.toLowerCase()] || defaultDescription;
  
  if (customText) {
    return `${customText} ${baseText}`;
  }
  
  return baseText;
};

/**
 * Generates optimized keyword lists for different tool types
 * @param toolType Type of tool
 * @param customKeywords Additional custom keywords
 * @returns Comma-separated keyword string
 */
export const getKeywords = (toolType: string, customKeywords: string[] = []): string => {
  const baseKeywords: Record<string, string[]> = {
    'pdf': ['pdf tool', 'pdf converter', 'online pdf', 'free pdf tool', 'pdf editor', 'pdf processing'],
    'image': ['image editor', 'photo tool', 'image converter', 'picture editor', 'free image tool'],
    'audio': ['audio tool', 'sound editor', 'mp3 converter', 'free audio tool', 'online audio editor'],
    'video': ['video editor', 'free video tool', 'online video', 'video converter', 'video processing'],
    'file': ['file tool', 'file converter', 'file processor', 'online file tool', 'free file editor'],
    'text': ['text tool', 'text editor', 'online text editor', 'free text tool', 'text processor'],
    'conversion': ['file converter', 'online converter', 'free converter', 'format conversion', 'file transformation'],
    'utility': ['online utility', 'web tool', 'free utility', 'productivity tool', 'browser tool']
  };
  
  const defaultKeywords = ['online tool', 'free tool', 'web utility', 'no registration', 'browser-based'];
  const allKeywords = [...(baseKeywords[toolType.toLowerCase()] || []), ...defaultKeywords, ...customKeywords];
  
  // Remove duplicates
  return [...new Set(allKeywords)].join(', ');
};

/**
 * Creates a breadcrumb schema for SEO
 * @param items Breadcrumb items (name and URL)
 * @returns JSON-LD breadcrumb schema
 */
export const createBreadcrumbSchema = (items: {name: string, url: string}[]): string => {
  const itemsList = items.map((item, index) => {
    return {
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    };
  });
  
  return `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": ${JSON.stringify(itemsList)}
    }
  `;
};
