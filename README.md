# 🐕 DogMatch Project

## 📋 Descrição

O **DogMatch** é um sistema híbrido de Machine Learning que recomenda raças de cães ideais baseado nas preferências e características desejadas pelo usuário. O sistema utiliza algoritmos de similaridade e feature engineering avançado para analisar múltiplas características das raças e sugerir as melhores opções.

## 🎯 Objetivo

Facilitar a escolha da raça de cão perfeita através de um sistema inteligente que combina:
- **Análise de preferências** do usuário
- **Algoritmos de ML** para recomendação
- **Interface intuitiva** em português
- **Dados precisos** de 25 raças populares

## 🚀 Funcionalidades

### ✨ Sistema de Recomendação
- **Questionário interativo** com múltiplas etapas
- **Análise de compatibilidade** baseada em ML
- **Recomendação principal** + raças similares
- **Scores de compatibilidade** precisos

### 📊 Informações Detalhadas
- **Perfil completo** de cada raça
- **Dados reais** do dataset filtrado
- **Imagens locais** de alta qualidade
- **Resumos e histórias** detalhadas

### 🌐 Interface em Português
- **Nomes das raças** traduzidos
- **Campos e valores** localizados
- **Tooltips explicativos** para grupos de raças
- **Design responsivo** e moderno

## 🏗️ Arquitetura

### 📁 Estrutura do Projeto
```
dogmatch-project/
├── ml/                    # Pipeline de Machine Learning
│   ├── data/             # Datasets e dados
│   ├── models/           # Modelos treinados (.pkl)
│   └── DogMatch_ML_Pipeline.ipynb
├── backend/              # API Flask
│   ├── app.py           # Servidor principal
│   └── dogmatch_predictor.py
├── frontend/            # Interface React
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── pages/       # Páginas principais
│   │   ├── lib/         # Utilitários e APIs
│   │   └── types/       # Definições TypeScript
│   └── public/dog_breeds_img/  # Imagens locais
└── README.md
```

### 🔧 Tecnologias Utilizadas

#### **Machine Learning**
- **Python** + **Pandas** + **Scikit-learn**
- **KNN** (K-Nearest Neighbors) para classificação
- **NearestNeighbors** para similaridade
- **Feature Engineering** avançado

#### **Backend**
- **Flask** (Python)
- **CORS** habilitado
- **API RESTful** com endpoints estruturados
- **Modelos ML** carregados dinamicamente

#### **Frontend**
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** + **Shadcn/ui**
- **React Router** (navegação)
- **React Query** (gerenciamento de estado)

## 📈 Dataset

### 🎯 25 Raças Populares Selecionadas
- **Beagle, Border Collie, Bull Terrier**
- **Chihuahua, Chow Chow, Cocker Spaniel**
- **Golden Retriever, Siberian Husky, Labrador**
- **Lhasa Apso, Maltese, German Shepherd**
- **Miniature Pinscher, Poodle, Pug**
- **Rottweiler, Samoyed, Saint Bernard**
- **Schnauzer, Shih Tzu, Dachshund**
- **West Highland White Terrier, Yorkshire**
- **English Bulldog, French Bulldog**

### 📊 Características Analisadas
- **Tamanho** (Small, Medium, Large, Giant)
- **Necessidades de exercício** (horas/dia)
- **Compatibilidade com crianças**
- **Nível de inteligência** (1-10)
- **Dificuldade de treinamento** (1-10)
- **Nível de queda de pelo**
- **Risco de problemas de saúde**
- **Peso médio** (kg)
- **Expectativa de vida** (anos)
- **Grupo da raça** (Sporting, Working, etc.)

## 🚀 Como Executar

### 📋 Pré-requisitos
- **Python 3.8+**
- **Node.js 16+**
- **npm** ou **yarn**

### 🔧 Instalação e Execução

#### **1. Backend (Flask API)**
```bash
cd backend
pip install -r requirements.txt
python app.py
```
**API disponível em:** `http://127.0.0.1:5000`

#### **2. Frontend (React)**
```bash
cd frontend
npm install
npm run dev
```
**Interface disponível em:** `http://localhost:8080`

#### **3. Machine Learning (Opcional)**
```bash
cd ml
jupyter notebook DogMatch_ML_Pipeline.ipynb
```

## 📡 API Endpoints

### 🔍 Endpoints Disponíveis
- **`GET /api/health`** - Status da API
- **`GET /api/breeds`** - Lista todas as raças
- **`GET /api/features`** - Informações das features
- **`GET /api/model-info`** - Informações do modelo
- **`POST /api/recommend`** - Recomendar raças

### 📝 Exemplo de Uso
```bash
curl -X POST http://127.0.0.1:5000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "size": "Medium",
    "exercise_needs": 2,
    "good_with_children": true,
    "intelligence": 8,
    "training_difficulty": 5,
    "shedding": "Moderate",
    "health_risk": "Low",
    "breed_group": "Sporting"
  }'
```

## 🎨 Interface do Usuário

### 📱 Fluxo de Uso
1. **Questionário** - Preferências em múltiplas etapas
2. **Resultados** - Raça principal + similares
3. **Detalhes** - Informações completas da raça
4. **Navegação** - Explorar diferentes raças

### 🎯 Características da UI
- **Design moderno** com Tailwind CSS
- **Componentes reutilizáveis** (Shadcn/ui)
- **Responsivo** para mobile e desktop
- **Loading states** e tratamento de erros
- **Tooltips informativos** para melhor UX

## 🔬 Machine Learning

### 🧠 Algoritmos Utilizados
- **K-Nearest Neighbors (KNN)** para classificação principal
- **NearestNeighbors** para encontrar raças similares
- **RobustScaler** para normalização de features
- **Label Encoding** para variáveis categóricas

### 📊 Pipeline de ML
1. **Carregamento** do dataset filtrado
2. **Preprocessamento** e feature engineering
3. **Treinamento** dos modelos
4. **Validação** e otimização
5. **Persistência** dos modelos (.pkl)

## 🎯 Resultados

### ✅ Benefícios Alcançados
- **Recomendações precisas** baseadas em ML
- **Interface intuitiva** em português
- **Dados confiáveis** de 25 raças populares
- **Sistema híbrido** (classificação + similaridade)
- **Experiência completa** do usuário

### 📈 Métricas de Qualidade
- **Dataset filtrado** com raças populares
- **Dados reais** e verificados
- **Interface responsiva** e moderna
- **API robusta** com tratamento de erros
- **Código limpo** e bem documentado

## 🤝 Contribuição

### 📝 Como Contribuir
1. **Fork** o repositório
2. **Clone** o projeto
3. **Crie** uma branch para sua feature
4. **Commit** suas mudanças
5. **Push** para a branch
6. **Abra** um Pull Request

### 🐛 Reportar Bugs
- Use as **Issues** do GitHub
- Descreva o problema detalhadamente
- Inclua passos para reproduzir
- Adicione screenshots se necessário

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Desenvolvimento:** Thiago von Sohsten da Equipe DogMatch
- **Machine Learning:** Pipeline customizado
- **Frontend:** React + TypeScript
- **Backend:** Flask + Python

---

## 🎉 Agradecimentos

Obrigado por usar o **DogMatch**! Esperamos que este sistema ajude você a encontrar a raça de cão perfeita para sua vida! 🐕❤️


