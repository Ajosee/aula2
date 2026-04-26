#!/bin/bash

# Sincronização das melhorias do site estático (aula2) para o React (portofolio-react)
# Autor: Antonio J.B. Silva
# Uso: ./sync-react.sh

echo "🚀 Iniciando sincronização do projeto estático para o React..."

# Diretórios
STATIC_DIR=~/aula2
REACT_DIR=~/Projetos\ GIT/portofolio-react

# Verificar se as pastas existem
if [ ! -d "$STATIC_DIR" ]; then
    echo "❌ Pasta estática não encontrada: $STATIC_DIR"
    exit 1
fi

if [ ! -d "$REACT_DIR" ]; then
    echo "❌ Pasta React não encontrada: $REACT_DIR"
    exit 1
fi

echo "📁 Copiando arquivos estáticos..."

# Copiar arquivos que são idênticos entre os projetos
cp "$STATIC_DIR/simulador.html" "$REACT_DIR/public/"
cp "$STATIC_DIR/privacidade.html" "$REACT_DIR/public/"
cp "$STATIC_DIR/style.css" "$REACT_DIR/src/index.css"

# Copiar ícones do PWA, se existirem
[ -f "$STATIC_DIR/icon-192.png" ] && cp "$STATIC_DIR/icon-192.png" "$REACT_DIR/public/"
[ -f "$STATIC_DIR/icon-512.png" ] && cp "$STATIC_DIR/icon-512.png" "$REACT_DIR/public/"

echo "📝 Atualizando componente AnaliseRisco.jsx..."

# Extrair o conteúdo da análise de risco do index.html (estático)
ANALISE_HTML=$(sed -n '/<div class="analise-risco">/,/<\/div>/p' "$STATIC_DIR/index.html")

# Se quiser substituir automaticamente o conteúdo do componente React, descomente as linhas abaixo
# Mas cuidado: isso pode sobrescrever qualquer lógica adicional no JSX.
# Por enquanto, apenas avisamos.
echo "⚠️  O componente AnaliseRisco.jsx não foi atualizado automaticamente (para evitar quebra)."
echo "    Se você alterou o texto no estático, copie manualmente ou ajuste este script."

echo "⚠️  O arquivo src/data/projetosData.js pode precisar de atualização manual (links extras, GitHub)."
echo "    Revise as alterações nos links no estático e replique no React."

echo "✅ Sincronização de arquivos estáticos concluída!"
echo "⚙️  Agora, dentro da pasta React, execute:"
echo "    git add . && git commit -m 'Sincroniza com estático' && git push origin main"
