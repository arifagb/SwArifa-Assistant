# SW Assistant BR - TODO

## Funcionalidades Principais

- [x] Tela Home com busca por 3 monstros
- [x] Campo de entrada para nomes de monstros com validação
- [x] Histórico de buscas recentes (estrutura pronta)
- [x] Botão "Buscar por Lista" com grid de monstros
- [x] Tela de Resultados com defesa original
- [x] Listagem de counters com rating
- [x] Card de counter com detalhes da estratégia
- [x] Expandir/colapsar para exibir estratégia completa
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

- [x] Gerar logo do app
- [x] Atualizar app.config.ts com branding
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

## Publicação

- [ ] Gerar APK para Android
- [ ] Gerar IPA para iOS
- [ ] Criar documentação de uso
