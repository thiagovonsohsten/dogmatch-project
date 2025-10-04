import React, { useState, useEffect } from 'react';
import { getBreedImage, getBreedImages } from '../lib/breedImages';
import { getBreedNamePT } from '../lib/breedNames';

interface BreedImageProps {
  images?: string[];
  alt: string;
  className?: string;
  fallbackSrc?: string;
  breedName?: string; // Nome da raça para usar imagem local
}

export default function BreedImage({ 
  images, 
  alt, 
  className = '', 
  fallbackSrc = '/dog_breeds_img/beagle.jpg',
  breedName
}: BreedImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determinar quais imagens usar
  const imageList = React.useMemo(() => {
    if (breedName) {
      // Usar imagem local da raça
      return getBreedImages(breedName);
    } else if (images && images.length > 0) {
      // Usar imagens fornecidas
      return images;
    } else {
      // Fallback
      return [fallbackSrc];
    }
  }, [breedName, images, fallbackSrc]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError(false);
    setIsLoading(true);
  }, [imageList]);

  const handleImageError = () => {
    if (currentImageIndex < imageList.length - 1) {
      // Tentar próxima imagem
      setCurrentImageIndex(prev => prev + 1);
    } else {
      // Todas as imagens falharam
      setImageError(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const currentImage = imageError ? fallbackSrc : imageList[currentImageIndex];

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Carregando...</div>
        </div>
      )}
      
      <img
        src={currentImage}
        alt={breedName ? getBreedNamePT(breedName) : alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      
      {imageError && (
        <div className="absolute inset-0 bg-muted rounded-2xl flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-4xl mb-2">🐕</div>
            <div className="text-sm">Imagem não disponível</div>
          </div>
        </div>
      )}
    </div>
  );
}
