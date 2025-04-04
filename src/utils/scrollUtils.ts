
/**
 * Handles smooth scrolling to elements with an offset to account for fixed headers
 */
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Add offset of 80px to account for headers
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
