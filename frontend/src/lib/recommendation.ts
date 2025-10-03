import { UserPreferences, DogBreed, RecommendationResult } from "@/types/dogmatch";
import { mockBreeds } from "./mockData";

// Calcula score de compatibilidade baseado nas preferências
export function calculateCompatibility(
  preferences: UserPreferences,
  breed: DogBreed
): number {
  let score = 100;
  
  // Tamanho (peso 15%)
  if (preferences.size !== breed.size) {
    score -= 15;
  }
  
  // Exercício (peso 20%)
  const exerciseDiff = Math.abs(preferences.exerciseHours - breed.exerciseNeeds);
  score -= exerciseDiff * 5;
  
  // Bom com crianças (peso 25%)
  if (preferences.goodWithChildren && !breed.goodWithChildren) {
    score -= 25;
  }
  
  // Inteligência (peso 10%)
  const intelligenceDiff = Math.abs(preferences.intelligence - breed.intelligence);
  score -= intelligenceDiff * 1;
  
  // Dificuldade de treino (peso 10%)
  const trainingDiff = Math.abs(preferences.trainingDifficulty - breed.trainingDifficulty);
  score -= trainingDiff * 1;
  
  // Queda de pelo (peso 8%)
  if (preferences.shedding !== breed.shedding) {
    score -= 8;
  }
  
  // Risco de saúde (peso 7%)
  if (preferences.healthRisk !== breed.healthRisk) {
    score -= 7;
  }
  
  // Grupo de raça (peso 5%)
  if (preferences.breedGroup !== breed.breedGroup) {
    score -= 5;
  }
  
  return Math.max(0, Math.min(100, score));
}

// Calcula similaridade entre duas raças
function calculateSimilarity(breed1: DogBreed, breed2: DogBreed): number {
  let similarity = 100;
  
  if (breed1.size !== breed2.size) similarity -= 15;
  similarity -= Math.abs(breed1.exerciseNeeds - breed2.exerciseNeeds) * 5;
  if (breed1.goodWithChildren !== breed2.goodWithChildren) similarity -= 10;
  similarity -= Math.abs(breed1.intelligence - breed2.intelligence) * 2;
  if (breed1.shedding !== breed2.shedding) similarity -= 10;
  if (breed1.breedGroup !== breed2.breedGroup) similarity -= 10;
  
  return Math.max(0, Math.min(100, similarity));
}

// Gera razões de compatibilidade
function generateMatchReasons(
  preferences: UserPreferences,
  breed: DogBreed
): string[] {
  const reasons: string[] = [];
  
  if (preferences.size === breed.size) {
    reasons.push(`Tamanho ${breed.size.toLowerCase()} ideal para você`);
  }
  
  if (Math.abs(preferences.exerciseHours - breed.exerciseNeeds) <= 0.5) {
    reasons.push("Necessidades de exercício compatíveis");
  }
  
  if (preferences.goodWithChildren && breed.goodWithChildren) {
    reasons.push("Excelente com crianças");
  }
  
  if (breed.intelligence >= 8) {
    reasons.push("Alta inteligência e facilidade de treino");
  }
  
  if (breed.shedding === "Low") {
    reasons.push("Pouca queda de pelo");
  }
  
  if (breed.friendliness >= 9) {
    reasons.push("Extremamente amigável e sociável");
  }
  
  return reasons.slice(0, 4);
}

export function getRecommendation(
  preferences: UserPreferences
): RecommendationResult {
  // Calcula scores para todas as raças
  const breedsWithScores = mockBreeds.map(breed => ({
    breed,
    score: calculateCompatibility(preferences, breed)
  }));
  
  // Ordena por score
  breedsWithScores.sort((a, b) => b.score - a.score);
  
  // Melhor match
  const bestMatch = breedsWithScores[0];
  
  // Encontra raças similares
  const similarBreeds = mockBreeds
    .filter(b => b.id !== bestMatch.breed.id)
    .map(breed => ({
      breed,
      similarityScore: calculateSimilarity(bestMatch.breed, breed)
    }))
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 5);
  
  return {
    breed: bestMatch.breed,
    compatibilityScore: Math.round(bestMatch.score),
    matchReasons: generateMatchReasons(preferences, bestMatch.breed),
    similarBreeds
  };
}
