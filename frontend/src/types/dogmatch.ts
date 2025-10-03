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

// Tipos para integração com API
export interface ApiUserPreferences {
  Size: string;
  "Exercise Requirements (hrs/day)": number;
  "Good with Children": string;
  "Intelligence Rating (1-10)": number;
  "Training Difficulty (1-10)": number;
  "Shedding Level": string;
  "Health Issues Risk": string;
  Type: string;
  "Friendly Rating (1-10)": number;
  "Life Span": number;
  "Average Weight (kg)": number;
}

export interface ApiRecommendationResponse {
  api_version: string;
  predictions: Array<{
    breed: string;
    score: number;
  }>;
  similar_breeds: Array<{
    breed: string;
    rank: number;
    score: number;
  }>;
  user_profile: {
    [key: string]: any;
  };
}