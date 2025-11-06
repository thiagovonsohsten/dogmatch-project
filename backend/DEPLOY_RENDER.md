# Deploy do Backend no Render

## Passo a Passo Completo

### 1. Preparação
- ✅ `Procfile` criado
- ✅ `gunicorn` adicionado ao `requirements.txt`
- ✅ `app.py` configurado para usar porta dinâmica

### 2. Deploy no Render

#### Opção A: Via Dashboard (Recomendado)

1. **Acesse**: https://render.com
2. **Crie uma conta** (use GitHub para login)
3. **New → Web Service**
4. **Conecte seu repositório GitHub**:
   - Selecione: `thiagovonsohsten/dogmatch-project`
   - Branch: `main`
5. **Configure o serviço**:
   - **Name**: `dogmatch-backend`
   - **Environment**: `Python 3`
   - **Region**: Escolha mais próxima (ex: `Oregon (US West)`)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`
6. **Clique em "Create Web Service"**

#### Opção B: Via render.yaml (Automático)

1. **Acesse**: https://render.com
2. **New → Blueprint**
3. **Conecte seu repositório GitHub**
4. **Render detectará automaticamente o `render.yaml`**
5. **Clique em "Apply"**

### 3. Variáveis de Ambiente (Opcional)

Se precisar de variáveis de ambiente:
- Vá em **Environment** no dashboard do Render
- Adicione variáveis se necessário

### 4. Verificar Deploy

Após o deploy, você receberá uma URL como:
```
https://dogmatch-backend.onrender.com
```

**Teste a API**:
```bash
# Health check
curl https://dogmatch-backend.onrender.com/api/health

# Listar raças
curl https://dogmatch-backend.onrender.com/api/breeds
```

### 5. Atualizar Frontend

Depois que o backend estiver funcionando, atualize o `frontend/src/lib/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.PROD
  ? 'https://dogmatch-backend.onrender.com'
  : 'http://127.0.0.1:5000';
```

## Troubleshooting

### Erro: "Module not found"
- Verifique se todas as dependências estão no `requirements.txt`
- Verifique os logs do Render para mais detalhes

### Erro: "Port already in use"
- O Render define automaticamente a variável `PORT`
- Não precisa configurar manualmente

### Erro: "Models not found"
- Verifique se os arquivos `.pkl` estão na pasta `backend/models/`
- Verifique se o caminho no `dogmatch_predictor.py` está correto

### Deploy lento
- O primeiro deploy pode demorar 5-10 minutos
- Deploys subsequentes são mais rápidos

## Recursos

- **Documentação Render**: https://render.com/docs
- **Python no Render**: https://render.com/docs/deploy-python
- **Gunicorn**: https://gunicorn.org/

