/**
 * Mapeamento de raças para imagens locais
 * Baseado nas imagens disponíveis em public/dog_breeds_img/
 */

export const breedImageMap: Record<string, string> = {
  // Mapeamento direto por nome da raça
  'Beagle': '/dog_breeds_img/beagle.jpg',
  'Border Collie': '/dog_breeds_img/border collie.jpg',
  'Bull Terrier': '/dog_breeds_img/bull terrier.jpg',
  'Chihuahua': '/dog_breeds_img/chihuahua.jpg',
  'Chow Chow': '/dog_breeds_img/chow chow.jpg',
  'Cocker Spaniel': '/dog_breeds_img/cocker spaniel.jpg',
  'Golden Retriever': '/dog_breeds_img/golden.jpg',
  'Siberian Husky': '/dog_breeds_img/husky.jpg',
  'Labrador Retriever': '/dog_breeds_img/labrador.jpg',
  'Lhasa Apso': '/dog_breeds_img/lhasa apso.jpeg',
  'Maltese': '/dog_breeds_img/maltese.jpg',
  'German Shepherd': '/dog_breeds_img/german Shepherd.jpg',
  'Miniature Pinscher': '/dog_breeds_img/pinscher.jpg',
  'Poodle (Standard)': '/dog_breeds_img/poodle.jpg',
  'Pug': '/dog_breeds_img/pug.jpg',
  'Rottweiler': '/dog_breeds_img/rotweiller.jpg',
  'Samoyed': '/dog_breeds_img/samoyed.jpg',
  'Saint Bernard': '/dog_breeds_img/saint bernard.jpg',
  'Standard Schnauzer': '/dog_breeds_img/schnauzer.jpg',
  'Shih Tzu': '/dog_breeds_img/shih tzu.jpeg',
  'Dachshund': '/dog_breeds_img/dachshund.jpg',
  'West Highland White Terrier': '/dog_breeds_img/west highland white terrier.jpg',
  'Yorkshire Terrier': '/dog_breeds_img/yorkshire.jpg',
  'English Bulldog': '/dog_breeds_img/english bulldog.jpg',
  'French Bulldog': '/dog_breeds_img/french bulldog.jpg',
};

/**
 * Função para obter a imagem de uma raça específica
 * @param breedName - Nome da raça
 * @returns URL da imagem local ou fallback
 */
export function getBreedImage(breedName: string): string {
  // Tentar mapeamento direto
  if (breedImageMap[breedName]) {
    return breedImageMap[breedName];
  }

  // Tentar variações do nome
  const variations = [
    breedName.toLowerCase(),
    breedName.replace(/\s+/g, ' ').trim(),
    breedName.replace(/[()]/g, '').trim(),
  ];

  for (const variation of variations) {
    const found = Object.keys(breedImageMap).find(key => 
      key.toLowerCase() === variation.toLowerCase()
    );
    if (found) {
      return breedImageMap[found];
    }
  }

  // Fallback para imagem genérica
  return '/dog_breeds_img/beagle.jpg'; // Usar beagle como fallback
}

/**
 * Função para obter múltiplas imagens de uma raça (para compatibilidade)
 * @param breedName - Nome da raça
 * @returns Array com a imagem local
 */
export function getBreedImages(breedName: string): string[] {
  const image = getBreedImage(breedName);
  return [image];
}

/**
 * Lista de todas as raças com imagens disponíveis
 */
export const availableBreeds = Object.keys(breedImageMap);

/**
 * Verifica se uma raça tem imagem disponível
 * @param breedName - Nome da raça
 * @returns true se tem imagem, false caso contrário
 */
export function hasBreedImage(breedName: string): boolean {
  return getBreedImage(breedName) !== '/dog_breeds_img/beagle.jpg' || 
         breedName.toLowerCase() === 'beagle';
}
