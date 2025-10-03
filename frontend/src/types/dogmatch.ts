export type DogSize = "Small" | "Medium" | "Large" | "Giant";
export type SheddingLevel = "Low" | "Moderate" | "High";
export type HealthRisk = "Low" | "Medium" | "High";
export type BreedGroup = "Herding" | "Sporting" | "Working" | "Hound" | "Terrier" | "Toy" | "Non-Sporting";

export interface UserPreferences {
  size: DogSize;
  exerciseHours: number;
  goodWithChildren: boolean;
  intelligence: number;
  trainingDifficulty: number;
  shedding: SheddingLevel;
  healthRisk: HealthRisk;
  breedGroup: BreedGroup;
  friendliness: number;
  lifeExpectancy: number;
  averageWeight: number;
}

export interface DogBreed {
  id: string;
  name: string;
  size: DogSize;
  exerciseNeeds: number;
  goodWithChildren: boolean;
  intelligence: number;
  trainingDifficulty: number;
  shedding: SheddingLevel;
  healthRisk: HealthRisk;
  breedGroup: BreedGroup;
  friendliness: number;
  lifeExpectancy: number;
  averageWeight: number;
  description: string;
  temperament: string[];
  care: string[];
  history: string;
  images: string[];
}

export interface RecommendationResult {
  breed: DogBreed;
  compatibilityScore: number;
  matchReasons: string[];
  similarBreeds: {
    breed: DogBreed;
    similarityScore: number;
  }[];
}
