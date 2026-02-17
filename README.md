# SwArifa Assistant 🎮⚔️

**Assistente inteligente para Summoners War** - Encontre os melhores counters para suas defesas de War, Siege Lab e ataques com interface intuitiva e dados em tempo real.

[![GitHub](https://img.shields.io/badge/GitHub-arifagb%2FSwArifa--Assistant-blue?logo=github)](https://github.com/arifagb/SwArifa-Assistant)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue?logo=react)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-54-black?logo=expo)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 🚀 Features

### 🔍 Busca Inteligente
- **Busca por 3 Monstros** - Digite ou selecione 3 monstros para encontrar counters
- **Busca por Elemento** - Filtro por elemento (Água, Fogo, Vento, Luz, Escuridão)
- **Defesas Trending** - Veja as defesas mais populares no momento
- **Histórico de Buscas** - Acesso rápido a buscas anteriores

### ⭐ Votação e Ratings
- **Votação em Counters** - Vote 👍/👎 nos counters para ajudar a comunidade
- **Rating Visual** - Veja a efetividade de cada counter (0-10)
- **Estratégias Detalhadas** - Descrição completa de como usar cada counter

### 📱 Modo Overlay
- **Janela Flutuante** - Use o app sem sair do Summoners War
- **Redimensionável** - Ajuste o tamanho da janela (200-500px)
- **Picture-in-Picture** - Suporte nativo para Android e iOS
- **Busca Rápida** - SearchBar integrada no overlay

### 🔔 Notificações Push
- **Trending Counters** - Notificações sobre novos counters populares
- **Composições Favoritas** - Alerta quando uma defesa favorita é atualizada
- **Sincronização** - Notificações quando novos dados são sincronizados
- **Rate Limiting** - Sem spam, máximo 1 notificação a cada 6-24 horas

### 👤 Autenticação e Sincronização
- **Login Social** - Autenticação com Google e Apple
- **Sincronização de Dados** - Sincronize favoritos e histórico entre dispositivos
- **Modo Offline** - Use o app sem internet (com dados em cache)
- **Analytics** - Rastreamento de eventos para melhorar o app

### 🎨 Interface Intuitiva
- **Design Moderno** - Interface limpa e fácil de usar
- **Tema Escuro** - Proteção para os olhos durante longas sessões
- **Responsivo** - Otimizado para Android e iOS
- **Acessibilidade** - Suporte para leitura de tela

## 📋 Requisitos

- **Node.js** 18+ e npm/pnpm
- **Expo CLI** (`npm install -g expo-cli`)
- **EAS CLI** (`npm install -g eas-cli`) - Para gerar APK/IPA
- **Android Studio** ou **Xcode** - Para emuladores (opcional)

## 🔧 Instalação

### 1. Clonar Repositório

```bash
git clone https://github.com/arifagb/SwArifa-Assistant.git
cd SwArifa-Assistant
```

### 2. Instalar Dependências

```bash
npm install
# ou
pnpm install
```

### 3. Iniciar Dev Server

```bash
npm run dev
# ou
npx expo start
```

### 4. Testar no Dispositivo

**Android:**
```bash
npm run android
# ou escanear QR code com câmera
```

**iOS:**
```bash
npm run ios
# ou escanear QR code com Expo Go
```

**Web:**
```bash
# Automaticamente aberto em http://localhost:8081
```

## 🎯 Como Usar

### Buscar Counters por Nome

1. Abra o app
2. Digite 3 nomes de monstros no campo "Buscar por Nomes"
3. Clique em "Buscar (3/3)"
4. Veja os counters recomendados com ratings

### Buscar por Grid de Monstros

1. Clique em "Abrir" na seção "Buscar por Lista"
2. Selecione 3 monstros do grid
3. Clique em "Buscar (3/3)"
4. Veja os resultados

### Filtrar por Elemento

1. Use o filtro "Filtrar por Elemento" no topo
2. Selecione um elemento (Água, Fogo, Vento, Luz, Escuridão)
3. O grid de monstros será filtrado automaticamente

### Votar em Counters

1. Nos resultados de busca, clique em um counter
2. Use os botões 👍 (gostei) e 👎 (não gostei)
3. Seu voto ajuda a comunidade!

### Compartilhar Estratégias

1. Nos resultados, clique em "Compartilhar"
2. Escolha:
   - **Copiar** - Copia para clipboard
   - **Link** - Gera link compartilhável
   - **Nativo** - Compartilha via WhatsApp, Telegram, etc.

### Ativar Overlay

1. Vá para "Configurações"
2. Ative "Modo Overlay"
3. O app aparecerá como janela flutuante
4. Use enquanto joga Summoners War!

## 📚 Documentação

- **[PRIVATE_DISTRIBUTION_GUIDE.md](PRIVATE_DISTRIBUTION_GUIDE.md)** - Como compartilhar com amigos
- **[STORE_PUBLISHING_GUIDE.md](STORE_PUBLISHING_GUIDE.md)** - Como publicar nas lojas
- **[GITHUB_PUSH_GUIDE.md](GITHUB_PUSH_GUIDE.md)** - Como fazer push para GitHub
- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Guia de integração da skill
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Guia de testes em dispositivos reais

## 🏗️ Arquitetura

```
SwArifa-Assistant/
├── app/                          # Telas e rotas (Expo Router)
│   ├── (tabs)/
│   │   ├── index.tsx            # Home screen com busca
│   │   ├── catalog.tsx          # Catálogo de favoritos
│   │   └── settings.tsx         # Configurações
│   ├── auth-screen.tsx          # Autenticação social
│   └── search-results.tsx       # Resultados da busca
├── components/                   # Componentes reutilizáveis
│   ├── app-cover.tsx            # Capa visual do app
│   ├── element-filter.tsx       # Filtro por elemento
│   ├── counter-vote.tsx         # Votação em counters
│   ├── share-buttons.tsx        # Compartilhamento
│   ├── floating-overlay.tsx     # Overlay flutuante
│   └── ...
├── lib/                          # Lógica e utilitários
│   ├── swgt-real-api.ts         # API do swgt.io com web scraping
│   ├── auth-service.ts          # Autenticação social
│   ├── firebase-analytics.ts    # Analytics
│   ├── push-notifications-service.ts
│   ├── share-service.ts         # Compartilhamento
│   └── ...
├── hooks/                        # Custom hooks
│   ├── use-social-auth.ts       # Autenticação
│   ├── use-analytics.ts         # Analytics
│   ├── use-push-notifications.ts
│   └── ...
├── assets/                       # Imagens e ícones
│   ├── images/
│   │   ├── icon.png             # Ícone do app
│   │   ├── cover-new.png        # Capa visual
│   │   └── ...
├── app.config.ts                # Configuração Expo
├── theme.config.js              # Tema e cores
├── tailwind.config.js           # Tailwind CSS
└── package.json                 # Dependências

```

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **React Native** | 0.81 | Framework mobile |
| **Expo** | 54 | Plataforma de desenvolvimento |
| **TypeScript** | 5.9 | Tipagem estática |
| **Expo Router** | 6 | Navegação |
| **NativeWind** | 4 | Tailwind CSS para React Native |
| **TanStack Query** | 5.90 | Gerenciamento de dados |
| **Expo Notifications** | 0.32 | Notificações push |
| **Expo Clipboard** | 5 | Acesso ao clipboard |
| **Cheerio** | 1.0 | Web scraping |
| **Vitest** | 2.1 | Testes unitários |

## 📊 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Gerar cobertura de testes
npm test -- --coverage
```

**Status Atual:** 36 testes passando ✅

## 🚀 Distribuição

### Testar com Amigos (Expo Go)

```bash
# Iniciar servidor com tunnel (internet pública)
npx expo start --tunnel

# Compartilhar QR code com amigos
# Eles escanear com câmera (Android) ou Expo Go (iOS)
```

### Gerar APK (Android)

```bash
# Gerar APK para distribuição
eas build --platform android --type apk

# Ou localmente
npx expo prebuild --clean
cd android && ./gradlew assembleRelease
```

### Gerar IPA (iOS)

```bash
# Gerar IPA para TestFlight
eas build --platform ios --type ipa

# Ou para App Store
eas build --platform ios --type app-store
```

### Publicar nas Lojas

Veja [STORE_PUBLISHING_GUIDE.md](STORE_PUBLISHING_GUIDE.md) para instruções completas.

## 🔐 Segurança

- ✅ Autenticação segura com OAuth 2.0
- ✅ Dados sensíveis armazenados em keychain/keystore
- ✅ Comunicação HTTPS com swgt.io
- ✅ Sem armazenamento de senhas localmente
- ✅ Conformidade com GDPR (dados em cache local)

## 📈 Roadmap

- [ ] **v1.1** - Melhorias de UI/UX
- [ ] **v1.2** - Filtros avançados (rarity, tipo, etc.)
- [ ] **v1.3** - Integração com API real do swgt.io
- [ ] **v1.4** - Comunidade e fórum
- [ ] **v1.5** - Recomendações com IA
- [ ] **v2.0** - Suporte para outros jogos

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **swgt.io** - Dados de composições e counters
- **Summoners War** - Jogo inspirador
- **Expo** - Plataforma de desenvolvimento
- **Comunidade React Native** - Suporte e recursos

## 📞 Suporte

- **Issues** - [GitHub Issues](https://github.com/arifagb/SwArifa-Assistant/issues)
- **Discussões** - [GitHub Discussions](https://github.com/arifagb/SwArifa-Assistant/discussions)
- **Email** - dev@swarifa.app

## 📱 Screenshots

### Home Screen
- Busca por 3 monstros
- Defesas trending
- Filtro por elemento
- Status da API

### Resultados
- Counters com ratings
- Estratégias detalhadas
- Votação e compartilhamento
- Expandir/colapsar

### Configurações
- Tema claro/escuro
- Modo overlay
- Autenticação
- Analytics

## 🎯 Próximas Etapas

1. **Testar com Amigos** - Use `npx expo start --tunnel` e compartilhe QR code
2. **Coletar Feedback** - Ouça o que seus amigos acham
3. **Publicar nas Lojas** - Quando estiver pronto, siga [STORE_PUBLISHING_GUIDE.md](STORE_PUBLISHING_GUIDE.md)
4. **Melhorar Continuamente** - Adicione features baseado em feedback

---

**Made with ❤️ for Summoners War players**

**Última atualização:** Fevereiro 2026
