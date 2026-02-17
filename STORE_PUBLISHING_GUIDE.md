# Guia Completo de Publicação - SwArifa Assistant

Instruções passo a passo para publicar o SwArifa Assistant no Google Play Store e Apple App Store.

## Pré-requisitos

- Conta Google Play Developer ($25 USD, pagamento único)
- Conta Apple Developer ($99 USD/ano)
- Expo CLI instalado (`npm install -g expo-cli`)
- EAS CLI instalado (`npm install -g eas-cli`)

## Fase 1: Preparação

### 1.1 Configurar Credenciais Expo

```bash
# Login na conta Expo
eas login

# Verificar credenciais
eas credentials
```

### 1.2 Atualizar app.config.ts

```typescript
// Versão deve ser incrementada a cada release
export default {
  version: "1.0.0",
  ios: {
    bundleIdentifier: "space.manus.sw.arifa.assistant",
  },
  android: {
    package: "space.manus.sw.arifa.assistant",
  },
};
```

### 1.3 Criar Ícones e Splash Screens

- Ícone: 1024x1024 px (assets/images/icon.png)
- Splash: 1080x1920 px (assets/images/splash-icon.png)
- Favicon: 192x192 px (assets/images/favicon.png)

## Fase 2: Build para Android (APK/AAB)

### 2.1 Gerar Keystore (primeira vez apenas)

```bash
# EAS gerará automaticamente
eas build --platform android --type apk
```

### 2.2 Build de Produção

```bash
# Gerar APK para testes
eas build --platform android --type apk

# Gerar AAB para Google Play (recomendado)
eas build --platform android --type app-bundle
```

### 2.3 Testar APK

```bash
# Baixar APK do resultado do build
# Instalar em dispositivo Android
adb install app.apk

# Testar funcionalidades principais
# - Busca de defesas
# - Votação em counters
# - Compartilhamento
# - Notificações push
# - Overlay mode
```

## Fase 3: Build para iOS (IPA)

### 3.1 Configurar Certificados

```bash
# EAS gerará certificados automaticamente
eas build --platform ios --type ipa
```

### 3.2 Build de Produção

```bash
# Gerar IPA para App Store
eas build --platform ios --type app-store
```

### 3.3 Testar IPA

```bash
# Usar TestFlight para testes
# 1. Fazer upload do IPA no App Store Connect
# 2. Convidar testadores
# 3. Testar em dispositivos reais
```

## Fase 4: Publicar no Google Play Store

### 4.1 Criar Conta Developer

1. Ir para https://play.google.com/console
2. Pagar taxa de $25 USD
3. Preencher informações de conta

### 4.2 Criar Novo App

1. Clicar em "Create app"
2. Nome: "SwArifa Assistant"
3. Selecionar categoria: "Games"
4. Aceitar políticas

### 4.3 Preencher Informações

**Seção: App Details**
- Título: "SwArifa Assistant"
- Descrição: "Assistente de Summoners War com busca de counters, votação e compartilhamento"
- Categoria: Games
- Classificação: 12+ (PEGI)

**Seção: Graphics**
- Ícone: 512x512 px
- Screenshots: 4-8 screenshots (1080x1920 px)
- Banner: 1024x500 px
- Feature graphic: 1024x500 px

**Seção: Content Rating**
- Preencher questionário de conteúdo
- Obter classificação automática

### 4.4 Fazer Upload do AAB

1. Ir para "Release" → "Production"
2. Clicar em "Create new release"
3. Upload do arquivo AAB
4. Preencher Release notes em português

### 4.5 Revisar e Publicar

1. Revisar todas as informações
2. Clicar em "Review release"
3. Clicar em "Start rollout to Production"
4. Aguardar aprovação (24-48 horas)

## Fase 5: Publicar no Apple App Store

### 5.1 Criar Conta Developer

1. Ir para https://developer.apple.com
2. Pagar taxa de $99 USD/ano
3. Preencher informações de conta

### 5.2 Criar Certificados

```bash
# EAS gerará automaticamente
eas build --platform ios --type app-store
```

### 5.3 Criar App no App Store Connect

1. Ir para https://appstoreconnect.apple.com
2. Clicar em "My Apps"
3. Clicar em "+"
4. Selecionar "New App"
5. Preencher informações:
   - Nome: "SwArifa Assistant"
   - Bundle ID: "space.manus.sw.arifa.assistant"
   - SKU: "SWARIFA001"

### 5.4 Preencher Informações

**Seção: App Information**
- Categoria: Games
- Subcategoria: Strategy
- Classificação: 12+ (PEGI)

**Seção: Pricing and Availability**
- Preço: Grátis
- Disponibilidade: Todos os países

**Seção: Screenshots**
- iPhone 6.7": 1284x2778 px (2-5 screenshots)
- iPad Pro 12.9": 2048x2732 px (2-5 screenshots)
- Apple Watch: 312x390 px (opcional)

**Seção: App Preview**
- Vídeo de até 30 segundos (opcional)

**Seção: Description**
- Descrição: "Assistente de Summoners War com busca de counters, votação e compartilhamento"
- Palavras-chave: "summoners war, counter, strategy, gaming"

### 5.5 Fazer Upload do IPA

1. Abrir Xcode
2. Ir para "Window" → "Organizer"
3. Selecionar app
4. Clicar em "Distribute App"
5. Selecionar "App Store Connect"
6. Selecionar certificado
7. Fazer upload

### 5.6 Revisar e Enviar para Revisão

1. Ir para "App Store" → "Prepare for Submission"
2. Preencher informações de contato
3. Selecionar "Export Compliance" (não é necessário)
4. Clicar em "Submit for Review"
5. Aguardar aprovação (24-48 horas)

## Fase 6: Pós-Publicação

### 6.1 Monitorar Lançamento

- Google Play: Acompanhar em "Release management" → "Releases"
- App Store: Acompanhar em "App Store" → "Version Release"

### 6.2 Coletar Feedback

- Ler reviews e ratings
- Responder a comentários
- Corrigir bugs relatados

### 6.3 Planejar Atualizações

- Versão 1.1: Melhorias de UI/UX
- Versão 1.2: Novos filtros e busca avançada
- Versão 1.3: Integração com API real do swgt.io

## Troubleshooting

### APK não instala

```bash
# Verificar compatibilidade
adb shell getprop ro.build.version.sdk

# Aumentar minSdkVersion em app.config.ts se necessário
```

### Certificado iOS expirado

```bash
# Renovar certificado
eas credentials --platform ios --clear
eas build --platform ios --type app-store
```

### App rejeitado na App Store

Motivos comuns:
- Falta de política de privacidade
- Permissões não justificadas
- Bugs ou crashes
- Conteúdo inadequado

Solução:
1. Ler feedback da Apple
2. Corrigir problemas
3. Fazer novo build
4. Reenviar para revisão

## Checklist Final

- [ ] Versão incrementada em app.config.ts
- [ ] Todos os ícones e screenshots preparados
- [ ] Descrição e keywords em português
- [ ] Política de privacidade criada
- [ ] Termos de serviço criados
- [ ] Testes completos em dispositivos reais
- [ ] Build APK/AAB gerado e testado
- [ ] Build IPA gerado e testado
- [ ] Conta Google Play Developer criada
- [ ] Conta Apple Developer criada
- [ ] App criado no Google Play Console
- [ ] App criado no App Store Connect
- [ ] AAB enviado para Google Play
- [ ] IPA enviado para App Store
- [ ] Aguardando aprovação

## Contatos de Suporte

- Google Play: support.google.com/googleplay/android-developer
- Apple App Store: developer.apple.com/support
- Expo: docs.expo.dev/build
