# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-17

### ✨ Features Principais

- **Busca Inteligente** - Busque por 3 monstros para encontrar counters
- **Filtro por Elemento** - Filtre monstros por elemento (Água, Fogo, Vento, Luz, Escuridão)
- **Votação em Counters** - Vote 👍/👎 nos counters para ajudar a comunidade
- **Modo Overlay** - Use o app sem sair do Summoners War (Picture-in-Picture)
- **Notificações Push** - Receba notificações sobre trending counters
- **Autenticação Social** - Login com Google e Apple
- **Compartilhamento** - Compartilhe estratégias via clipboard, link ou nativo
- **Favoritos** - Salve composições favoritas para acesso rápido
- **Histórico** - Acesso rápido a buscas anteriores
- **Analytics** - Rastreamento de eventos para melhorias
- **Tema Escuro** - Interface otimizada para os olhos
- **Offline Mode** - Use o app sem internet (com dados em cache)

### 🏗️ Arquitetura

- React Native 0.81 com Expo 54
- TypeScript 5.9 para tipagem estática
- Expo Router 6 para navegação
- NativeWind 4 (Tailwind CSS)
- TanStack Query para gerenciamento de dados
- Vitest para testes unitários
- Firebase Analytics
- Web scraping com Cheerio

### 📱 Plataformas

- ✅ Android (API 21+)
- ✅ iOS (14.0+)
- ✅ Web (experimental)

### 🧪 Testes

- 36 testes unitários passando
- Cobertura de testes: 80%+
- CI/CD com GitHub Actions

### 📚 Documentação

- README.md - Guia completo
- EXPO_GO_TESTING_GUIDE.md - Como testar com amigos
- TESTING_WITH_FRIENDS.md - Guia de testes estruturados
- GITHUB_ACTIONS_GUIDE.md - CI/CD automático
- GITHUB_SECRETS_SETUP.md - Configuração de secrets
- CONTRIBUTING.md - Guidelines para contribuidores
- STORE_PUBLISHING_GUIDE.md - Como publicar nas lojas
- PRIVATE_DISTRIBUTION_GUIDE.md - Distribuição privada
- INTEGRATION_GUIDE.md - Integração da skill
- PUBLISHING_GUIDE.md - Guia de publicação

### 🔒 Segurança

- OAuth 2.0 para autenticação
- Dados sensíveis em keychain/keystore
- HTTPS para comunicação
- Conformidade com GDPR

### 🚀 Performance

- Lazy loading de componentes
- Caching inteligente de dados
- Otimização de imagens
- Compressão de bundles

### 🎨 Design

- Interface moderna e intuitiva
- Tema escuro nativo
- Responsivo para todos os tamanhos
- Acessibilidade (WCAG 2.1 AA)

---

## Roadmap Futuro

### v1.1.0 - Melhorias de UX
- [ ] Melhorias na interface
- [ ] Novos ícones
- [ ] Animações suaves

### v1.2.0 - Filtros Avançados
- [ ] Filtro por rarity
- [ ] Filtro por tipo
- [ ] Busca avançada

### v1.3.0 - API Real
- [ ] Integração completa com swgt.io
- [ ] Dados em tempo real
- [ ] Sincronização automática

### v1.4.0 - Comunidade
- [ ] Fórum de discussão
- [ ] Ranking de usuários
- [ ] Compartilhamento de estratégias

### v1.5.0 - IA
- [ ] Recomendações com IA
- [ ] Análise de defesas
- [ ] Sugestões automáticas

### v2.0.0 - Expansão
- [ ] Suporte para outros jogos
- [ ] Web app completo
- [ ] Desktop app

---

## Como Contribuir

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir.

## Licença

Este projeto está licenciado sob a Licença MIT - veja [LICENSE](LICENSE) para detalhes.

---

**Última atualização:** Fevereiro 2026
