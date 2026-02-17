# SwArifa Assistant - Testing Guide

## Testes em Dispositivos Reais

Este guia descreve como testar o SwArifa Assistant em dispositivos Android e iOS reais.

---

## Pré-requisitos

### Android
- Android 8.0+ (API 26+)
- Expo Go instalado (https://play.google.com/store/apps/details?id=host.exp.exponent)
- Conexão WiFi com o computador de desenvolvimento

### iOS
- iOS 13.0+
- Expo Go instalado (https://apps.apple.com/app/expo-go/id982107779)
- Conexão WiFi com o computador de desenvolvimento

---

## Fase 1: Preparar Ambiente

### 1. Iniciar Metro Bundler

```bash
cd /home/ubuntu/sw-assistant-app
npm run dev
```

Você verá:
```
Metro Bundler started
Expo Router initialized
Dev server running on: https://8081-...
QR Code: exps://8081-...
```

### 2. Gerar QR Code

```bash
npm run qr
```

Isso gera um QR code que pode ser escaneado pelos dispositivos.

---

## Fase 2: Testar no Android

### Opção 1: Expo Go (Recomendado)

1. **Abrir Expo Go** no seu dispositivo Android
2. **Escanear QR Code** exibido no terminal
3. **Aguardar** o app carregar (1-2 minutos na primeira vez)

### Opção 2: Build APK Local

```bash
eas build --platform android --local
```

Isso gera um APK que pode ser instalado diretamente:
```bash
adb install -r sw-assistant-app.apk
```

### Testes a Executar

#### 1. Funcionalidade Básica
- [ ] App abre sem erros
- [ ] Home screen exibe corretamente
- [ ] Tabs navegam (Home, Catálogo, Configurações)
- [ ] Tema claro/escuro alterna

#### 2. Busca de Defesas
- [ ] Digitar 3 nomes de monstros
- [ ] Clicar "Buscar"
- [ ] Resultados aparecem com counters
- [ ] Counters mostram rating e estratégia
- [ ] Expandir/colapsar estratégia funciona

#### 3. Notificações Push
- [ ] Permissão de notificações é solicitada
- [ ] Notificação de teste aparece
- [ ] Clicar em notificação abre app

#### 4. Overlay Mode
- [ ] Ir para Configurações
- [ ] Ativar "Overlay Mode"
- [ ] Janela flutuante aparece sobre o app
- [ ] Redimensionar janela funciona
- [ ] Fechar overlay funciona

#### 5. Favoritos
- [ ] Salvar composição como favorito
- [ ] Composição aparece em "Catálogo"
- [ ] Remover de favoritos funciona

#### 6. Performance
- [ ] App não congela ao buscar
- [ ] Scroll é suave
- [ ] Transições são fluidas
- [ ] Sem memory leaks (verificar em Settings > Apps > Memory)

---

## Fase 3: Testar no iOS

### Opção 1: Expo Go (Recomendado)

1. **Abrir Expo Go** no seu dispositivo iOS
2. **Escanear QR Code** com câmera ou no Expo Go
3. **Aguardar** o app carregar

### Opção 2: Build IPA Local

```bash
eas build --platform ios --local
```

Isso gera um IPA que pode ser instalado via Xcode:
```bash
xcode-select --install
open -a Xcode sw-assistant-app.ipa
```

### Testes a Executar (Mesmos do Android)

- [ ] Funcionalidade básica
- [ ] Busca de defesas
- [ ] Notificações push
- [ ] Overlay mode (floating window)
- [ ] Favoritos
- [ ] Performance

### Diferenças iOS

- **Overlay Mode**: Usa floating window em vez de Picture-in-Picture
- **Notificações**: Requer permissão explícita na primeira vez
- **Safe Area**: Respeita notch e home indicator

---

## Fase 4: Testar API Real do swgt.io

### 1. Verificar Conexão

```bash
# No app, ir para Configurações
# Verificar "API Status"
# Deve mostrar "Connected ✅"
```

### 2. Buscar Defesa Real

1. Home → "Buscar por Nomes"
2. Digitar: `Susano`, `Garo`, `Orion`
3. Clicar "Buscar"
4. **Esperado**: Resultados do swgt.io aparecem com counters reais

### 3. Trending Defenses

1. Home → "Trending"
2. **Esperado**: Lista de defesas mais populares do swgt.io

### 4. Votar em Counter

1. Abrir resultado de busca
2. Clicar "👍" ou "👎" em um counter
3. **Esperado**: Voto é registrado (verificar no swgt.io)

---

## Fase 5: Testar Notificações Push

### 1. Ativar Notificações

1. Ir para Configurações
2. Ativar "Notificações Push"
3. Permitir permissão quando solicitado

### 2. Testar Notificação de Trending

```bash
# No terminal, executar:
curl -X POST http://localhost:3000/api/notify \
  -H "Content-Type: application/json" \
  -d '{"type":"trending","monsters":["Lushen","Galleon","Taor"],"rating":9.2}'
```

**Esperado**: Notificação aparece no dispositivo

### 3. Testar Notificação de Sincronização

```bash
curl -X POST http://localhost:3000/api/notify \
  -H "Content-Type: application/json" \
  -d '{"type":"sync","newCounters":15}'
```

**Esperado**: Notificação "SwArifa Sync Complete" aparece

---

## Fase 6: Testar Overlay Mode

### Android (Picture-in-Picture)

1. Ativar overlay nas Configurações
2. Abrir Summoners War em split-screen
3. SwArifa aparece como janela flutuante
4. Redimensionar e mover a janela
5. **Esperado**: Funciona sem lag

### iOS (Floating Window)

1. Ativar overlay nas Configurações
2. Abrir Summoners War
3. SwArifa aparece como floating window
4. Redimensionar a janela
5. **Esperado**: Funciona sem interferir com jogo

---

## Checklist de Testes Completo

### Funcionalidade
- [ ] App abre sem erros
- [ ] Todas as telas carregam
- [ ] Navegação entre tabs funciona
- [ ] Tema claro/escuro alterna

### Busca
- [ ] Busca por texto funciona
- [ ] Resultados aparecem
- [ ] Counters mostram detalhes
- [ ] Estratégia expande/colapsa

### API
- [ ] Conecta ao swgt.io
- [ ] Busca dados reais
- [ ] Cache funciona
- [ ] Fallback offline funciona

### Notificações
- [ ] Permissão é solicitada
- [ ] Notificações aparecem
- [ ] Clicar abre app
- [ ] Rate limiting funciona

### Overlay
- [ ] Ativa/desativa
- [ ] Redimensiona
- [ ] Persiste posição
- [ ] Não interfere com jogo

### Performance
- [ ] Sem lag/freeze
- [ ] Scroll suave
- [ ] Transições fluidas
- [ ] Sem memory leaks

### Compatibilidade
- [ ] Android 8.0+
- [ ] iOS 13.0+
- [ ] Landscape e portrait
- [ ] Diferentes tamanhos de tela

---

## Troubleshooting

### App não abre no Expo Go

**Solução:**
1. Verificar conexão WiFi
2. Limpar cache: `npm start -- --clear`
3. Reinstalar Expo Go
4. Verificar versão: `npm list expo`

### Notificações não aparecem

**Solução:**
1. Verificar permissões: Settings > Apps > SwArifa > Notifications
2. Verificar se app está em foreground
3. Verificar se `setupNotifications()` foi chamado
4. Testar com `schedulePeriodicSync()`

### Overlay não funciona

**Solução:**
1. Verificar se `react-native-floating-action` está instalado
2. Verificar se native modules estão linked
3. Testar em dispositivo físico (não funciona em simulator)
4. Verificar permissões de overlay (Android)

### API não conecta

**Solução:**
1. Verificar conexão WiFi
2. Verificar se swgt.io está acessível: `checkSwgtHealth()`
3. Verificar logs: `adb logcat` (Android) ou Xcode console (iOS)
4. Verificar CORS headers
5. Usar cache offline: `getCachedData()`

---

## Relatório de Testes

Após testar, criar um relatório:

```markdown
# SwArifa Assistant - Test Report

**Data:** 2026-02-17
**Testador:** [Seu Nome]
**Dispositivo:** [Android 13 / iOS 16]

## Resultados

### Funcionalidade: ✅ Passou
- App abre sem erros
- Navegação funciona
- Busca retorna resultados

### API: ✅ Passou
- Conecta ao swgt.io
- Busca dados reais
- Cache funciona

### Notificações: ⚠️ Parcial
- Notificações aparecem
- Rate limiting não testado em 6 horas

### Overlay: ❌ Falhou
- Overlay não aparece no Android
- Necessário: Instalar react-native-floating-action

## Próximos Passos

1. Implementar react-native-floating-action
2. Testar overlay por 24 horas
3. Otimizar performance em devices antigos
```

---

## Publicação

Após passar em todos os testes:

```bash
# Gerar APK final
eas build --platform android

# Gerar IPA final
eas build --platform ios

# Submeter para lojas
eas submit --platform android
eas submit --platform ios
```

