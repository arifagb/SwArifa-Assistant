# Guia de Distribuição - SwArifa Assistant (Android)

## 📱 Informações do Build

- **App**: SwArifa Assistant
- **Versão**: 1.0.0
- **Build ID**: 2d928f3c-3a9a-4469-bdb5-fa2146cac2b3
- **Plataforma**: Android
- **Tipo**: APK (Preview)
- **Link de Download**: https://expo.dev/artifacts/eas/6CoS7MhSmbAQXtjcviAuqk.aab

---

## 🚀 Como Instalar o APK

### Opção 1: Instalação Direta (Recomendado para Testes)

1. **Baixe o arquivo AAB/APK**
   - Acesse: https://expo.dev/accounts/arifagb/projects/sw-arifa-assistant/builds
   - Clique no build mais recente
   - Clique em "Download" para baixar o arquivo

2. **Transfira para seu Android**
   - Conecte seu telefone ao computador via USB
   - Copie o arquivo APK para a pasta `Downloads` do telefone
   - OU use um serviço de nuvem (Google Drive, OneDrive, etc.)

3. **Instale o APK**
   - Abra o gerenciador de arquivos no seu Android
   - Navegue até o arquivo APK
   - Toque no arquivo para instalar
   - Clique em "Instalar" quando solicitado
   - Aguarde a conclusão da instalação

### Opção 2: Instalação via Google Drive

1. **Faça upload do APK para Google Drive**
   - Acesse https://drive.google.com
   - Clique em "Novo" → "Upload de arquivo"
   - Selecione o arquivo APK
   - Aguarde o upload

2. **Compartilhe o link**
   - Clique com botão direito no arquivo
   - Selecione "Compartilhar"
   - Configure para "Qualquer pessoa com o link pode acessar"
   - Copie o link

3. **Instale no Android**
   - Abra o link no navegador do seu Android
   - Clique em "Download"
   - Abra o arquivo baixado
   - Clique em "Instalar"

### Opção 3: Instalação via GitHub Releases

1. **Crie uma Release no GitHub**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Faça upload do APK**
   - Vá para: https://github.com/arifagb/SwArifa-Assistant/releases
   - Clique em "Create a new release"
   - Selecione a tag v1.0.0
   - Faça upload do arquivo APK
   - Publique a release

3. **Compartilhe o link**
   - Copie o link da release
   - Envie para seus amigos

---

## ⚙️ Requisitos do Sistema

- **Android**: 5.0 ou superior
- **Espaço em disco**: ~100 MB
- **RAM**: 2 GB mínimo (4 GB recomendado)
- **Permissões**: Notificações, Câmera (para overlay), Acesso à internet

---

## 🔧 Solução de Problemas

### "Não consigo instalar o APK"

**Erro: "App não instalado"**
- Verifique se você tem espaço suficiente no telefone
- Tente desinstalar a versão anterior se existir
- Reinicie o telefone e tente novamente

**Erro: "Origem desconhecida"**
- Vá para Configurações → Segurança
- Ative "Fontes desconhecidas" ou "Instalar aplicativos desconhecidos"
- Tente instalar novamente

**Erro: "Versão incompatível"**
- Verifique se seu Android é 5.0 ou superior
- Vá para Configurações → Sobre o telefone → Versão do Android
- Se for inferior, você não pode instalar este app

### "O app não abre após instalar"

- Tente fechar completamente o app (Configurações → Apps → SwArifa Assistant → Forçar parada)
- Limpe o cache (Configurações → Apps → SwArifa Assistant → Armazenamento → Limpar cache)
- Desinstale e reinstale o app

### "Permissões não funcionam"

- Vá para Configurações → Apps → SwArifa Assistant → Permissões
- Ative as permissões necessárias:
  - **Notificações**: Para receber atualizações
  - **Câmera**: Para modo overlay
  - **Internet**: Para buscar dados do swgt.io

---

## 📤 Como Compartilhar com Amigos

### Via WhatsApp/Telegram

1. Faça upload do APK para Google Drive
2. Copie o link compartilhável
3. Envie a mensagem:
   ```
   Oi! Baixe o SwArifa Assistant (app para Summoners War):
   [Link do Google Drive]
   
   Instruções de instalação:
   1. Clique no link
   2. Clique em Download
   3. Abra o arquivo baixado
   4. Clique em Instalar
   ```

### Via Email

1. Anexe o arquivo APK (se for menor que 25 MB)
2. OU compartilhe o link do Google Drive
3. Inclua as instruções de instalação

### Via GitHub

1. Compartilhe o link da release:
   ```
   https://github.com/arifagb/SwArifa-Assistant/releases/tag/v1.0.0
   ```

---

## 🔐 Segurança

- O app foi compilado com certificado de segurança gerado pelo Expo
- Todas as conexões com swgt.io usam HTTPS
- Dados locais são armazenados com segurança no AsyncStorage
- Nenhum dado pessoal é coletado ou compartilhado

---

## 📊 Estatísticas do Build

- **Tamanho do APK**: ~80-120 MB
- **Tempo de instalação**: ~2-5 minutos
- **Tempo de primeiro uso**: ~10-30 segundos
- **Consumo de RAM**: ~50-100 MB
- **Consumo de bateria**: Baixo (exceto modo overlay ativo)

---

## 🎯 Próximos Passos

1. **Testar em dispositivos reais**
   - Teste em diferentes versões do Android
   - Teste em diferentes tamanhos de tela
   - Teste com conexão lenta

2. **Coletar feedback**
   - Peça feedback dos amigos
   - Registre bugs e sugestões

3. **Publicar na Google Play Store** (opcional)
   - Crie uma conta de desenvolvedor Google Play
   - Siga o guia de publicação
   - Publique a versão 1.0.0

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique este guia
2. Consulte a seção de Solução de Problemas
3. Abra uma issue no GitHub: https://github.com/arifagb/SwArifa-Assistant/issues
4. Entre em contato via email ou WhatsApp

---

## 📝 Changelog

### v1.0.0
- ✅ Integração com swgt.io
- ✅ Modo overlay para Android
- ✅ Notificações push
- ✅ Autenticação social (Google/Apple)
- ✅ Filtros por elemento
- ✅ Compartilhamento de estratégias
- ✅ Firebase Analytics

---

**Última atualização**: 19 de Fevereiro de 2026
**Desenvolvedor**: arifagb
**Repositório**: https://github.com/arifagb/SwArifa-Assistant
