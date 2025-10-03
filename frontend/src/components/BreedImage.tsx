import { useState, useEffect } from 'react';

interface BreedImageProps {
  images: string[];
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function BreedImage({ 
  images, 
  alt, 
  className = '', 
  fallbackSrc = 'https://images.dog.ceo/breeds/mixed/1.jpg' 
}: BreedImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError(false);
    setIsLoading(true);
  }, [images]);

  const handleImageError = () => {
    if (currentImageIndex < images.length - 1) {
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

  const currentImage = imageError ? fallbackSrc : images[currentImageIndex];

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Carregando...</div>
        </div>
      )}
      
      <img
        src={currentImage}
        alt={alt}
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
