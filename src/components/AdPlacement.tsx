
import React from 'react';

interface AdPlacementProps {
  format?: 'horizontal' | 'rectangle' | 'vertical';
  contentLoaded?: boolean;
  className?: string;
}

/**
 * Empty placeholder component that replaced the previous AdPlacement component
 * This component doesn't display any ads, it's just a placeholder to avoid import errors
 */
const AdPlacement: React.FC<AdPlacementProps> = ({ className }) => {
  // This component is intentionally empty
  return <div className={className}></div>;
};

export default AdPlacement;
