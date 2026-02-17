# Guia: GitHub Actions CI/CD

Automação de testes, builds e releases para SwArifa Assistant.

## 🤖 O que é GitHub Actions?

GitHub Actions é um serviço de CI/CD (Continuous Integration/Continuous Deployment) que executa testes e builds automaticamente quando você faz push de código.

**Benefícios:**
- ✅ Testes automáticos em cada commit
- ✅ Detecção de erros antes de publicar
- ✅ Builds automáticos para releases
- ✅ Relatórios de cobertura de testes
- ✅ Notificações de sucesso/falha

## 📋 Workflows Configurados

### 1. CI Pipeline (`.github/workflows/ci.yml`)

Executa em cada push para `main` ou `develop`, e em pull requests.

**O que faz:**
- Testa em Node.js 18 e 20
- Executa linter (ESLint)
- Verifica tipos (TypeScript)
- Roda testes unitários
- Faz upload de cobertura para Codecov
- Verifica qualidade de código
- Executa npm audit para segurança

**Status:** ✅ Configurado

### 2. Release Workflow (`.github/workflows/release.yml`)

Executa quando você cria uma tag `v*` (ex: `v1.0.0`).

**O que faz:**
- Roda testes completos
- Faz build do projeto
- Cria release no GitHub
- Faz upload de artefatos
- Envia notificação

**Status:** ✅ Configurado

## 🚀 Como Usar

### Executar CI Pipeline Automaticamente

Simplesmente faça push para `main`:

```bash
git add .
git commit -m "feat: nova feature"
git push origin main
```

GitHub Actions executará automaticamente:
1. Testes
2. Linter
3. Type check
4. Build

### Ver Status dos Workflows

1. Ir para https://github.com/arifagb/SwArifa-Assistant
2. Clicar em "Actions"
3. Ver status dos workflows

### Criar Release Automática

```bash
# Criar tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Fazer push da tag
git push origin v1.0.0
```

GitHub Actions:
1. Executará todos os testes
2. Fará build do projeto
3. Criará release no GitHub
4. Fará upload de artefatos

## 📊 Monitorar Execução

### No GitHub

1. Ir para "Actions"
2. Clicar no workflow que está rodando
3. Ver logs em tempo real

### Badges no README

Adicione badges para mostrar status:

```markdown
![CI](https://github.com/arifagb/SwArifa-Assistant/workflows/CI%2FCD%20Pipeline/badge.svg)
![Tests](https://img.shields.io/badge/tests-36%20passed-brightgreen)
```

## 🔧 Configurar Secrets

Para funcionalidades avançadas, configure secrets:

1. Ir para "Settings" → "Secrets and variables" → "Actions"
2. Clicar em "New repository secret"
3. Adicionar:

| Secret | Valor | Uso |
|--------|-------|-----|
| `SNYK_TOKEN` | Token do Snyk | Verificação de segurança |
| `CODECOV_TOKEN` | Token do Codecov | Upload de cobertura |
| `EAS_TOKEN` | Token do EAS | Builds do Expo |

### Obter Tokens

**Snyk:**
1. Ir para https://snyk.io
2. Fazer login com GitHub
3. Ir para Settings → API Token
4. Copiar token

**Codecov:**
1. Ir para https://codecov.io
2. Fazer login com GitHub
3. Selecionar repositório
4. Copiar token

**EAS:**
1. Ir para https://expo.dev
2. Fazer login
3. Ir para Settings → API Tokens
4. Criar novo token

## 📈 Melhorias Futuras

### Adicionar Mais Workflows

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Seu script de deploy
```

### Adicionar Notificações

```yaml
# Notificar no Slack
- name: Notify Slack
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Build ${{ job.status }}"
      }
```

### Adicionar Análise de Código

```yaml
# CodeQL Analysis
- name: Initialize CodeQL
  uses: github/codeql-action/init@v2
  with:
    languages: 'javascript'

- name: Perform CodeQL Analysis
  uses: github/codeql-action/analyze@v2
```

## 🐛 Troubleshooting

### "Workflow failed"

1. Clicar no workflow que falhou
2. Ver logs detalhados
3. Procurar por erros (vermelho)
4. Corrigir no código local
5. Fazer push novamente

### "Tests failed"

```bash
# Rodar testes localmente
npm test

# Corrigir erros
# Fazer commit e push
git add .
git commit -m "fix: corrigir testes"
git push origin main
```

### "Build failed"

```bash
# Verificar build localmente
npm run build

# Se funcionar localmente, pode ser problema de ambiente
# Verificar logs do GitHub Actions
```

## 📚 Recursos

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Marketplace](https://github.com/marketplace?type=actions)

## ✅ Checklist

- [x] CI Pipeline configurado
- [x] Release Workflow configurado
- [x] Testes automáticos
- [x] Build automático
- [ ] Secrets configurados (opcional)
- [ ] Notificações configuradas (opcional)
- [ ] Deploy automático (opcional)

## 🎯 Próximas Etapas

1. **Fazer push para main** - Ativar CI Pipeline
2. **Criar primeira release** - Testar Release Workflow
3. **Adicionar secrets** - Para funcionalidades avançadas
4. **Configurar notificações** - Para Slack/Discord (opcional)

---

**GitHub Actions está pronto para automatizar seu workflow!** 🚀
