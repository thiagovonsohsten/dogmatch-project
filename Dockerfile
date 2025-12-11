FROM python:3.11-slim

RUN apt-get update && apt-get install -y build-essential && apt-get clean

WORKDIR /app

# Copia o conteúdo do backend
COPY backend/ /app/

# Instala dependências
RUN pip install --no-cache-dir -r requirements.txt

# Vercel fornece a PORT automaticamente
ENV PORT=8080
EXPOSE 8080

# Comando para rodar o Flask via Gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8080"]