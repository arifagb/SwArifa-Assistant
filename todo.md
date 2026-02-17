# SwArifa Assistant - TODO

## Funcionalidades Principais

- [x] Tela Home com busca por 3 monstros
- [x] Campo de entrada para nomes de monstros com validação
- [x] Histórico de buscas recentes (estrutura pronta)
- [x] Botão "Buscar por Lista" com grid de monstros
- [x] Tela de Resultados com defesa original
- [x] Listagem de counters com rating
- [x] Card de counter com detalhes da estratégia
- [x] Expandir/colapsar para exibir estratégia completa
- [x] Integração com API do swgt.io para dados em tempo real (serviço criado)
- [x] Modo overlay/floating window (Picture-in-Picture) (hook criado)
- [x] Sincronização automática de dados do swgt.io (estrutura pronta)
- [ ] Sistema de votação (+/- para counters)
- [x] Tela de Catálogo com favoritos
- [x] Salvar/remover composições favoritas (estrutura pronta)
- [x] Tela de Configurações
- [x] Tema claro/escuro
- [ ] Compartilhar composição
- [ ] Copiar composição para clipboard
- [x] Busca por monstro individual
- [ ] Filtro por elemento (água, fogo, vento, luz, escuridão)

## Componentes

- [x] MonsterCard
- [x] CompositionCard
- [x] CounterCard
- [x] SearchBar (integrado na Home)
- [x] RatingStars (integrado em CounterCard)
- [x] StrategySheet (integrado em search-results)
- [x] ScreenContainer (já existe)
- [x] TabBar com 3 abas

## Integração de Dados

- [x] Mock data de composições (baseado em swgt.io)
- [x] Algoritmo de busca local
- [x] AsyncStorage para histórico (estrutura pronta)
- [x] AsyncStorage para favoritos (estrutura pronta)
- [x] Cache de composições (estrutura pronta)

## Design e Branding

- [ ] Gerar novo logo para SwArifa Assistant
- [ ] Atualizar app.config.ts com novo nome e branding
- [x] Configurar tema (cores primárias)
- [x] Ícones para tabs
- [x] Splash screen (logo copiado)

## Testes

- [x] Testes unitários de mock data
- [ ] Testar busca por nome (manual)
- [ ] Testar busca por lista (manual)
- [ ] Testar navegação entre telas (manual)
- [ ] Testar favoritos (manual)
- [ ] Testar tema claro/escuro (manual)
- [ ] Testar compartilhamento (manual)
- [ ] Teste em dispositivo Android
- [ ] Teste em dispositivo iOS

## Integração com swgt.io

- [x] Criar serviço de API para buscar dados do swgt.io (swgt-api-real.ts)
- [x] Implementar cache de dados locais com expiry
- [x] Sincronização automática periódica (schedulePeriodicSync)
- [x] Tratamento de erros de conexão com fallback
- [x] Modo offline com dados em cache

## Modo Overlay

- [x] Implementar Picture-in-Picture (PiP) para Android (hook criado)
- [x] Implementar modo flutuante para iOS (hook criado)
- [x] Botão flutuante para ativar/desativar overlay (settings integrado)
- [x] Redimensionamento da janela flutuante (estrutura pronta)
- [x] Posicionamento persistente da janela (estrutura pronta)

## Notificações Push

- [x] Setup de notificações (setupNotifications)
- [x] Notificar novo counter trending (notifyNewTrendingCounter)
- [x] Notificar composição favorita atualizada (notifyFavoriteCompositionUpdated)
- [x] Notificar sincronização completa (notifySyncComplete)
- [x] Agendar sincronização periódica (schedulePeriodicSync)
- [x] Rate limiting de notificações

## Capa do App

- [x] Melhorar imagem de capa (cover.png otimizado)
- [x] Criar componente AppCover com gradiente
- [x] Integrar capa na Home screen
- [x] Usar LinearGradient para overlay

## Skill Reutilizável

- [x] Criar skill mobile-app-expo-developer
- [x] Documentar workflow completo (6 fases)
- [x] Incluir padrões comuns (screen template, API caching, notifications)
- [x] Adicionar troubleshooting guide
- [x] Validar skill com quick_validate.py

## Publicação

- [ ] Gerar APK para Android (eas build --platform android)
- [ ] Gerar IPA para iOS (eas build --platform ios)
- [ ] Testar em dispositivos reais
- [ ] Publicar nas lojas (Google Play, App Store)
