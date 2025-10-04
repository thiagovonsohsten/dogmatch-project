/**
 * DogMatch API Service
 * Conecta o frontend com o backend Flask
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

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
    similarity: number;  // Campo correto da API
  }>;
  user_profile: {
    [key: string]: any;
  };
}

export interface ApiBreed {
  name: string;
  size: string;
  exercise_needs: number;
  good_with_children: boolean;
  intelligence: number;
  training_difficulty: number;
  shedding: string;
  health_risk: string;
  breed_group: string;
  friendliness: number;
  life_expectancy: number;
  average_weight: number;
  description?: string;
  temperament?: string[];
  care?: string[];
  history?: string;
  images?: string[];
}

export interface ApiHealthResponse {
  message: string;
  model_loaded: boolean;
  status: string;
}

export interface ApiModelInfoResponse {
  model_type: string;
  features: string[];
  total_breeds: number;
  system_type: string;
  accuracy: string;
}

class DogMatchAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    if (options.body) {
      console.log('📤 Request Body:', options.body);
    }
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    console.log(`📥 API Response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API Data:', data);
    return data;
  }

  /**
   * Verifica se a API está funcionando
   */
  async healthCheck(): Promise<ApiHealthResponse> {
    return this.request<ApiHealthResponse>('/api/health');
  }

  /**
   * Obtém informações do modelo ML
   */
  async getModelInfo(): Promise<ApiModelInfoResponse> {
    return this.request<ApiModelInfoResponse>('/api/model-info');
  }

  /**
   * Obtém lista de todas as raças
   */
  async getBreeds(): Promise<ApiBreed[]> {
    const response = await this.request<{api_version: string, breeds: string[]}>('/api/breeds');
    
    // Converter array de strings para array de objetos com dados realistas
    const breeds: ApiBreed[] = response.breeds.map((breedName) => ({
      name: breedName,
      size: this.getBreedSize(breedName),
      exercise_needs: this.getBreedExercise(breedName),
      good_with_children: this.getBreedChildFriendly(breedName),
      intelligence: this.getBreedIntelligence(breedName),
      training_difficulty: this.getBreedTrainingDifficulty(breedName),
      shedding: this.getBreedShedding(breedName),
      health_risk: this.getBreedHealthRisk(breedName),
      breed_group: this.getBreedGroup(breedName),
      friendliness: this.getBreedFriendliness(breedName),
      life_expectancy: this.getBreedLifeExpectancy(breedName),
      average_weight: this.getBreedWeight(breedName),
      description: `O ${breedName} é uma raça com características únicas e personalidade marcante.`,
      temperament: this.getBreedTemperament(breedName),
      care: this.getBreedCare(breedName),
      history: `O ${breedName} tem uma história rica e interessante.`,
      images: this.getBreedImages(breedName)
    }));

    console.log('🐕 Breeds carregadas:', breeds.length);
    return breeds;
  }

  // Métodos para gerar dados realistas baseados no nome da raça
  private getBreedSize(breedName: string): string {
    const smallBreeds = ['Chihuahua', 'Pomeranian', 'Yorkshire', 'Maltese', 'Shih Tzu', 'Pug', 'Boston Terrier'];
    const largeBreeds = ['Great Dane', 'Mastiff', 'Saint Bernard', 'Newfoundland', 'Irish Wolfhound', 'Leonberger'];
    const giantBreeds = ['Great Dane', 'Mastiff', 'Saint Bernard'];
    
    if (smallBreeds.some(breed => breedName.includes(breed))) return 'Small';
    if (giantBreeds.some(breed => breedName.includes(breed))) return 'Giant';
    if (largeBreeds.some(breed => breedName.includes(breed))) return 'Large';
    return 'Medium';
  }

  private getBreedExercise(breedName: string): number {
    const highEnergy = ['Border Collie', 'Australian Shepherd', 'Jack Russell', 'Siberian Husky', 'Weimaraner'];
    const lowEnergy = ['Bulldog', 'Basset Hound', 'Pug', 'Shih Tzu', 'Maltese'];
    
    if (highEnergy.some(breed => breedName.includes(breed))) return 3.5;
    if (lowEnergy.some(breed => breedName.includes(breed))) return 1.0;
    return 2.0;
  }

  private getBreedChildFriendly(breedName: string): boolean {
    const childFriendly = ['Golden Retriever', 'Labrador', 'Beagle', 'Collie', 'Newfoundland', 'Saint Bernard'];
    const notChildFriendly = ['Chihuahua', 'Akita', 'Chow Chow', 'Dalmatian'];
    
    if (childFriendly.some(breed => breedName.includes(breed))) return true;
    if (notChildFriendly.some(breed => breedName.includes(breed))) return false;
    return Math.random() > 0.3;
  }

  private getBreedIntelligence(breedName: string): number {
    const smartBreeds = ['Border Collie', 'Poodle', 'German Shepherd', 'Golden Retriever', 'Doberman'];
    const averageBreeds = ['Beagle', 'Bulldog', 'Basset Hound', 'Mastiff'];
    
    if (smartBreeds.some(breed => breedName.includes(breed))) return 9;
    if (averageBreeds.some(breed => breedName.includes(breed))) return 5;
    return 7;
  }

  private getBreedTrainingDifficulty(breedName: string): number {
    const easyTrain = ['Golden Retriever', 'Labrador', 'Border Collie', 'Poodle'];
    const hardTrain = ['Afghan Hound', 'Basset Hound', 'Bulldog', 'Chow Chow'];
    
    if (easyTrain.some(breed => breedName.includes(breed))) return 2;
    if (hardTrain.some(breed => breedName.includes(breed))) return 8;
    return 5;
  }

  private getBreedShedding(breedName: string): string {
    const lowShedding = ['Poodle', 'Bichon Frise', 'Maltese', 'Shih Tzu', 'Yorkshire'];
    const highShedding = ['German Shepherd', 'Siberian Husky', 'Golden Retriever', 'Labrador'];
    
    if (lowShedding.some(breed => breedName.includes(breed))) return 'Low';
    if (highShedding.some(breed => breedName.includes(breed))) return 'High';
    return 'Moderate';
  }

  private getBreedHealthRisk(breedName: string): string {
    const highRisk = ['Bulldog', 'Pug', 'German Shepherd', 'Golden Retriever'];
    const lowRisk = ['Australian Cattle Dog', 'Border Collie', 'Siberian Husky'];
    
    if (highRisk.some(breed => breedName.includes(breed))) return 'High';
    if (lowRisk.some(breed => breedName.includes(breed))) return 'Low';
    return 'Moderate';
  }

  private getBreedGroup(breedName: string): string {
    const herding = ['Border Collie', 'Australian Shepherd', 'German Shepherd', 'Collie'];
    const sporting = ['Golden Retriever', 'Labrador', 'Pointer', 'Spaniel'];
    const working = ['Saint Bernard', 'Mastiff', 'Great Dane', 'Boxer'];
    const hound = ['Beagle', 'Basset Hound', 'Afghan Hound', 'Greyhound'];
    const terrier = ['Jack Russell', 'Yorkshire', 'Boston Terrier', 'Bull Terrier'];
    const toy = ['Chihuahua', 'Pomeranian', 'Maltese', 'Shih Tzu'];
    
    if (herding.some(breed => breedName.includes(breed))) return 'Herding';
    if (sporting.some(breed => breedName.includes(breed))) return 'Sporting';
    if (working.some(breed => breedName.includes(breed))) return 'Working';
    if (hound.some(breed => breedName.includes(breed))) return 'Hound';
    if (terrier.some(breed => breedName.includes(breed))) return 'Terrier';
    if (toy.some(breed => breedName.includes(breed))) return 'Toy';
    return 'Non-Sporting';
  }

  private getBreedFriendliness(breedName: string): number {
    const veryFriendly = ['Golden Retriever', 'Labrador', 'Beagle', 'Collie'];
    const reserved = ['Akita', 'Chow Chow', 'Shar Pei', 'Basenji'];
    
    if (veryFriendly.some(breed => breedName.includes(breed))) return 9;
    if (reserved.some(breed => breedName.includes(breed))) return 4;
    return 7;
  }

  private getBreedLifeExpectancy(breedName: string): number {
    const longLived = ['Chihuahua', 'Yorkshire', 'Maltese', 'Shih Tzu'];
    const shortLived = ['Great Dane', 'Mastiff', 'Saint Bernard', 'Irish Wolfhound'];
    
    if (longLived.some(breed => breedName.includes(breed))) return 15;
    if (shortLived.some(breed => breedName.includes(breed))) return 8;
    return 12;
  }

  private getBreedWeight(breedName: string): number {
    const smallBreeds = ['Chihuahua', 'Pomeranian', 'Yorkshire', 'Maltese'];
    const largeBreeds = ['Great Dane', 'Mastiff', 'Saint Bernard', 'Newfoundland'];
    
    if (smallBreeds.some(breed => breedName.includes(breed))) return 5;
    if (largeBreeds.some(breed => breedName.includes(breed))) return 70;
    return 25;
  }

  private getBreedTemperament(breedName: string): string[] {
    const activeBreeds = ['Border Collie', 'Australian Shepherd', 'Jack Russell'];
    const calmBreeds = ['Bulldog', 'Basset Hound', 'Saint Bernard'];
    const protectiveBreeds = ['German Shepherd', 'Rottweiler', 'Doberman'];
    
    if (activeBreeds.some(breed => breedName.includes(breed))) {
      return ['Energético', 'Inteligente', 'Ativo'];
    }
    if (calmBreeds.some(breed => breedName.includes(breed))) {
      return ['Calmo', 'Gentil', 'Paciente'];
    }
    if (protectiveBreeds.some(breed => breedName.includes(breed))) {
      return ['Protetor', 'Leal', 'Corajoso'];
    }
    return ['Amigável', 'Inteligente', 'Leal'];
  }

  private getBreedCare(breedName: string): string[] {
    const highMaintenance = ['Poodle', 'Afghan Hound', 'Yorkshire'];
    const lowMaintenance = ['Beagle', 'Bulldog', 'Basset Hound'];
    
    if (highMaintenance.some(breed => breedName.includes(breed))) {
      return ['Escovação diária', 'Banho semanal', 'Corte regular'];
    }
    if (lowMaintenance.some(breed => breedName.includes(breed))) {
      return ['Escovação semanal', 'Banho mensal', 'Cuidados básicos'];
    }
    return ['Exercício regular', 'Escovação semanal', 'Treinamento básico'];
  }

  private getBreedImages(breedName: string): string[] {
    // Usar imagens locais da pasta public/dog_breeds_img/
    const breedImageMap: { [key: string]: string } = {
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

    // Retornar imagem local se disponível, senão fallback
    if (breedImageMap[breedName]) {
      return [breedImageMap[breedName]];
    }

    // Fallback para beagle se não encontrar a raça
    return ['/dog_breeds_img/beagle.jpg'];
  }

  /**
   * Obtém informações das features
   */
  async getFeatures(): Promise<any> {
    return this.request('/api/features');
  }

  /**
   * Envia preferências e recebe recomendação
   */
  async getRecommendation(preferences: ApiUserPreferences): Promise<ApiRecommendationResponse> {
    return this.request<ApiRecommendationResponse>('/api/recommend', {
      method: 'POST',
      body: JSON.stringify(preferences),
    });
  }

  /**
   * Converte preferências do frontend para formato da API
   */
  convertPreferencesToApi(frontendPrefs: any): ApiUserPreferences {
    console.log('🔄 Convertendo preferências do frontend:', frontendPrefs);
    
    // Mapear valores do frontend para valores aceitos pela API
    const mapHealthRisk = (risk: string) => {
      switch (risk) {
        case 'Low': return 'Low';
        case 'Medium': return 'Moderate';  // Frontend usa 'Medium', API usa 'Moderate'
        case 'High': return 'High';
        default: return 'Moderate';
      }
    };

    const mapSheddingLevel = (level: string) => {
      switch (level) {
        case 'Low': return 'Low';
        case 'Moderate': return 'Moderate';
        case 'High': return 'High';
        default: return 'Moderate';
      }
    };

    const apiPrefs = {
      Size: frontendPrefs.size,
      "Exercise Requirements (hrs/day)": frontendPrefs.exerciseHours,
      "Good with Children": frontendPrefs.goodWithChildren ? "Yes" : "No",
      "Intelligence Rating (1-10)": frontendPrefs.intelligence,
      "Training Difficulty (1-10)": frontendPrefs.trainingDifficulty,
      "Shedding Level": mapSheddingLevel(frontendPrefs.shedding),
      "Health Issues Risk": mapHealthRisk(frontendPrefs.healthRisk),
      Type: frontendPrefs.breedGroup,
      "Friendly Rating (1-10)": frontendPrefs.friendliness,
      "Life Span": frontendPrefs.lifeExpectancy,
      "Average Weight (kg)": frontendPrefs.averageWeight,
    };

    console.log('✅ Preferências convertidas para API:', apiPrefs);
    return apiPrefs;
  }

  /**
   * Converte resposta da API para formato do frontend
   */
  convertApiResponseToFrontend(apiResponse: ApiRecommendationResponse, breeds: ApiBreed[]): any {
    // Pega a primeira predição (melhor match)
    const bestPrediction = apiResponse.predictions[0];
    
    if (!bestPrediction) {
      throw new Error('Nenhuma predição encontrada na resposta da API');
    }

    // Encontra a raça recomendada
    const recommendedBreed = breeds.find(b => 
      b.name.toLowerCase() === bestPrediction.breed.toLowerCase()
    );

    if (!recommendedBreed) {
      throw new Error(`Raça recomendada não encontrada: ${bestPrediction.breed}`);
    }

    // Encontra raças similares (excluindo a raça principal)
    const similarBreeds = apiResponse.similar_breeds
      .filter(similar => 
        similar.breed.toLowerCase() !== bestPrediction.breed.toLowerCase()
      )
      .map(similar => {
        const breed = breeds.find(b => 
          b.name.toLowerCase() === similar.breed.toLowerCase()
        );
        return {
          breed: breed || { name: similar.breed } as ApiBreed,
          similarityScore: Math.round(similar.similarity * 100)  // Usar campo 'similarity' em vez de 'score'
        };
      });

    // Gera razões de match baseadas no perfil do usuário
    const matchReasons = this.generateMatchReasons(apiResponse.user_profile, recommendedBreed);

    // Calcular score realista baseado no score de similaridade
    const realisticScore = this.calculateRealisticScore(apiResponse, recommendedBreed);

    return {
      breed: {
        id: recommendedBreed.name.toLowerCase().replace(/\s+/g, '-'),
        name: recommendedBreed.name,
        size: recommendedBreed.size,
        exerciseNeeds: recommendedBreed.exercise_needs,
        goodWithChildren: recommendedBreed.good_with_children,
        intelligence: recommendedBreed.intelligence,
        trainingDifficulty: recommendedBreed.training_difficulty,
        shedding: recommendedBreed.shedding,
        healthRisk: recommendedBreed.health_risk,
        breedGroup: recommendedBreed.breed_group,
        friendliness: recommendedBreed.friendliness,
        lifeExpectancy: recommendedBreed.life_expectancy,
        averageWeight: recommendedBreed.average_weight,
        description: recommendedBreed.description || `O ${recommendedBreed.name} é uma raça ${recommendedBreed.size.toLowerCase()} com excelentes características.`,
        temperament: recommendedBreed.temperament || ['Amigável', 'Inteligente', 'Leal'],
        care: recommendedBreed.care || ['Exercício regular', 'Escovação semanal', 'Treinamento básico'],
        history: recommendedBreed.history || `História do ${recommendedBreed.name}.`,
        images: recommendedBreed.images || this.getBreedImages(recommendedBreed.name)
      },
      compatibilityScore: realisticScore,
      matchReasons,
      similarBreeds
    };
  }

  /**
   * Calcula um score realista baseado no score de similaridade
   */
  private calculateRealisticScore(apiResponse: ApiRecommendationResponse, breed: ApiBreed): number {
    // Pega o score de similaridade da primeira raça similar (que é a mesma da predição)
    const firstSimilar = apiResponse.similar_breeds[0];
    
    if (firstSimilar && firstSimilar.breed.toLowerCase() === breed.name.toLowerCase()) {
      // Usa o score de similaridade como base, mas ajusta para ser mais realista
      const baseScore = firstSimilar.similarity;
      
      // Ajusta o score para ser mais realista (entre 60% e 95%)
      const adjustedScore = Math.max(0.6, Math.min(0.95, baseScore + 0.2));
      
      return Math.round(adjustedScore * 100);
    }
    
    // Fallback: usa o score da predição, mas ajusta para ser mais realista
    const predictionScore = apiResponse.predictions[0]?.score || 1.0;
    const realisticScore = Math.max(0.6, Math.min(0.95, predictionScore * 0.8));
    
    return Math.round(realisticScore * 100);
  }

  /**
   * Gera razões de compatibilidade baseadas no perfil do usuário
   */
  private generateMatchReasons(userProfile: any, breed: ApiBreed): string[] {
    const reasons: string[] = [];

    // Analisa compatibilidade baseada no perfil
    if (userProfile.size_preference === breed.size) {
      reasons.push(`Tamanho ${breed.size.toLowerCase()} ideal para você`);
    }

    if (breed.good_with_children) {
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

    if (breed.exercise_needs <= 2) {
      reasons.push("Necessidades de exercício moderadas");
    }

    return reasons.slice(0, 4);
  }
}

// Instância singleton da API
export const dogMatchAPI = new DogMatchAPI();

// Hook personalizado para usar a API
export const useDogMatchAPI = () => {
  return dogMatchAPI;
};
