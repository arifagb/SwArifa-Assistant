# Guia: Testar SwArifa Assistant com Amigos via Expo Go

Instruções simples para compartilhar o app com seus amigos usando Expo Go - sem precisar gerar APK ou IPA!

## 🚀 Pré-requisitos

### No Seu Computador
- Node.js 18+ instalado
- Expo CLI: `npm install -g expo-cli`
- SwArifa Assistant clonado: `git clone https://github.com/arifagb/SwArifa-Assistant.git`

### Nos Dispositivos dos Seus Amigos
- **Android**: Aplicativo Expo Go (baixar na Google Play)
- **iOS**: Aplicativo Expo Go (baixar na App Store)
- Conexão com internet

## 📱 Passo 1: Instalar Expo Go nos Amigos

### Android
1. Abrir Google Play Store
2. Pesquisar "Expo Go"
3. Clicar em "Instalar"
4. Aguardar conclusão

### iOS
1. Abrir App Store
2. Pesquisar "Expo Go"
3. Clicar em "Obter"
4. Confirmar com Face ID/Touch ID
5. Aguardar conclusão

## 🔧 Passo 2: Iniciar Dev Server com Tunnel

O "tunnel" permite que seus amigos acessem o app pela internet, sem precisar estar na mesma rede WiFi.

```bash
# Navegar para o diretório do projeto
cd SwArifa-Assistant

# Instalar dependências (primeira vez apenas)
npm install

# Iniciar servidor com tunnel
npx expo start --tunnel
```

**Saída esperada:**
```
Starting Expo server...
✓ Tunnel ready
✓ Expo server running

Press 'w' to open web
Press 'a' to open Android
Press 'i' to open iOS
Press 'j' to open debugger
Press 'r' to reload
Press 'q' to quit
```

## 📲 Passo 3: Compartilhar QR Code com Amigos

### Opção A: QR Code no Terminal

1. No terminal, você verá um **QR code grande**
2. Seus amigos podem:
   - **Android**: Abrir câmera → escanear QR code → clicar no link
   - **iOS**: Abrir Expo Go → clicar em "Scan QR Code" → escanear

### Opção B: Link Direto

1. No terminal, copie o link que aparece (ex: `exp://...`)
2. Envie para seus amigos via WhatsApp, Telegram, etc.
3. Eles clicam no link → abre automaticamente no Expo Go

### Opção C: QR Code em Imagem

```bash
# Gerar QR code como imagem
npx expo start --tunnel --qr-code

# Salvar QR code
# Abrir a URL que aparece no navegador
# Clicar com botão direito → Salvar imagem
# Enviar para amigos
```

## ⚙️ Passo 4: Seus Amigos Testam o App

### Android
1. Abrir câmera
2. Apontar para o QR code
3. Clicar na notificação que aparece
4. Expo Go abre automaticamente
5. App carrega em segundos

### iOS
1. Abrir Expo Go
2. Clicar no botão "Scan QR Code" (câmera)
3. Apontar para o QR code
4. App carrega em segundos

## 🔄 Passo 5: Recarregar Mudanças

Se você fizer mudanças no código e quiser que seus amigos vejam:

### Opção A: Recarregar Automático
```bash
# No terminal, pressione 'r'
r
```

Todos os amigos verão a mudança automaticamente!

### Opção B: Recarregar Manual
Seus amigos podem:
- **Android**: Shake no dispositivo → "Reload"
- **iOS**: Shake no dispositivo → "Reload"

## 🐛 Troubleshooting

### "QR Code não funciona"

```bash
# Verificar se o tunnel está ativo
npx expo start --tunnel --verbose

# Se não funcionar, tente sem tunnel (mesma rede WiFi)
npx expo start
```

### "Expo Go não abre"

- Verificar se Expo Go está instalado
- Atualizar Expo Go para a versão mais recente
- Reiniciar o dispositivo

### "App carrega lentamente"

- Verificar conexão com internet
- Fechar outros apps
- Reiniciar o dev server: `Ctrl+C` → `npx expo start --tunnel`

### "Mudanças não aparecem"

- Pressione 'r' no terminal para recarregar
- Ou shake no dispositivo → "Reload"
- Se ainda não funcionar, feche e reabra o app

### "Erro de conexão"

```bash
# Verificar se o servidor está rodando
npx expo start --tunnel

# Se erro persistir, tente sem tunnel
npx expo start

# Seus amigos precisam estar na mesma rede WiFi
# Compartilhe o IP do seu computador
```

## 📊 Monitorar Testes

### Ver Logs do App

```bash
# No terminal, pressione 'j' para abrir debugger
j

# Ou veja logs em tempo real:
npx expo start --tunnel --verbose
```

### Coletar Feedback

Crie um formulário para seus amigos:

```
1. O app funcionou?
2. Qual é sua opinião sobre a interface?
3. Encontrou algum bug?
4. Que feature você gostaria de ver?
5. Recomendaria para outros jogadores?
```

## 🎯 Dicas para Melhor Experiência

1. **Teste em WiFi** - Tunnel é mais rápido que dados móveis
2. **Avise sobre mudanças** - Comunique quando vai fazer updates
3. **Peça feedback específico** - "O que você achou da busca por elemento?"
4. **Teste em múltiplos dispositivos** - Android e iOS podem ter diferenças
5. **Documente bugs** - Peça para seus amigos descreverem o problema

## 🚀 Próximas Etapas

Quando estiver satisfeito com os testes:

1. **Gerar APK** - Para distribuição permanente no Android
   ```bash
   eas build --platform android --type apk
   ```

2. **Gerar IPA** - Para distribuição via TestFlight no iOS
   ```bash
   eas build --platform ios --type ipa
   ```

3. **Publicar nas Lojas** - Quando pronto para público
   - Veja [STORE_PUBLISHING_GUIDE.md](STORE_PUBLISHING_GUIDE.md)

## 📚 Recursos Adicionais

- **Expo Docs**: https://docs.expo.dev
- **Expo Go**: https://expo.dev/go
- **Tunnel Docs**: https://docs.expo.dev/build/internal-distribution/

## 💡 Exemplo Completo

```bash
# 1. Clonar repositório
git clone https://github.com/arifagb/SwArifa-Assistant.git
cd SwArifa-Assistant

# 2. Instalar dependências
npm install

# 3. Iniciar servidor
npx expo start --tunnel

# 4. Compartilhar QR code com amigos
# (Eles escanear com câmera ou Expo Go)

# 5. Fazer mudanças no código
# (Editar app/(tabs)/index.tsx, por exemplo)

# 6. Recarregar no terminal
# (Pressionar 'r')

# 7. Seus amigos veem a mudança automaticamente!
```

---

**Pronto para testar com seus amigos? Comece agora!** 🎮
