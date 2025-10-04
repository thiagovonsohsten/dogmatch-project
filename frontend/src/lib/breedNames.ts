/**
 * Mapeamento de nomes de raças de inglês para português
 */

export const breedNamesPT: Record<string, string> = {
  // Raças do dataset filtrado
  'Beagle': 'Beagle',
  'Border Collie': 'Border Collie',
  'Bull Terrier': 'Bull Terrier',
  'Chihuahua': 'Chihuahua',
  'Chow Chow': 'Chow Chow',
  'Cocker Spaniel': 'Cocker Spaniel',
  'Golden Retriever': 'Golden Retriever',
  'Siberian Husky': 'Husky Siberiano',
  'Labrador Retriever': 'Labrador Retriever',
  'Lhasa Apso': 'Lhasa Apso',
  'Maltese': 'Maltês',
  'German Shepherd': 'Pastor Alemão',
  'Miniature Pinscher': 'Pinscher Miniatura',
  'Poodle (Standard)': 'Poodle',
  'Pug': 'Pug',
  'Rottweiler': 'Rottweiler',
  'Samoyed': 'Samoieda',
  'Saint Bernard': 'São Bernardo',
  'Standard Schnauzer': 'Schnauzer',
  'Shih Tzu': 'Shih Tzu',
  'Dachshund': 'Teckel',
  'West Highland White Terrier': 'West Highland White Terrier',
  'Yorkshire Terrier': 'Yorkshire Terrier',
  'English Bulldog': 'Bulldog Inglês',
  'French Bulldog': 'Bulldog Francês',
};

/**
 * Função para obter o nome da raça em português
 * @param breedName - Nome da raça em inglês
 * @returns Nome da raça em português
 */
export function getBreedNamePT(breedName: string): string {
  return breedNamesPT[breedName] || breedName;
}

/**
 * Função para obter o nome da raça em inglês a partir do português
 * @param breedNamePT - Nome da raça em português
 * @returns Nome da raça em inglês
 */
export function getBreedNameEN(breedNamePT: string): string {
  const entry = Object.entries(breedNamesPT).find(([_, pt]) => pt === breedNamePT);
  return entry ? entry[0] : breedNamePT;
}

/**
 * Lista de todas as raças em português
 */
export const allBreedsPT = Object.values(breedNamesPT);

/**
 * Lista de todas as raças em inglês
 */
export const allBreedsEN = Object.keys(breedNamesPT);
