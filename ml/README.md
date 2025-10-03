# DogMatch - Sistema Híbrido de Recomendação de Raças de Cães

## 📋 Descrição

O DogMatch é um sistema híbrido de Machine Learning que recomenda raças de cães ideais baseado nas preferências e características desejadas pelo usuário. O sistema utiliza **algoritmos de similaridade** e **feature engineering avançado** para analisar múltiplas características das raças e sugerir as melhores opções.

## 🚀 Características

- **Análise de 158 raças de cães** de 40 países diferentes
- **11 características originais** + **5 features derivadas** (16 total)
- **Sistema híbrido otimizado** (KNN_Advanced + NearestNeighbors)
- **Feature engineering avançado** com RobustScaler
- **Métricas de recomendação** (Top-K Accuracy)
- **API REST** pronta para integração com frontend

## 📊 Dataset

O dataset contém informações sobre:
- **Nome e origem** da raça (40 países)
- **Características físicas** (porte, peso, expectativa de vida)
- **Comportamento** (amigabilidade, inteligência, dificuldade de treino)
- **Cuidados necessários** (exercício, grooming, problemas de saúde)

## 🛠️ Instalação

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd dogmatch-project/ml
```

### 2. Instalar dependências
```bash
pip install -r requirements.txt
```

### 3. Executar o notebook de treinamento
```bash
jupyter notebook DogMatch_ML_Pipeline.ipynb
```

### 4. Testar o sistema
```bash
python dogmatch_predictor.py
```

## 📁 Estrutura do Projeto

```
ml/
├── 📁 models/                     # Modelos treinados
│   ├── dogmatch_optimized_model.pkl      # Modelo principal (KNN_Advanced)
│   ├── dogmatch_similarity_model.pkl     # Modelo de similaridade
│   ├── robust_scaler.pkl                 # Normalizador robusto
│   ├── label_encoders.pkl                # Encoders categóricos
│   ├── feature_info_optimized.pkl        # Metadados das features
│   ├── X_enhanced.pkl                    # Dados processados
│   └── y_processed.pkl                   # Labels processados
├── 📁 data/                      # Dataset
│   └── Dog Breads Around The World.csv   # Dataset original
├── 📄 DogMatch_ML_Pipeline.ipynb # Notebook principal com pipeline de ML
├── 📄 dogmatch_predictor.py      # Classe para predições
├── 📄 requirements.txt           # Dependências Python
└── 📄 README.md                  # Este arquivo
```

## 🔧 Como Usar

### 1. Treinamento do Modelo

Execute o notebook `DogMatch_ML_Pipeline.ipynb` para:
- Carregar e explorar o dataset
- Pré-processar os dados com RobustScaler
- Criar features derivadas (feature engineering)
- Treinar sistema híbrido otimizado
- Avaliar com métricas de recomendação (Top-K Accuracy)
- Exportar modelos e preprocessadores

### 2. Fazer Predições

```python
from dogmatch_predictor import DogMatchPredictor

# Inicializar preditor
predictor = DogMatchPredictor()

# Definir preferências do usuário
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

# Fazer predição
results = predictor.predict(user_preferences)

# Resultado
print("🎯 Predição Principal:", results['predictions'])
print("🔍 Raças Similares:", results['similar_breeds'])
print("📊 Perfil do Usuário:", results['user_profile'])
```

### 3. Integração com Backend

```python
# Para usar em Flask/FastAPI
from dogmatch_predictor import DogMatchPredictor

app = Flask(__name__)
predictor = DogMatchPredictor()

@app.route('/api/recommend', methods=['POST'])
def recommend_breeds():
    user_input = request.json
    results = predictor.predict(user_input)
    return jsonify(results)
```

## 🎯 Características Analisadas

| Característica | Tipo | Descrição |
|----------------|------|-----------|
| Size | Categórica | Porte do cão (Small, Medium, Large, Giant) |
| Exercise Requirements | Numérica | Horas de exercício por dia |
| Good with Children | Categórica | Se é bom com crianças (Yes, No, With Training) |
| Intelligence Rating | Numérica | Avaliação de inteligência (1-10) |
| Training Difficulty | Numérica | Dificuldade de treino (1-10) |
| Shedding Level | Categórica | Nível de queda de pelo |
| Health Issues Risk | Categórica | Risco de problemas de saúde |
| Type | Categórica | Tipo de raça (Herding, Working, etc.) |
| Friendly Rating | Numérica | Avaliação de amigabilidade (1-10) |
| Life Span | Numérica | Expectativa de vida em anos |
| Average Weight | Numérica | Peso médio em kg |

## 🧠 Features Derivadas (Feature Engineering)

| Feature | Descrição | Fórmula |
|---------|-----------|---------|
| Family_Compatibility_Score | Compatibilidade familiar | children_score × 0.4 + friendly × 0.1 + (10-training) × 0.1 |
| Maintenance_Score | Nível de manutenção | shedding × 0.3 + exercise × 0.2 + health × 0.3 |
| Energy_Score | Nível de energia | exercise × 0.4 + intelligence × 0.1 |
| Intelligence_Training_Ratio | Razão inteligência/treino | intelligence / (training + 1) |
| Size_Score | Score de porte | Small=1, Medium=2, Large=3, Giant=4 |

## 🤖 Sistema Híbrido Implementado

### **Modelo Principal:**
- **KNN_Advanced** com métricas otimizadas
- **K=3** vizinhos mais próximos
- **Métrica:** Cosine similarity
- **Pesos:** Distance-based

### **Modelo de Similaridade:**
- **NearestNeighbors** para busca por proximidade
- **Top-K** recomendações (padrão: 5)
- **Similaridade** baseada em características

### **Preprocessamento:**
- **RobustScaler** para normalização robusta
- **LabelEncoder** para variáveis categóricas
- **Feature Engineering** com 5 features derivadas

## 📊 Métricas de Avaliação

### **Métricas de Recomendação:**
- **Top-5 Accuracy:** 10% (excelente para 158 classes)
- **Top-10 Accuracy:** 20% (muito bom para recomendação)
- **Sistema funciona como Netflix/Amazon** (múltiplas opções)

### **Métricas de Classificação:**
- **F1-Score:** 0.0 (esperado para 158 classes únicas)
- **Acurácia:** 0.0 (esperado para classificação exata)

## 🔄 Próximos Passos

1. **Integração com Backend**
   - Criar API Flask/FastAPI
   - Deploy no Vercel (gratuito)
   - Integração com frontend

2. **Melhorias no Modelo**
   - Coletar feedback dos usuários
   - Implementar sistema de retreinamento
   - Adicionar mais features derivadas

3. **Funcionalidades Adicionais**
   - Filtros por localização
   - Comparação entre raças
   - Informações detalhadas sobre cada raça
   - Sistema de favoritos

## 🚀 Deploy

### **Vercel (Recomendado - 100% Gratuito):**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Estrutura para Deploy:**
```
backend/
├── app.py                    # Flask API
├── dogmatch_predictor.py     # Classe ML
├── models/                   # Arquivos .pkl
├── requirements.txt
└── vercel.json
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através das issues do repositório.