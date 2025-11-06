"""
DogMatch Predictor - Classe para integração no backend

Este arquivo contém a classe DogMatchPredictor que pode ser usada
no backend (Flask/FastAPI) para fazer predições de raças de cães.
Sistema híbrido otimizado com feature engineering e busca por similaridade.
"""

import joblib
import pandas as pd
import numpy as np
import os
from typing import Dict, List, Any


class DogMatchPredictor:
    """
    Classe para predição de raças de cães baseado nas preferências do usuário.
    
    Sistema híbrido otimizado que combina:
    - Modelo principal (KNN_Advanced)
    - Modelo de similaridade (NearestNeighbors)
    - Feature engineering avançado
    - RobustScaler para normalização
    """
    
    def __init__(self):
        """
        Inicializa o preditor carregando todos os modelos e preprocessadores.
        """
        try:
            # Obter caminho absoluto do diretório atual
            current_dir = os.path.dirname(os.path.abspath(__file__))
            models_dir = os.path.join(current_dir, 'models')
            
            # Carregar modelos híbridos otimizados (dataset filtrado)
            self.model = joblib.load(os.path.join(models_dir, 'dogmatch_optimized_model.pkl'))
            self.similarity_model = joblib.load(os.path.join(models_dir, 'dogmatch_similarity_model.pkl'))
            self.robust_scaler = joblib.load(os.path.join(models_dir, 'robust_scaler.pkl'))
            self.label_encoders = joblib.load(os.path.join(models_dir, 'label_encoders.pkl'))
            self.feature_info = joblib.load(os.path.join(models_dir, 'feature_info_optimized.pkl'))
            
            # Carregar dados processados para similaridade (dataset filtrado)
            self.X_enhanced = joblib.load(os.path.join(models_dir, 'X_enhanced.pkl'))
            self.y_processed = joblib.load(os.path.join(models_dir, 'y_processed.pkl'))
            
            # Extrair informações das features
            self.feature_columns = self.feature_info['feature_columns']
            self.categorical_columns = self.feature_info['categorical_columns']
            self.numeric_columns = self.feature_info['numeric_columns']
            self.breed_names = self.feature_info['breed_names']
            
            print("✅ DogMatch Predictor (Sistema Híbrido Otimizado) inicializado com sucesso!")
            print(f"📊 Modelo: {type(self.model).__name__}")
            print(f"🔍 Similaridade: {type(self.similarity_model).__name__}")
            print(f"🏷️ Features: {len(self.feature_columns)}")
            print(f"🐕 Raças: {len(self.breed_names)}")
            
        except FileNotFoundError as e:
            raise FileNotFoundError(f"Arquivo não encontrado: {e}. Certifique-se de que todos os arquivos .pkl estão no diretório correto.")
        except Exception as e:
            raise Exception(f"Erro ao inicializar o preditor: {e}")
    
    def predict(self, user_input: Dict[str, Any], top_k: int = 5) -> Dict[str, Any]:
        """
        Prediz raças de cães baseado nas preferências do usuário.
        Sistema híbrido que combina predição principal + similaridade.
        
        Args:
            user_input: Dicionário com as preferências do usuário
            top_k: Número de raças similares a retornar (padrão: 5)
        
        Returns:
            Dicionário com predições, raças similares e perfil do usuário
            
        Example:
            user_preferences = {
                'Size': 'Medium',
                'Exercise Requirements (hrs/day)': 2.0,
                'Good with Children': 'Yes',
                'Intelligence Rating (1-10)': 7,
                'Training Difficulty (1-10)': 3,
                'Shedding Level': 'Moderate',
                'Health Issues Risk': 'Low',
                'Type': 'Herding',
                'Friendly Rating (1-10)': 8,
                'Life Span': 12,
                'Average Weight (kg)': 20
            }
            
            predictor = DogMatchPredictor()
            results = predictor.predict(user_preferences)
        """
        try:
            # Validar entrada
            self._validate_input(user_input)
            
            # Criar DataFrame com a entrada do usuário
            user_df = pd.DataFrame([user_input])
            
            # Aplicar label encoding para variáveis categóricas
            for col in self.categorical_columns:
                if col in user_df.columns:
                    if user_input[col] not in self.label_encoders[col].classes_:
                        raise ValueError(f"Valor inválido para '{col}': {user_input[col]}. "
                                       f"Valores aceitos: {list(self.label_encoders[col].classes_)}")
                    user_df[col] = self.label_encoders[col].transform(user_df[col])
            
            # Criar features derivadas (feature engineering)
            user_df = self._create_derived_features(user_df)
            
            # Aplicar robust scaling para variáveis numéricas
            user_df[self.numeric_columns] = self.robust_scaler.transform(user_df[self.numeric_columns])
            
            # Fazer predição principal
            prediction = self.model.predict(user_df)[0]
            
            # Encontrar raças similares
            similar_breeds = self._find_similar_breeds(user_df, top_k)
            
            # Calcular perfil do usuário
            user_profile = self._calculate_user_profile(user_df)
            
            # Preparar resultados
            results = {
                'predictions': [{'breed': prediction, 'score': 1.0}],
                'similar_breeds': similar_breeds,
                'user_profile': user_profile
            }
            
            return results
            
        except Exception as e:
            raise Exception(f"Erro ao fazer predição: {e}")
    
    def _create_derived_features(self, user_df: pd.DataFrame) -> pd.DataFrame:
        """
        Cria features derivadas usando feature engineering avançado.
        """
        try:
            # Family_Compatibility_Score
            if 'Good with Children' in user_df.columns and 'Friendly Rating (1-10)' in user_df.columns and 'Training Difficulty (1-10)' in user_df.columns:
                children_score = user_df['Good with Children'].map({0: 0, 1: 1, 2: 0.5})  # No=0, Yes=1, With Training=0.5
                user_df['Family_Compatibility_Score'] = (
                    children_score * 0.4 + 
                    user_df['Friendly Rating (1-10)'] * 0.1 + 
                    (10 - user_df['Training Difficulty (1-10)']) * 0.1
                )
            
            # Maintenance_Score
            if 'Shedding Level' in user_df.columns and 'Exercise Requirements (hrs/day)' in user_df.columns and 'Health Issues Risk' in user_df.columns:
                shedding_score = user_df['Shedding Level'].map({0: 0, 1: 0.5, 2: 1, 3: 1.5})  # Low=0, Moderate=0.5, High=1, Very High=1.5
                health_score = user_df['Health Issues Risk'].map({0: 0, 1: 0.5, 2: 1})  # Low=0, Moderate=0.5, High=1
                user_df['Maintenance_Score'] = (
                    shedding_score * 0.3 + 
                    user_df['Exercise Requirements (hrs/day)'] * 0.2 + 
                    health_score * 0.3
                )
            
            # Energy_Score
            if 'Exercise Requirements (hrs/day)' in user_df.columns and 'Intelligence Rating (1-10)' in user_df.columns:
                user_df['Energy_Score'] = (
                    user_df['Exercise Requirements (hrs/day)'] * 0.4 + 
                    user_df['Intelligence Rating (1-10)'] * 0.1
                )
            
            # Intelligence_Training_Ratio
            if 'Intelligence Rating (1-10)' in user_df.columns and 'Training Difficulty (1-10)' in user_df.columns:
                user_df['Intelligence_Training_Ratio'] = (
                    user_df['Intelligence Rating (1-10)'] / (user_df['Training Difficulty (1-10)'] + 1)
                )
            
            # Size_Score
            if 'Size' in user_df.columns:
                user_df['Size_Score'] = user_df['Size'].map({0: 1, 1: 2, 2: 3, 3: 4})  # Small=1, Medium=2, Large=3, Giant=4
            
            return user_df
            
        except Exception as e:
            print(f"⚠️ Aviso: Erro ao criar features derivadas: {e}")
            return user_df
    
    def _find_similar_breeds(self, user_df: pd.DataFrame, top_k: int = 5) -> List[Dict[str, Any]]:
        """
        Encontra raças similares usando o modelo de similaridade.
        """
        try:
            # Encontrar raças mais similares
            distances, indices = self.similarity_model.kneighbors(user_df, n_neighbors=min(top_k, len(self.X_enhanced)))
            
            similar_breeds = []
            for i, (dist, idx) in enumerate(zip(distances[0], indices[0])):
                if i < top_k:
                    breed_name = self.y_processed.iloc[idx]
                    similarity = 1 - dist  # Converter distância em similaridade
                    similar_breeds.append({
                        'breed': breed_name,
                        'similarity': round(similarity, 3),
                        'rank': i + 1
                    })
            
            return similar_breeds
            
        except Exception as e:
            print(f"⚠️ Aviso: Erro ao encontrar raças similares: {e}")
            return []
    
    def _calculate_user_profile(self, user_df: pd.DataFrame) -> Dict[str, float]:
        """
        Calcula o perfil do usuário baseado nas características.
        """
        try:
            profile = {}
            
            # Family Friendly Score
            if 'Family_Compatibility_Score' in user_df.columns:
                profile['family_friendly'] = round(user_df['Family_Compatibility_Score'].iloc[0], 2)
            
            # Energy Level
            if 'Energy_Score' in user_df.columns:
                profile['energy_level'] = round(user_df['Energy_Score'].iloc[0], 2)
            
            # Maintenance Level
            if 'Maintenance_Score' in user_df.columns:
                profile['maintenance_level'] = round(user_df['Maintenance_Score'].iloc[0], 2)
            
            # Intelligence Level
            if 'Intelligence Rating (1-10)' in user_df.columns:
                profile['intelligence_level'] = round(user_df['Intelligence Rating (1-10)'].iloc[0], 1)
            
            # Size Preference
            if 'Size_Score' in user_df.columns:
                profile['size_preference'] = round(user_df['Size_Score'].iloc[0], 1)
            
            return profile
            
        except Exception as e:
            print(f"⚠️ Aviso: Erro ao calcular perfil do usuário: {e}")
            return {}
    
    def _validate_input(self, user_input: Dict[str, Any]) -> None:
        """
        Valida a entrada do usuário.
        
        Args:
            user_input: Dicionário com as preferências do usuário
            
        Raises:
            ValueError: Se a entrada for inválida
        """
        # Verificar se todas as features necessárias estão presentes
        missing_features = set(self.feature_columns) - set(user_input.keys())
        if missing_features:
            raise ValueError(f"Features ausentes: {missing_features}")
        
        # Verificar tipos de dados para variáveis numéricas
        for col in self.numeric_columns:
            if col in user_input:
                try:
                    float(user_input[col])
                except (ValueError, TypeError):
                    raise ValueError(f"'{col}' deve ser um número. Recebido: {user_input[col]}")
    
    def get_feature_info(self) -> Dict[str, Any]:
        """
        Retorna informações sobre as features do modelo.
        
        Returns:
            Dicionário com informações das features
        """
        return {
            'feature_columns': self.feature_columns,
            'categorical_columns': self.categorical_columns,
            'numeric_columns': self.numeric_columns,
            'categorical_values': {
                col: list(encoder.classes_) 
                for col, encoder in self.label_encoders.items()
            },
            'breed_names': self.breed_names
        }
    
    def get_model_info(self) -> Dict[str, Any]:
        """
        Retorna informações sobre o modelo.
        
        Returns:
            Dicionário com informações do modelo
        """
        return {
            'model_type': type(self.model).__name__,
            'similarity_model_type': type(self.similarity_model).__name__,
            'n_features': len(self.feature_columns),
            'n_breeds': len(self.breed_names),
            'supports_probabilities': hasattr(self.model, 'predict_proba'),
            'feature_engineering': True,
            'hybrid_system': True
        }


# Exemplo de uso
if __name__ == "__main__":
    # Exemplo de preferências do usuário
    user_preferences = {
        'Size': 'Medium',
        'Exercise Requirements (hrs/day)': 2.0,
        'Good with Children': 'Yes',
        'Intelligence Rating (1-10)': 7,
        'Training Difficulty (1-10)': 3,
        'Shedding Level': 'Moderate',
        'Health Issues Risk': 'Low',
        'Type': 'Herding',
        'Friendly Rating (1-10)': 8,
        'Life Span': 12,
        'Average Weight (kg)': 20
    }
    
    try:
        # Inicializar preditor
        predictor = DogMatchPredictor()
        
        # Fazer predição
        results = predictor.predict(user_preferences)
        
        # Mostrar resultados
        print("🐕 RECOMENDAÇÕES DE RAÇAS (SISTEMA HÍBRIDO):")
        print("=" * 50)
        
        print("\n🎯 PREDIÇÃO PRINCIPAL:")
        for pred in results['predictions']:
            print(f"• {pred['breed']} - Score: {pred['score']}")
        
        print("\n🔍 RAÇAS SIMILARES:")
        for similar in results['similar_breeds']:
            print(f"• {similar['breed']} - Similaridade: {similar['similarity']:.3f}")
        
        print("\n📊 PERFIL DO USUÁRIO:")
        for key, value in results['user_profile'].items():
            print(f"• {key}: {value}")
        
        # Mostrar informações do modelo
        print("\n📊 INFORMAÇÕES DO MODELO:")
        print("=" * 50)
        model_info = predictor.get_model_info()
        for key, value in model_info.items():
            print(f"• {key}: {value}")
            
    except Exception as e:
        print(f"❌ Erro: {e}")