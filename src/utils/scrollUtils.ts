
// Utility function to scroll to an element by ID
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Add some offset to account for fixed header
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Save scroll position to session storage
export const saveScrollPosition = () => {
  sessionStorage.setItem('scrollPosition', window.scrollY.toString());
};

// Restore scroll position from session storage
export const restoreScrollPosition = () => {
  const scrollPosition = sessionStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition, 10));
    sessionStorage.removeItem('scrollPosition'); // Clear after use
  }
};
