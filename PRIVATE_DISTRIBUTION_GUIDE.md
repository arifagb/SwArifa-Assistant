# Guia de Distribuição Privada - SwArifa Assistant

Instruções para compartilhar o SwArifa Assistant com amigos via Android e iOS sem publicar nas lojas.

## Para Android (APK)

### Opção 1: Compartilhar via Link (Recomendado)

**Passo 1: Gerar APK**

```bash
# Gerar APK de desenvolvimento
eas build --platform android --type apk

# Ou gerar localmente (sem EAS)
npx expo prebuild --clean
cd android && ./gradlew assembleRelease
```

**Passo 2: Fazer Upload do APK**

Você pode usar qualquer um desses serviços:

- **Google Drive** (Recomendado)
  1. Fazer upload do arquivo APK
  2. Clicar em "Compartilhar"
  3. Copiar o link
  4. Enviar para amigos

- **Firebase Hosting** (Gratuito)
  ```bash
  npm install -g firebase-tools
  firebase login
  firebase init hosting
  firebase deploy
  ```

- **GitHub Releases**
  1. Criar repositório no GitHub
  2. Fazer upload do APK em "Releases"
  3. Copiar link de download

**Passo 3: Amigos Baixam o APK**

1. Abrir o link no navegador do Android
2. Clicar em "Download"
3. Permitir instalação de fontes desconhecidas (Configurações → Segurança)
4. Abrir o arquivo APK baixado
5. Clicar em "Instalar"

### Opção 2: Compartilhar via Bluetooth/USB

**Passo 1: Conectar Dispositivo**

```bash
# Listar dispositivos conectados
adb devices

# Transferir APK via USB
adb push app.apk /sdcard/Download/
```

**Passo 2: Instalar no Dispositivo**

```bash
# Instalar via ADB
adb install app.apk

# Ou instalar manualmente
# Abrir Gerenciador de Arquivos → Downloads → app.apk → Instalar
```

### Opção 3: Usar Expo Go (Mais Rápido)

**Passo 1: Iniciar Dev Server**

```bash
cd /home/ubuntu/sw-assistant-app
npx expo start --tunnel
```

**Passo 2: Compartilhar QR Code**

1. Escanear QR code com câmera do Android
2. Abrir link no Expo Go
3. App carrega automaticamente

## Para iOS (IPA)

### Opção 1: TestFlight (Recomendado)

**Passo 1: Configurar App Store Connect**

1. Ir para https://appstoreconnect.apple.com
2. Criar novo app (mesmo sem publicar)
3. Gerar certificados de desenvolvimento

**Passo 2: Gerar IPA**

```bash
eas build --platform ios --type ipa
```

**Passo 3: Fazer Upload no TestFlight**

1. Abrir App Store Connect
2. Ir para "TestFlight"
3. Fazer upload do IPA
4. Adicionar testadores (emails dos amigos)
5. Enviar convites

**Passo 4: Amigos Aceitam Convite**

1. Receber email de convite do TestFlight
2. Clicar em "View in TestFlight"
3. Clicar em "Accept"
4. Abrir App Store → Abas → TestFlight
5. Clicar em "Instalar"

### Opção 2: Compartilhar via iCloud

**Passo 1: Gerar IPA**

```bash
eas build --platform ios --type ipa
```

**Passo 2: Fazer Upload no iCloud**

1. Abrir iCloud.com
2. Fazer upload do IPA
3. Compartilhar link com amigos

**Passo 3: Amigos Baixam**

1. Abrir link no iPhone
2. Clicar em "Download"
3. Abrir em "Arquivos"
4. Clicar em "Instalar"

### Opção 3: Usar Expo Go (Mais Rápido)

**Passo 1: Iniciar Dev Server**

```bash
cd /home/ubuntu/sw-assistant-app
npx expo start --tunnel
```

**Passo 2: Compartilhar QR Code**

1. Abrir Expo Go no iPhone
2. Escanear QR code
3. App carrega automaticamente

## Comparação de Métodos

| Método | Android | iOS | Facilidade | Velocidade |
|--------|---------|-----|-----------|-----------|
| **Expo Go** | ✅ | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Google Drive** | ✅ | ❌ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **TestFlight** | ❌ | ✅ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **APK Direto** | ✅ | ❌ | ⭐⭐⭐ | ⭐⭐⭐ |
| **GitHub Releases** | ✅ | ❌ | ⭐⭐⭐ | ⭐⭐ |

## Recomendação: Usar Expo Go

A forma mais rápida e fácil é usar **Expo Go**:

### Para Você e Seus Amigos

**Passo 1: Você inicia o servidor**

```bash
cd /home/ubuntu/sw-assistant-app
npx expo start --tunnel
```

**Passo 2: Compartilhar QR Code**

1. Escanear QR code com câmera (Android) ou Expo Go (iOS)
2. App abre automaticamente
3. Pronto para usar!

**Vantagens:**
- ✅ Sem precisar gerar APK/IPA
- ✅ Sem precisar de certificados
- ✅ Atualiza automaticamente quando você faz mudanças
- ✅ Funciona em Android e iOS
- ✅ Gratuito

**Desvantagens:**
- ❌ Precisa manter servidor rodando
- ❌ Requer internet para conectar
- ❌ Mais lento que app nativo

## Atualizar App Compartilhado

### Se Usar Expo Go

Simples! Basta fazer mudanças no código e salvar. O app atualiza automaticamente nos dispositivos dos amigos.

### Se Usar APK/IPA

Você precisa:

1. Fazer mudanças no código
2. Gerar novo APK/IPA
3. Fazer upload em Google Drive/TestFlight
4. Amigos baixam nova versão
5. Desinstalam versão antiga
6. Instalam nova versão

## Troubleshooting

### Android: "Instalação bloqueada"

**Solução:**
1. Ir para Configurações → Segurança
2. Ativar "Fontes desconhecidas"
3. Tentar instalar novamente

### iOS: "Não é possível instalar"

**Solução:**
1. Usar TestFlight (recomendado)
2. Ou usar Expo Go
3. APK direto não funciona em iOS

### Expo Go: "Falha ao conectar"

**Solução:**
1. Verificar se estão na mesma rede WiFi
2. Ou usar `--tunnel` para internet pública
3. Verificar firewall

## Próximas Etapas

1. **Escolher método** (recomendo Expo Go)
2. **Testar com um amigo** antes de compartilhar com todos
3. **Coletar feedback** e fazer melhorias
4. **Publicar nas lojas** quando estiver pronto

## Suporte

Se tiver dúvidas:
- Expo Docs: https://docs.expo.dev
- EAS Build: https://docs.expo.dev/build
- TestFlight: https://developer.apple.com/testflight
