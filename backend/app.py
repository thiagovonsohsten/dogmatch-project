"""
DogMatch Backend API - Flask
Sistema híbrido de recomendação de raças de cães
"""

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import sys
import pandas as pd

# Adicionar o diretório atual ao path para importar o predictor
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from dogmatch_predictor import DogMatchPredictor

# Inicializar Flask app
app = Flask(__name__)
CORS(app)  # Permitir CORS para frontend

# Carregar modelo uma vez (cache global)
predictor = None

def get_predictor():
    """Carregar predictor com cache"""
    global predictor
    if predictor is None:
        try:
            predictor = DogMatchPredictor()
            print("✅ DogMatch Predictor carregado com sucesso!")
        except Exception as e:
            print(f"❌ Erro ao carregar predictor: {e}")
            raise e
    return predictor

@app.route('/')
def home():
    """Página inicial da API"""
    return jsonify({
        "message": "🐕 DogMatch API - Sistema Híbrido de Recomendação",
        "version": "1.0.0",
        "status": "online",
        "endpoints": {
            "POST /api/recommend": "Recomendar raças de cães",
            "GET /api/breeds": "Listar todas as raças",
            "GET /api/health": "Status da API",
            "GET /api/features": "Informações das features",
            "GET /api/model-info": "Informações do modelo"
        }
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Verificar saúde da API"""
    try:
        predictor = get_predictor()
        return jsonify({
            "status": "healthy",
            "model_loaded": True,
            "message": "API funcionando corretamente"
        })
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "model_loaded": False,
            "error": str(e)
        }), 500

@app.route('/api/recommend', methods=['POST'])
def recommend_breeds():
    """Endpoint principal para recomendar raças"""
    try:
        # Validar entrada
        if not request.json:
            return jsonify({"error": "JSON body é obrigatório"}), 400
        
        user_input = request.json
        
        # Validar campos obrigatórios
        required_fields = [
            'Size', 'Exercise Requirements (hrs/day)', 'Good with Children',
            'Intelligence Rating (1-10)', 'Training Difficulty (1-10)',
            'Shedding Level', 'Health Issues Risk', 'Type',
            'Friendly Rating (1-10)', 'Life Span', 'Average Weight (kg)'
        ]
        
        missing_fields = [field for field in required_fields if field not in user_input]
        if missing_fields:
            return jsonify({
                "error": f"Campos obrigatórios ausentes: {missing_fields}",
                "required_fields": required_fields
            }), 400
        
        # Fazer predição
        predictor = get_predictor()
        results = predictor.predict(user_input)
        
        # Adicionar metadados
        results['api_version'] = '1.0.0'
        results['timestamp'] = str(pd.Timestamp.now())
        
        return jsonify(results)
        
    except ValueError as e:
        return jsonify({"error": f"Erro de validação: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500

@app.route('/api/breeds', methods=['GET'])
def get_breeds():
    """Listar todas as raças disponíveis"""
    try:
        predictor = get_predictor()
        feature_info = predictor.get_feature_info()
        
        return jsonify({
            "breeds": feature_info['breed_names'],
            "total_breeds": len(feature_info['breed_names']),
            "api_version": "1.0.0"
        })
        
    except Exception as e:
        return jsonify({"error": f"Erro ao listar raças: {str(e)}"}), 500

@app.route('/api/features', methods=['GET'])
def get_features():
    """Informações sobre as features do modelo"""
    try:
        predictor = get_predictor()
        feature_info = predictor.get_feature_info()
        
        return jsonify({
            "features": {
                "categorical": feature_info['categorical_columns'],
                "numeric": feature_info['numeric_columns'],
                "total": len(feature_info['feature_columns'])
            },
            "categorical_values": feature_info['categorical_values'],
            "api_version": "1.0.0"
        })
        
    except Exception as e:
        return jsonify({"error": f"Erro ao obter features: {str(e)}"}), 500

@app.route('/api/model-info', methods=['GET'])
def get_model_info():
    """Informações sobre o modelo"""
    try:
        predictor = get_predictor()
        model_info = predictor.get_model_info()
        
        return jsonify({
            "model": model_info,
            "api_version": "1.0.0"
        })
        
    except Exception as e:
        return jsonify({"error": f"Erro ao obter informações do modelo: {str(e)}"}), 500

@app.route('/api/example', methods=['GET'])
def get_example():
    """Exemplo de entrada para a API"""
    example_input = {
        "Size": "Medium",
        "Exercise Requirements (hrs/day)": 2.0,
        "Good with Children": "Yes",
        "Intelligence Rating (1-10)": 7,
        "Training Difficulty (1-10)": 3,
        "Shedding Level": "Moderate",
        "Health Issues Risk": "Low",
        "Type": "Herding",
        "Friendly Rating (1-10)": 8,
        "Life Span": 12,
        "Average Weight (kg)": 20
    }
    
    return jsonify({
        "example_input": example_input,
        "description": "Exemplo de entrada para o endpoint /api/recommend",
        "usage": "POST /api/recommend com este JSON no body"
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint não encontrado"}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({"error": "Método não permitido"}), 405

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Erro interno do servidor"}), 500

if __name__ == '__main__':
    # Configurações para desenvolvimento e produção
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
