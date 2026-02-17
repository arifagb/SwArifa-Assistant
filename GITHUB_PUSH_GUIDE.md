# Guia: Como Fazer Push para GitHub

Instruções para enviar o SwArifa Assistant para seu repositório GitHub.

## Pré-requisitos

1. Ter uma conta no GitHub
2. Ter criado o repositório `SwArifa-Assistant` em https://github.com/arifagb/SwArifa-Assistant
3. Ter Git instalado no seu computador
4. Ter um token de acesso pessoal (PAT) do GitHub

## Passo 1: Criar Token de Acesso Pessoal

1. Ir para https://github.com/settings/tokens
2. Clicar em "Generate new token" → "Generate new token (classic)"
3. Preencher:
   - **Note**: "SwArifa Assistant Push"
   - **Expiration**: "90 days" (ou mais)
   - **Scopes**: Selecionar `repo` (acesso completo a repositórios)
4. Clicar em "Generate token"
5. **Copiar o token** (você não poderá ver novamente)

## Passo 2: Clonar o Repositório

```bash
# Clone seu repositório vazio
git clone https://github.com/arifagb/SwArifa-Assistant.git
cd SwArifa-Assistant
```

## Passo 3: Copiar Arquivos do Projeto

```bash
# Copiar todos os arquivos do projeto para o repositório
cp -r /home/ubuntu/sw-assistant-app/* .
cp -r /home/ubuntu/sw-assistant-app/.gitignore .

# Verificar arquivos copiados
ls -la
```

## Passo 4: Fazer Commit e Push

```bash
# Configurar Git (primeira vez apenas)
git config user.name "Seu Nome"
git config user.email "seu.email@example.com"

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit: SwArifa Assistant v7 - Assistente de Summoners War com filtros, notificações e overlay"

# Fazer push para main
git push -u origin main
```

**Quando pedir autenticação:**
- **Username**: seu usuário do GitHub
- **Password**: Cole o token que você copiou no Passo 1

## Passo 5: Verificar no GitHub

1. Ir para https://github.com/arifagb/SwArifa-Assistant
2. Verificar se todos os arquivos estão lá
3. Clicar em "Code" para copiar o link HTTPS

## Atualizar Repositório Depois

Sempre que fizer mudanças:

```bash
cd /path/to/SwArifa-Assistant
git add .
git commit -m "Descrição das mudanças"
git push
```

## Troubleshooting

### "fatal: not a git repository"

```bash
# Você precisa estar dentro do repositório clonado
cd /path/to/SwArifa-Assistant
```

### "Permission denied (publickey)"

```bash
# Usar HTTPS em vez de SSH
git remote set-url origin https://github.com/arifagb/SwArifa-Assistant.git
```

### "remote: Invalid username or password"

```bash
# Seu token expirou, gere um novo em https://github.com/settings/tokens
```

### "Updates were rejected because the tip of your current branch is behind"

```bash
# Puxar mudanças antes de fazer push
git pull origin main
git push origin main
```

## Estrutura do Repositório

```
SwArifa-Assistant/
├── app/                          # Telas e rotas
│   ├── (tabs)/
│   │   ├── index.tsx            # Home screen com filtros
│   │   ├── catalog.tsx          # Catálogo de favoritos
│   │   └── settings.tsx         # Configurações
│   ├── auth-screen.tsx          # Tela de autenticação
│   └── search-results.tsx       # Resultados da busca
├── components/                   # Componentes reutilizáveis
│   ├── app-cover.tsx            # Capa do app
│   ├── element-filter.tsx       # Filtro por elemento
│   ├── counter-vote.tsx         # Votação em counters
│   ├── share-buttons.tsx        # Botões de compartilhamento
│   ├── floating-overlay.tsx     # Overlay flutuante
│   └── ...
├── lib/                          # Lógica e utilitários
│   ├── swgt-real-api.ts         # API real do swgt.io
│   ├── auth-service.ts          # Autenticação
│   ├── firebase-analytics.ts    # Analytics
│   ├── push-notifications-service.ts
│   └── ...
├── hooks/                        # Custom hooks
│   ├── use-social-auth.ts       # Autenticação social
│   ├── use-analytics.ts         # Analytics
│   ├── use-push-notifications.ts
│   └── ...
├── assets/                       # Imagens e ícones
│   ├── images/
│   │   ├── icon.png             # Ícone do app
│   │   ├── cover-new.png        # Capa melhorada
│   │   └── ...
├── app.config.ts                # Configuração do Expo
├── theme.config.js              # Tema e cores
├── tailwind.config.js           # Configuração Tailwind
├── package.json                 # Dependências
├── PRIVATE_DISTRIBUTION_GUIDE.md # Como compartilhar com amigos
├── STORE_PUBLISHING_GUIDE.md    # Como publicar nas lojas
└── README.md                    # Documentação
```

## Próximas Etapas

1. **Adicionar README.md** - Documentação do projeto
2. **Adicionar LICENSE** - Licença do projeto (MIT recomendado)
3. **Configurar GitHub Actions** - CI/CD automático
4. **Adicionar Issues e Discussions** - Para feedback dos usuários

## Suporte

Se tiver dúvidas sobre Git/GitHub:
- Git Docs: https://git-scm.com/doc
- GitHub Docs: https://docs.github.com
- GitHub CLI: https://cli.github.com
