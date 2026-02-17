# SwArifa Assistant - Integration Guide

## Como Usar a Skill gaming-app-builder

Este documento mostra como integramos a skill `gaming-app-builder` no SwArifa Assistant, gerando configurações, componentes, notificações push e overlay mode.

---

## Phase 1: Gerar Configurações (app.config.ts, tema, design)

### Usando o Script setup_app_config.py

```bash
python /home/ubuntu/skills/gaming-app-builder/scripts/setup_app_config.py \
  "SwArifa Assistant" sw-arifa-assistant "#1e40af" "#f59e0b" .
```

**Resultado:**
- ✅ `app.config.ts` - Configuração do Expo com bundle ID e plugins
- ✅ `theme.config.js` - Paleta de cores (primária: azul, secundária: ouro)
- ✅ `design.md` - Documento de design com screens e padrões
- ✅ `todo.md` - Lista de tarefas do projeto

**Cores Geradas:**
```javascript
{
  primary: '#1e40af',      // Azul escuro
  secondary: '#f59e0b',    // Ouro/Laranja
  background: '#151718',   // Preto (dark mode)
  surface: '#1e2022',      // Cinza escuro
  foreground: '#ECEDEE',   // Branco
  muted: '#9BA1A6',        // Cinza
}
```

---

## Phase 2: Gerar Componentes Reutilizáveis

### Usando o Script generate_components.py

```bash
python /home/ubuntu/skills/gaming-app-builder/scripts/generate_components.py .
```

**Componentes Gerados:**

### 1. Card Component
```typescript
import { Card } from "@/components/ui/card";

<Card 
  title="Lushen Counter"
  subtitle="Rating: 9.2 ⭐"
  onPress={() => console.log("Tapped")}
>
  <Text>Galleon + Taor strategy</Text>
</Card>
```

### 2. Button Component
```typescript
import { Button } from "@/components/ui/button";

<Button 
  label="Search Counters"
  onPress={handleSearch}
  variant="primary"
/>

<Button 
  label="Save"
  onPress={handleSave}
  variant="secondary"
/>
```

### 3. SearchBar Component
```typescript
import { SearchBar } from "@/components/ui/search-bar";

<SearchBar 
  placeholder="Enter monster name..."
  onSearch={(query) => console.log(query)}
  onClear={() => console.log("Cleared")}
/>
```

### 4. Rating Component
```typescript
import { Rating } from "@/components/ui/rating";

<Rating 
  value={4}
  max={5}
  onRate={(rating) => console.log(rating)}
  size="medium"
/>
```

---

## Phase 3: Integrar Notificações Push

### Arquivo: lib/notifications-integration.ts

Este arquivo implementa o padrão da skill com:
- Setup de permissões
- Notificações com rate limiting
- Tipos específicos (trending, favoritos, sync)

### Inicializar Notificações

```typescript
// Em app/_layout.tsx
import { setupNotifications, setupNotificationHandler } from "@/lib/notifications-integration";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    // Setup notifications on app start
    setupNotifications();

    // Handle notification taps
    const subscription = setupNotificationHandler();
    return () => subscription?.remove();
  }, []);

  return (
    // ... rest of layout
  );
}
```

### Enviar Notificações

```typescript
import {
  notifyNewTrendingCounter,
  notifyFavoriteCompositionUpdated,
  notifySyncComplete,
} from "@/lib/notifications-integration";

// Notificar novo counter trending
await notifyNewTrendingCounter("Lushen", "Galleon", "Taor", 9.2);

// Notificar composição favorita atualizada
await notifyFavoriteCompositionUpdated("Susano, Garo, Orion");

// Notificar sincronização completa
await notifySyncComplete(15); // 15 novos counters
```

### Rate Limiting Automático

A skill implementa rate limiting para evitar spam:

```typescript
const NOTIFICATION_INTERVALS = {
  TRENDING_COUNTER: 6,      // 6 horas
  FAVORITE_UPDATE: 12,      // 12 horas
  SYNC_COMPLETE: 24,        // 24 horas
};
```

**Exemplo de uso:**
```typescript
// Primeira chamada: Notificação enviada ✅
await notifyNewTrendingCounter("Lushen", "Galleon", "Taor", 9.2);

// Segunda chamada (1 hora depois): Bloqueada ⏳
// Mensagem: "Rate limit: 5.0h remaining"
await notifyNewTrendingCounter("Verad", "Woosa", "Anavel", 8.5);

// Terceira chamada (7 horas depois): Notificação enviada ✅
await notifyNewTrendingCounter("Rakan", "Hathor", "Okeanos", 8.8);
```

### Agendar Sincronização Periódica

```typescript
import { schedulePeriodicSync } from "@/lib/notifications-integration";

// Agendar sincronização a cada 6 horas
await schedulePeriodicSync();

// Resultado: Notificação a cada 6 horas
// "SwArifa Sync - Checking for new counters from swgt.io..."
```

---

## Phase 4: Integrar Overlay Mode

### Arquivo: lib/overlay-integration.ts

Este arquivo implementa o padrão da skill com:
- Persistência de estado em AsyncStorage
- Suporte para Android (Picture-in-Picture) e iOS (floating window)
- Customização de tamanho e posição

### Usar Hook de Overlay

```typescript
// Em app/(tabs)/settings.tsx
import { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { 
  loadOverlayState, 
  toggleOverlayMode,
  updateOverlaySize,
  getOverlayInfo 
} from "@/lib/overlay-integration";
import { OverlayState } from "@/lib/overlay-integration";

export default function SettingsScreen() {
  const [overlay, setOverlay] = useState<OverlayState>({
    enabled: false,
    width: 300,
    height: 500,
    x: 0,
    y: 0,
  });

  // Carregar estado ao iniciar
  useEffect(() => {
    const loadState = async () => {
      const state = await loadOverlayState();
      setOverlay(state);
    };
    loadState();
  }, []);

  // Toggle overlay
  const handleToggleOverlay = async () => {
    const newState = await toggleOverlayMode(overlay);
    setOverlay(newState);
  };

  // Aumentar tamanho
  const handleIncreaseSize = async () => {
    const newState = await updateOverlaySize(
      overlay.width + 50,
      overlay.height + 50,
      overlay
    );
    setOverlay(newState);
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView>
        <View className="gap-6">
          <Text className="text-2xl font-bold text-foreground">Settings</Text>

          {/* Overlay Mode Toggle */}
          <View className="bg-surface rounded-lg p-4 gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-foreground font-semibold">Overlay Mode</Text>
              <Pressable
                onPress={handleToggleOverlay}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                    backgroundColor: overlay.enabled ? "#1e40af" : "#687076",
                  },
                ]}
                className="rounded-full px-4 py-2"
              >
                <Text className="text-white font-semibold">
                  {overlay.enabled ? "ON" : "OFF"}
                </Text>
              </Pressable>
            </View>

            {overlay.enabled && (
              <View className="gap-2 mt-2">
                <Text className="text-xs text-muted">
                  {getOverlayInfo(overlay)}
                </Text>
                <Text className="text-xs text-muted">
                  Use overlay para consultar counters sem sair do jogo
                </Text>

                {/* Size Controls */}
                <View className="flex-row gap-2 mt-2">
                  <Pressable
                    onPress={handleIncreaseSize}
                    className="flex-1 bg-primary rounded-lg py-2 items-center"
                  >
                    <Text className="text-white font-semibold">Aumentar</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>

          {/* Overlay Info */}
          <View className="bg-surface rounded-lg p-4 gap-2">
            <Text className="text-sm font-semibold text-foreground">
              Como Funciona
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              Quando ativado, o app aparecerá como uma janela flutuante sobre o jogo Summoners War.
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              • Android: Picture-in-Picture (PiP) mode
              • iOS: Floating window
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
```

### Funções Disponíveis

```typescript
import {
  loadOverlayState,           // Carregar estado
  saveOverlayState,           // Salvar estado
  toggleOverlayMode,          // Ativar/desativar
  updateOverlaySize,          // Alterar tamanho
  updateOverlayPosition,      // Alterar posição
  resetOverlay,               // Resetar para padrão
  getOverlayInfo,             // Obter informações
  getOverlayPercentages,      // Obter percentuais
} from "@/lib/overlay-integration";

// Exemplo: Aumentar tamanho
const newState = await updateOverlaySize(350, 550, currentState);

// Exemplo: Mover para canto inferior direito
const newState = await updateOverlayPosition(100, 300, currentState);

// Exemplo: Resetar para padrão
const defaultState = await resetOverlay();
```

---

## Phase 5: Integração Completa

### Estrutura de Arquivos

```
sw-assistant-app/
├── app/
│   ├── _layout.tsx (setupNotifications aqui)
│   └── (tabs)/
│       ├── index.tsx (Home)
│       ├── search.tsx (SearchBar aqui)
│       ├── favorites.tsx (Card aqui)
│       └── settings.tsx (Overlay toggle aqui)
├── components/
│   └── ui/
│       ├── card.tsx ✅
│       ├── button.tsx ✅
│       ├── search-bar.tsx ✅
│       └── rating.tsx ✅
├── lib/
│   ├── notifications-integration.ts ✅
│   ├── overlay-integration.ts ✅
│   ├── api.ts (com caching)
│   └── utils.ts
├── app.config.ts ✅
├── theme.config.js ✅
├── design.md ✅
└── todo.md ✅
```

### Próximos Passos

1. **Integrar API Real** - Conectar ao swgt.io com web scraping
2. **Implementar Módulos Nativos** - Usar react-native-floating-action para overlay real
3. **Testar em Dispositivos** - Validar notificações e overlay em Android/iOS
4. **Publicar** - Gerar APK/IPA e submeter às lojas

---

## Referências

- **Skill:** `/home/ubuntu/skills/gaming-app-builder/SKILL.md`
- **API Integration:** `/home/ubuntu/skills/gaming-app-builder/references/api-integration.md`
- **Native Features:** `/home/ubuntu/skills/gaming-app-builder/references/native-features.md`
- **Exemplo Real:** `/home/ubuntu/skills/gaming-app-builder/templates/example-swgt-search.tsx`

