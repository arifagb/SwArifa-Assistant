# Guia: Testando SwArifa Assistant com Seus Amigos

Instruções práticas para testar o app com seus amigos e coletar feedback.

## 🎯 Objetivo

Validar que o app funciona bem em dispositivos reais, coletar feedback de usuários e identificar bugs antes de publicar nas lojas.

## 👥 Convite para Amigos

### Mensagem de Convite

Copie e envie via WhatsApp/Telegram:

```
🎮 Oi! Criei um app para ajudar no Summoners War!

Chama-se SwArifa Assistant e ajuda a encontrar os melhores counters para suas defesas de War, Siege Lab e ataques.

Quer testar comigo? É super rápido:

1. Baixa o app "Expo Go" na loja
2. Escaneia o QR code que vou enviar
3. Pronto! O app abre automaticamente

Seu feedback é muito importante! 🙏
```

## 🚀 Passo 1: Preparar o App

### No Seu Computador

```bash
# Navegar para o projeto
cd SwArifa-Assistant

# Instalar dependências (primeira vez)
npm install

# Iniciar servidor com tunnel
npx expo start --tunnel
```

### Resultado Esperado

```
✓ Tunnel ready
✓ Expo server running

Scan this QR code with Expo Go:
[QR CODE AQUI]

Press 'w' to open web
Press 'r' to reload
Press 'q' to quit
```

## 📱 Passo 2: Seus Amigos Testam

### Android

1. Abrir câmera
2. Apontar para o QR code
3. Clicar na notificação que aparece
4. Expo Go abre automaticamente
5. App carrega em 5-10 segundos

### iOS

1. Abrir Expo Go
2. Clicar no botão "Scan QR Code"
3. Apontar para o QR code
4. App carrega em 5-10 segundos

## 📋 Teste Estruturado

### Sessão 1: Exploração Livre (5 minutos)

Deixe seu amigo explorar o app livremente:

- Clicar em botões
- Navegar entre telas
- Testar busca
- Ver resultados

**Observar:**
- Algo quebrou?
- Ficou confuso em alguma tela?
- Interface é intuitiva?

### Sessão 2: Tarefas Específicas (10 minutos)

Peça para fazer tarefas:

1. **Buscar por 3 monstros**
   - Digite: "Susano", "Garo", "Orion"
   - Clique em "Buscar"
   - Veja os resultados

2. **Filtrar por elemento**
   - Clique em "Água"
   - Veja monstros filtrados

3. **Votar em um counter**
   - Clique em um resultado
   - Clique em 👍 ou 👎

4. **Compartilhar composição**
   - Clique em "Compartilhar"
   - Escolha "Copiar" ou "Nativo"

5. **Salvar favorito**
   - Clique em ⭐ para favoritar
   - Vá para "Catálogo"
   - Veja favorito salvo

## 📝 Formulário de Feedback

Após o teste, peça para responder:

```
FEEDBACK - SwArifa Assistant

1. Interface e Design
   [ ] Muito bonito
   [ ] Bonito
   [ ] Normal
   [ ] Poderia melhorar

2. Facilidade de Uso
   [ ] Muito fácil
   [ ] Fácil
   [ ] Normal
   [ ] Difícil

3. Velocidade
   [ ] Muito rápido
   [ ] Rápido
   [ ] Normal
   [ ] Lento

4. Funcionalidades Principais
   [ ] Busca por monstros: Funciona?
   [ ] Filtro por elemento: Funciona?
   [ ] Votação: Funciona?
   [ ] Compartilhamento: Funciona?
   [ ] Favoritos: Funciona?

5. Bugs Encontrados
   - Descrição: ___________
   - Onde: ___________
   - Como reproduzir: ___________

6. Sugestões de Melhorias
   - ___________
   - ___________
   - ___________

7. Recomendaria para outros?
   [ ] Sim, com certeza!
   [ ] Sim, mas com melhorias
   [ ] Talvez
   [ ] Não
```

## 🔄 Iterar com Feedback

### Bugs Encontrados

1. Anote o bug com detalhes
2. Reproduza localmente
3. Corrija o código
4. Faça commit: `git commit -m "fix: descrição do bug"`
5. Seus amigos veem a mudança ao recarregar (pressionar 'r')

### Sugestões de Melhorias

1. Agrupe sugestões similares
2. Priorize por importância
3. Implemente as principais
4. Compartilhe progresso com amigos

## 📊 Métricas de Teste

Rastreie:

| Métrica | Como Medir |
|---------|-----------|
| **Bugs Encontrados** | Contar relatórios |
| **Tempo Médio de Teste** | Cronômetro |
| **Taxa de Sucesso** | % de tarefas completadas |
| **NPS (Net Promoter Score)** | Pergunta: "Recomendaria?" |
| **Satisfação** | Média das respostas |

## 🎯 Metas de Teste

- [ ] Testar com pelo menos 3 amigos
- [ ] Cada teste dura 15-20 minutos
- [ ] Coletar feedback estruturado
- [ ] Encontrar e corrigir bugs críticos
- [ ] Implementar top 3 sugestões

## 🚀 Próximas Etapas

Após testes com amigos:

1. **Compilar Feedback** - Organize todos os comentários
2. **Priorizar Melhorias** - O que é mais importante?
3. **Implementar Mudanças** - Corrija bugs, adicione features
4. **Testar Novamente** - Valide as mudanças
5. **Publicar** - Quando estiver satisfeito, publique nas lojas

## 💡 Dicas

- **Teste em WiFi** - Mais rápido que dados móveis
- **Teste em múltiplos dispositivos** - Android e iOS podem ter diferenças
- **Teste em diferentes versões** - Android 10+, iOS 14+
- **Teste com diferentes conexões** - WiFi, 4G, 5G
- **Teste em diferentes horários** - Manhã, tarde, noite

## 📞 Suporte

Se seus amigos tiverem problemas:

1. Verificar conexão com internet
2. Atualizar Expo Go
3. Reiniciar o dispositivo
4. Recarregar o app (shake → Reload)
5. Se persistir, criar issue no GitHub

## 📈 Exemplo de Sessão de Teste

```
Amigo: João
Data: 17/02/2026
Tempo: 18 minutos

Exploração Livre:
- Clicou em vários botões
- Navegou entre telas
- Achou a interface intuitiva

Tarefas:
✅ Buscar por monstros
✅ Filtrar por elemento
✅ Votar em counter
✅ Compartilhar composição
✅ Salvar favorito

Bugs:
- Nenhum encontrado

Feedback:
- Interface muito bonita
- Fácil de usar
- Gostaria de mais monstros
- Recomendaria? SIM!

NPS: 9/10
```

---

**Pronto para testar com seus amigos!** 🎮

Lembre-se: feedback é ouro! Use-o para melhorar o app.
