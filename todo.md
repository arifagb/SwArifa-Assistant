# SwArifa Assistant - TODO

## Funcionalidades Principais

- [x] Tela Home com busca/exploração
- [x] Tela de Detalhes
- [x] Tela de Favoritos
- [x] Tela de Configurações
- [x] Tema claro/escuro

## Componentes

- [x] ScreenContainer
- [x] Card component
- [x] Button component
- [x] SearchBar component
- [x] Rating component
- [x] Navegação com tabs

## Integração de Dados

- [x] API real do swgt.io com web scraping (lib/swgt-real-api.ts)
- [x] Integrar API com Home Screen (app/(tabs)/index.tsx)
- [x] Trending defenses na Home
- [x] Status da API (online/offline)
- [x] AsyncStorage para persistência (estrutura)
- [x] Tratamento de erros (estrutura)

## Design e Branding

- [x] Gerar logo do app
- [x] Atualizar app.config.ts
- [x] Configurar tema
- [x] Ícones para tabs
- [x] Splash screen

## Notificações Push

- [x] Setup de notificações
- [x] Notificar trending counters
- [x] Notificar favoritos atualizados
- [x] Rate limiting automático
- [ ] Testar notificações em dispositivo real

## Overlay Mode

- [x] Implementar overlay state management
- [x] Integrar react-native-floating-action (components/floating-overlay.tsx)
- [ ] Testar overlay em Android real
- [ ] Testar overlay em iOS real

## Votação em Counters

- [x] Componente CounterVote (components/counter-vote.tsx)
- [x] Botões 👍 e 👎 para votar
- [x] Integração com voteCounter() API
- [x] Feedback visual de voto
- [x] Integrar votação em search-results.tsx

## Overlay Flutuante

- [x] Componente FloatingOverlay (components/floating-overlay.tsx)
- [x] Modal redimensionável
- [x] Controles de tamanho (+/-)
- [x] SearchBar integrada
- [x] Integrar no Settings (app/(tabs)/settings.tsx)
- [x] Botão para abrir overlay
- [x] useFloatingOverlay() hook

## Testes

- [x] Testes unitários para API real (lib/swgt-real-api.test.ts)
- [ ] Teste em dispositivo Android
- [ ] Teste em dispositivo iOS
- [ ] Validar notificações push
- [ ] Validar overlay mode

## Publicação

- [ ] Gerar APK para Android
- [ ] Gerar IPA para iOS
- [ ] Publicar nas lojas (Google Play, App Store)

## Documentação

- [x] INTEGRATION_GUIDE.md - Guia de integração da skill
- [x] TESTING_GUIDE.md - Guia de testes em dispositivos reais
- [x] PUBLISHING_GUIDE.md - Guia de publicação nas lojas

## Implementações Finais Concluídas

- [x] Integrar API real com Home Screen
- [x] Implementar sistema de votação em counters
- [x] Ativar overlay flutuante no Settings
