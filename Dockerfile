FROM python:3.11-slim

# Previne erros do scikit-learn e compilações
RUN apt-get update && apt-get install -y build-essential && apt-get clean

WORKDIR /app

# Copia o backend inteiro (app.py, models, predictor, requirements)
COPY backend/ /app/

# Instala dependências
RUN pip install --no-cache-dir -r requirements.txt

# Porta usada pela Vercel
ENV PORT=8080
EXPOSE 8080

# Roda o Flask com Gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8080"]