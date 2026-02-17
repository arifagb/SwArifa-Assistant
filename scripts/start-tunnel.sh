#!/bin/bash

# SwArifa Assistant - Start Expo Tunnel
# Script para iniciar o app com tunnel e compartilhar com amigos

set -e

echo "🎮 SwArifa Assistant - Expo Tunnel"
echo "=================================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado"
    echo "Baixe em: https://nodejs.org"
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado"
    exit 1
fi

# Verificar se expo está instalado globalmente
if ! command -v expo &> /dev/null; then
    echo "📦 Instalando Expo CLI..."
    npm install -g expo-cli
fi

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: package.json não encontrado"
    echo "Execute este script no diretório raiz do projeto"
    exit 1
fi

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

echo ""
echo "🚀 Iniciando Expo Tunnel..."
echo ""
echo "Instruções:"
echo "1. Seus amigos devem baixar 'Expo Go' na loja"
echo "2. Escanear o QR code com a câmera (Android) ou Expo Go (iOS)"
echo "3. O app abre automaticamente!"
echo ""
echo "Teclas úteis:"
echo "  'r' - Recarregar o app"
echo "  'w' - Abrir web"
echo "  'q' - Sair"
echo ""
echo "=================================="
echo ""

# Iniciar Expo com tunnel
npx expo start --tunnel

