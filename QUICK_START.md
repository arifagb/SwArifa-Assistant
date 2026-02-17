# 🚀 Quick Start - SwArifa Assistant

Guia rápido para começar a usar o SwArifa Assistant em 5 minutos.

## 📱 Opção 1: Usar via Expo Go (Mais Rápido)

### Para Você (Desenvolvedor)

```bash
# 1. Clonar repositório
git clone https://github.com/arifagb/SwArifa-Assistant.git
cd SwArifa-Assistant

# 2. Instalar dependências
npm install

# 3. Iniciar com tunnel
./scripts/start-tunnel.sh

# 4. Escanear QR code com Expo Go
```

### Para Seus Amigos

1. **Baixar Expo Go:**
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

2. **Escanear QR Code:**
   - Android: Abrir câmera → escanear QR code
   - iOS: Abrir Expo Go → escanear QR code

3. **App abre automaticamente!** 🎉

## 📦 Opção 2: Gerar APK/IPA (Para Produção)

### Android APK

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Fazer login
eas login

# Gerar APK
eas build --platform android --type apk

# Compartilhar arquivo .apk com amigos
```

### iOS IPA

```bash
# Gerar IPA
eas build --platform ios

# Usar TestFlight para distribuir
# https://testflight.apple.com
```

## 🎮 Usando o App

### Buscar Counters

1. **Abrir app** → Tela "Buscar"
2. **Digitar 3 monstros:**
   - Ex: Susano, Garo, Orion
3. **Clicar "Buscar"**
4. **Ver counters** com rating e estratégias

### Filtrar por Elemento

1. **Clicar em elemento** (💧 Água, 🔥 Fogo, etc)
2. **Resultados atualizam** automaticamente
3. **Clicar novamente** para remover filtro

### Votar em Counters

1. **Ver resultado** de counter
2. **Clicar 👍 ou 👎** para votar
3. **Seu voto é salvo** localmente

### Compartilhar Estratégia

1. **Ver resultado** de counter
2. **Clicar botão "Compartilhar"**
3. **Escolher:**
   - 📋 Copiar para clipboard
   - 🔗 Copiar link
   - 📤 Compartilhar via nativo

### Modo Overlay

1. **Ir para Configurações**
2. **Ativar "Modo Overlay"**
3. **Botão flutuante aparece**
4. **Usar sem sair do Summoners War!**

## 🔧 Desenvolvimento Local

### Estrutura do Projeto

```
SwArifa-Assistant/
├── app/                    # Telas (Expo Router)
├── components/             # Componentes React
├── lib/                    # Lógica e APIs
├── hooks/                  # Custom hooks
├── constants/              # Constantes
├── assets/                 # Imagens e fontes
├── scripts/                # Scripts úteis
└── package.json            # Dependências
```

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Iniciar dev server
npm run dev:metro       # Apenas Metro bundler
npm run dev:server      # Apenas backend server

# Testes
npm test                # Rodar testes
npm test -- --watch    # Watch mode
npm test -- --coverage # Com cobertura

# Qualidade
npm run check           # Verificar tipos TypeScript
npm run lint            # ESLint
npm run format          # Prettier

# Build
npm run build           # Build para produção
npm start               # Iniciar servidor produção
```

### Editar Código

1. **Abrir editor:** VS Code, WebStorm, etc
2. **Editar arquivo** em `app/` ou `components/`
3. **Salvar** - App recarrega automaticamente
4. **Ver mudanças** no Expo Go

### Adicionar Nova Tela

1. **Criar arquivo:** `app/nova-tela.tsx`
2. **Adicionar componente:**
   ```tsx
   import { ScreenContainer } from "@/components/screen-container";
   
   export default function NovaTela() {
     return (
       <ScreenContainer className="p-4">
         {/* Seu conteúdo aqui */}
       </ScreenContainer>
     );
   }
   ```
3. **Acessar via:** `npx expo start` → `w` (web) ou escanear QR

## 🐛 Troubleshooting

### "QR code não aparece"

```bash
# Reiniciar tunnel
./scripts/start-tunnel.sh
```

### "App não carrega"

```bash
# Limpar cache
rm -rf node_modules
npm install

# Reiniciar
./scripts/start-tunnel.sh
```

### "Erro de dependências"

```bash
# Atualizar dependências
npm install

# Verificar versões
npm list
```

### "Testes falhando"

```bash
# Rodar com verbose
npm test -- --reporter=verbose

# Ver arquivo de teste
cat lib/swgt-real-api.test.ts
```

## 📚 Documentação Completa

- **README.md** - Visão geral do projeto
- **CONTRIBUTING.md** - Como contribuir
- **CHANGELOG.md** - Histórico de versões
- **BRANCH_PROTECTION_GUIDE.md** - Proteção de branch
- **GITHUB_ACTIONS_GUIDE.md** - CI/CD automático
- **GITHUB_SECRETS_SETUP.md** - Configurar secrets
- **TESTING_WITH_FRIENDS.md** - Teste com amigos
- **EXPO_GO_TESTING_GUIDE.md** - Usar Expo Go

## 🎯 Próximos Passos

1. **Testar localmente** - Seguir Opção 1 acima
2. **Compartilhar com amigos** - Usar QR code
3. **Coletar feedback** - Usar TESTING_WITH_FRIENDS.md
4. **Contribuir** - Ver CONTRIBUTING.md
5. **Publicar** - Seguir STORE_PUBLISHING_GUIDE.md

## 💡 Dicas

- **Expo Go é mais rápido** - Use para desenvolvimento
- **APK é para produção** - Use para distribuição
- **Tunnel permite offline** - Amigos não precisam estar na mesma rede
- **Recarregar com 'r'** - Tecla 'r' no terminal recarrega app
- **Logs no console** - Abrir DevTools para ver erros

## 🆘 Precisa de Ajuda?

- **Issues:** https://github.com/arifagb/SwArifa-Assistant/issues
- **Discussions:** https://github.com/arifagb/SwArifa-Assistant/discussions
- **README:** https://github.com/arifagb/SwArifa-Assistant#readme

---

**Pronto para começar?** 🚀

Execute `./scripts/start-tunnel.sh` e compartilhe o QR code com seus amigos!
