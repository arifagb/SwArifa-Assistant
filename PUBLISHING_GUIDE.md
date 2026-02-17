# SwArifa Assistant - Publishing Guide

## Publicar para Google Play e App Store

Este guia descreve como gerar APK/IPA e publicar o SwArifa Assistant nas lojas oficiais.

---

## Pré-requisitos

### Google Play Store
- Conta Google Play Developer ($25 one-time)
- App assinado com keystore
- Descrição, screenshots, ícone

### Apple App Store
- Conta Apple Developer ($99/ano)
- Certificado de distribuição
- Provisioning profile
- Descrição, screenshots, ícone

---

## Fase 1: Preparar Metadados

### 1. Atualizar app.config.ts

```typescript
const env = {
  appName: "SwArifa Assistant",
  appSlug: "sw-arifa-assistant",
  version: "1.0.0", // Incrementar para cada release
  logoUrl: "https://...", // URL do logo
};
```

### 2. Adicionar Descrição

```typescript
const config: ExpoConfig = {
  description: "Assistente para Summoners War - Encontre os melhores counters para suas defesas",
  
  ios: {
    bundleIdentifier: "space.manus.sw.arifa.assistant",
    buildNumber: "1",
  },
  
  android: {
    package: "space.manus.sw.arifa.assistant",
    versionCode: 1,
  },
};
```

### 3. Adicionar Permissões

```typescript
// app.config.ts
const config: ExpoConfig = {
  android: {
    permissions: [
      "POST_NOTIFICATIONS",
      "INTERNET",
      "ACCESS_NETWORK_STATE",
    ],
  },
};
```

---

## Fase 2: Gerar APK (Android)

### Opção 1: Build na Nuvem (Recomendado)

```bash
# Fazer login no Expo
eas login

# Gerar APK
eas build --platform android --type apk

# Resultado: URL para download do APK
# Exemplo: https://eas-builds.s3.us-west-2.amazonaws.com/...apk
```

### Opção 2: Build Local

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Configurar projeto
eas build:configure

# Build local
eas build --platform android --local
```

### Testar APK

```bash
# Instalar no dispositivo
adb install -r sw-arifa-assistant.apk

# Ou via Expo:
eas build --platform android --type apk
# Escanear QR code no terminal
```

---

## Fase 3: Gerar IPA (iOS)

### Build na Nuvem

```bash
# Gerar IPA
eas build --platform ios

# Resultado: URL para download do IPA
```

### Testar IPA

```bash
# Abrir no Xcode
open -a Xcode sw-arifa-assistant.ipa

# Ou instalar via TestFlight
eas submit --platform ios --latest
```

---

## Fase 4: Publicar no Google Play Store

### 1. Criar App no Google Play Console

1. Ir para https://play.google.com/console
2. Clicar "Create app"
3. Nome: "SwArifa Assistant"
4. Categoria: "Games"
5. Tipo: "Free"

### 2. Preparar Listagem

**Ícone:**
- Tamanho: 512x512 px
- Formato: PNG
- Arquivo: `assets/images/icon.png`

**Screenshots:**
- 5-8 screenshots
- Tamanho: 1080x1920 px (portrait)
- Mostrar: Home, Busca, Resultados, Overlay, Configurações

**Descrição Curta:**
```
Assistente para Summoners War - Encontre os melhores counters para suas defesas de War e Siege Lab
```

**Descrição Completa:**
```
SwArifa Assistant é o assistente definitivo para jogadores de Summoners War.

✨ Funcionalidades:
• Busca de counters em tempo real do swgt.io
• Overlay flutuante para consultar sem sair do jogo
• Notificações de defesas trending
• Catálogo de favoritos
• Tema claro/escuro

🎮 Como Usar:
1. Digite 3 nomes de monstros da sua defesa
2. Veja os melhores counters com estratégias
3. Ative overlay para consultar durante o jogo
4. Salve suas defesas favoritas

📊 Dados:
• Integrado com swgt.io
• Atualizado diariamente
• Offline com cache local

🌐 Suporte:
• Português (Brasil)
• Android 8.0+
• iOS 13.0+
```

### 3. Fazer Upload do APK

1. Google Play Console → Seu App → Release → Production
2. Clicar "Create new release"
3. Upload do APK gerado
4. Adicionar notas de release:
   ```
   v1.0.0 - Lançamento inicial
   • Busca de counters do swgt.io
   • Overlay mode para Android
   • Notificações push
   • Catálogo de favoritos
   ```

### 4. Revisar Conteúdo

- [ ] Ícone aprovado
- [ ] Screenshots aprovados
- [ ] Descrição completa
- [ ] Política de privacidade
- [ ] Termos de serviço
- [ ] Classificação de conteúdo

### 5. Publicar

1. Clicar "Review release"
2. Clicar "Start rollout to Production"
3. Aguardar aprovação (2-4 horas)

---

## Fase 5: Publicar no Apple App Store

### 1. Criar App no App Store Connect

1. Ir para https://appstoreconnect.apple.com
2. Clicar "My Apps"
3. Clicar "+"
4. "New App"
5. Nome: "SwArifa Assistant"
6. Bundle ID: "space.manus.sw.arifa.assistant"

### 2. Preparar Listagem

**Ícone:**
- Tamanho: 1024x1024 px
- Formato: PNG
- Sem transparência

**Screenshots:**
- 2-5 screenshots por device
- iPhone: 1170x2532 px (portrait)
- iPad: 2048x2732 px (portrait)

**Descrição:**
- Máximo 30 caracteres para nome
- Máximo 170 caracteres para subtitle
- Máximo 4000 caracteres para descrição

### 3. Fazer Upload do IPA

```bash
# Build e upload automático
eas submit --platform ios --latest

# Ou manual:
# 1. App Store Connect → Seu App → TestFlight
# 2. Build → Upload do IPA
# 3. Aguardar processamento (15-30 min)
```

### 4. Adicionar Informações

- [ ] Descrição e keywords
- [ ] Classificação de conteúdo
- [ ] Informações de contato
- [ ] Política de privacidade
- [ ] Suporte ao usuário

### 5. Submeter para Revisão

1. App Store Connect → Seu App → Version Release
2. Clicar "Submit for Review"
3. Responder perguntas de conformidade
4. Clicar "Submit"

### 6. Aguardar Aprovação

- Tempo: 24-48 horas (geralmente)
- Apple enviará email com resultado
- Se rejeitado, corrigir e resubmeter

---

## Versioning

### Semantic Versioning

```
MAJOR.MINOR.PATCH

1.0.0 = Lançamento inicial
1.0.1 = Bug fix
1.1.0 = Nova feature
2.0.0 = Breaking changes
```

### Atualizar Versão

```typescript
// app.config.ts
const config: ExpoConfig = {
  version: "1.0.1", // Incrementar
  
  ios: {
    buildNumber: "2", // Incrementar
  },
  
  android: {
    versionCode: 2, // Incrementar
  },
};
```

### Publicar Update

```bash
# Build novo
eas build --platform android --type apk

# Ou para ambas as plataformas
eas build --platform all

# Submeter
eas submit --platform android --latest
eas submit --platform ios --latest
```

---

## Checklist de Publicação

### Antes de Publicar

- [ ] Versão incrementada em app.config.ts
- [ ] Todos os testes passam
- [ ] Sem console errors
- [ ] Performance otimizada
- [ ] Ícone e screenshots prontos
- [ ] Descrição e keywords definidas
- [ ] Política de privacidade publicada
- [ ] Termos de serviço publicados

### Google Play

- [ ] APK gerado e testado
- [ ] Listagem completa
- [ ] Classificação de conteúdo
- [ ] Contato de suporte
- [ ] Permissões justificadas

### Apple App Store

- [ ] IPA gerado e testado
- [ ] Listagem completa
- [ ] Screenshots em alta qualidade
- [ ] Classificação de conteúdo
- [ ] Informações de contato

---

## Monitoramento Pós-Publicação

### Métricas

```bash
# Google Play Console
# Ir para: Analytics → Installs & uninstalls

# App Store Connect
# Ir para: Analytics → App Analytics
```

### Acompanhar

- [ ] Número de instalações
- [ ] Taxa de desinstalação
- [ ] Avaliações e comentários
- [ ] Crashes e erros
- [ ] Performance

### Responder Avaliações

1. Google Play Console → Avaliações
2. Responder comentários negativos
3. Agradecer avaliações positivas
4. Corrigir problemas mencionados

---

## Troubleshooting

### APK não instala

```bash
# Verificar assinatura
jarsigner -verify -verbose sw-arifa-assistant.apk

# Reinstalar
adb uninstall space.manus.sw.arifa.assistant
adb install sw-arifa-assistant.apk
```

### IPA não processa

1. Verificar certificado de distribuição
2. Verificar provisioning profile
3. Verificar bundle ID
4. Resubmeter IPA

### App rejeitado

1. Ler feedback da Apple/Google
2. Corrigir problemas mencionados
3. Testar novamente
4. Resubmeter

---

## Próximos Passos

1. **Monitorar Instalações** - Acompanhar métricas
2. **Coletar Feedback** - Ler avaliações
3. **Planejar Updates** - Adicionar features
4. **Otimizar Performance** - Melhorar baseado em dados
5. **Marketing** - Promover nas redes sociais

