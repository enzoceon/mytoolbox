
import { useCallback } from 'react';
import { toast } from "sonner";

interface UseImageValidationProps {
  onImageSelect: (files: File[]) => void;
  acceptedFileTypes: string;
  restrictionMessage: string;
}

export const useImageValidation = ({
  onImageSelect,
  acceptedFileTypes,
  restrictionMessage
}: UseImageValidationProps) => {
  
  const validateAndProcessFiles = useCallback((files: File[]) => {
    // Check if we have specific file type restrictions
    if (acceptedFileTypes !== "image/*") {
      const acceptedTypes = acceptedFileTypes.split(',');
      const validFiles = Array.from(files).filter(file => 
        acceptedTypes.some(type => file.type === type)
      );
      
      if (validFiles.length === 0) {
        toast.error(restrictionMessage);
        return;
      }
      
      if (files.length !== validFiles.length) {
        toast.warning(`${files.length - validFiles.length} files were ignored due to invalid format`);
      }
      
      onImageSelect(validFiles);
      return;
    }
    
    // Default image file validation
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error(restrictionMessage);
      return;
    }
    
    if (files.length !== imageFiles.length) {
      toast.warning(`${files.length - imageFiles.length} non-image files were ignored`);
    }
    
    onImageSelect(imageFiles);
  }, [onImageSelect, acceptedFileTypes, restrictionMessage]);

  return { validateAndProcessFiles };
};
