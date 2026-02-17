# Design do SW Assistant BR

## Visão Geral

Aplicativo móvel para auxiliar jogadores de Summoners War (SW) na composição de defesas e ataques para Guild War (GW), Siege Lab (SL) e estratégias gerais. Interface em português, otimizada para uso com uma mão em orientação retrato.

## Paleta de Cores

- **Primária**: `#1E90FF` (Azul vibrante - cor do jogo SW)
- **Secundária**: `#FFD700` (Ouro - destaque importante)
- **Fundo**: `#0F1419` (Cinza escuro - tema escuro)
- **Superfície**: `#1A1F26` (Cinza mais claro para cards)
- **Texto Primário**: `#FFFFFF` (Branco)
- **Texto Secundário**: `#B0B8C1` (Cinza claro)
- **Sucesso**: `#4ADE80` (Verde)
- **Aviso**: `#FBBF24` (Laranja)
- **Erro**: `#F87171` (Vermelho)

## Telas Principais

### 1. **Home (Busca de Composições)**
**Conteúdo:**
- Campo de busca com 3 slots para nomes de monstros (ex: "Susano Garo Orion")
- Botão "Buscar" com feedback visual
- Histórico de buscas recentes (últimas 5)
- Botão "Buscar por Lista" para seleção em grid

**Funcionalidade:**
- Usuário digita 3 nomes de monstros
- App busca composições defensivas e counters
- Resultado exibe defesa original + lista de counters ordenados por rating

### 2. **Resultados de Busca**
**Conteúdo:**
- Card da defesa buscada (3 monstros + skill líder)
- Lista de counters com:
  - Imagem dos 3 monstros
  - Rating (estrelas)
  - Descrição da estratégia
  - Autor e data
  - Botões +/- para votar

**Funcionalidade:**
- Scroll infinito para carregar mais counters
- Filtro por rating mínimo
- Favoritar composições
- Compartilhar estratégia

### 3. **Meu Catálogo**
**Conteúdo:**
- Lista de monstros favoritos
- Composições salvas (defesas e ataques)
- Histórico de buscas

**Funcionalidade:**
- Adicionar/remover monstros favoritos
- Salvar composições personalizadas
- Acessar histórico rápido

### 4. **Detalhes da Composição**
**Conteúdo:**
- Defesa completa (3 monstros)
- Skill líder detalhada
- Pontos fortes e fracos
- Notas de construção (runas, artefatos)
- Lista de counters com estratégias

**Funcionalidade:**
- Expandir/colapsar seções
- Copiar composição para clipboard
- Compartilhar via WhatsApp/Telegram

### 5. **Busca por Monstro**
**Conteúdo:**
- Grid de monstros com ícones
- Busca por nome/tipo
- Filtros por elemento (água, fogo, vento, luz, escuridão)

**Funcionalidade:**
- Selecionar 3 monstros
- Ir para resultados de busca

### 6. **Configurações**
**Conteúdo:**
- Tema (claro/escuro)
- Idioma (português)
- Limpar histórico
- Sobre o app
- Créditos

## Fluxos de Usuário Principais

### Fluxo 1: Buscar Composição por Nomes
1. Usuário abre app → Home
2. Digita 3 nomes de monstros
3. Clica "Buscar"
4. App exibe defesa + counters
5. Usuário toca em counter para ver estratégia
6. Opcionalmente favorita ou compartilha

### Fluxo 2: Buscar por Grid de Monstros
1. Usuário clica "Buscar por Lista"
2. Grid de monstros aparece
3. Seleciona 3 monstros
4. Clica "Buscar"
5. Mesmo resultado da busca por nomes

### Fluxo 3: Acessar Favoritos
1. Usuário clica aba "Catálogo"
2. Vê composições salvas
3. Toca em uma para ver detalhes
4. Pode editar ou deletar

## Componentes Reutilizáveis

- **MonsterCard**: Exibe ícone, nome e elemento do monstro
- **CompositionCard**: Exibe 3 monstros + skill líder
- **CounterCard**: Exibe counter com rating e estratégia
- **SearchBar**: Campo de entrada com validação
- **RatingStars**: Componente de estrelas (1-5)
- **StrategySheet**: Bottom sheet com detalhes da estratégia

## Navegação (Tabs)

1. **🏠 Home** - Busca principal
2. **📚 Catálogo** - Favoritos e histórico
3. **⚙️ Configurações** - Tema, idioma, sobre

## Dados Locais (AsyncStorage)

- Histórico de buscas (últimas 20)
- Composições favoritas
- Preferências do usuário (tema, idioma)
- Cache de composições recentes

## Considerações de Design

- **Acessibilidade**: Textos grandes, contraste alto, botões grandes (min 44x44pt)
- **Performance**: Lazy loading de imagens, virtualização de listas
- **Responsividade**: Adaptar para telas de 5" a 6.7"
- **Orientação**: Apenas retrato (portrait)
- **Tema**: Tema escuro por padrão (comum em apps de games)
