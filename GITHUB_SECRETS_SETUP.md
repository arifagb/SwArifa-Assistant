# Guia: Configurar Secrets do GitHub para CI/CD

Instruções para configurar tokens e secrets que permitem análise de segurança, cobertura de testes e builds automáticos.

## 🔐 O que são Secrets?

Secrets são variáveis confidenciais armazenadas de forma segura no GitHub. Eles são usados pelos workflows do GitHub Actions para:

- Autenticar com serviços externos
- Fazer builds automáticos
- Enviar relatórios de segurança
- Fazer upload de artefatos

## 🚀 Passo 1: Acessar Secrets no GitHub

1. Ir para seu repositório: https://github.com/arifagb/SwArifa-Assistant
2. Clicar em "Settings" (engrenagem no topo)
3. No menu lateral, clicar em "Secrets and variables" → "Actions"
4. Clicar em "New repository secret"

## 📋 Secrets Recomendados

### 1. SNYK_TOKEN (Análise de Segurança)

**O que faz:** Verifica vulnerabilidades em dependências

**Como obter:**

1. Ir para https://snyk.io
2. Clicar em "Sign up" → "GitHub"
3. Fazer login com sua conta GitHub
4. Ir para Settings (engrenagem) → "API Token"
5. Copiar o token

**Como adicionar:**

1. No GitHub, clicar em "New repository secret"
2. **Name**: `SNYK_TOKEN`
3. **Value**: Colar o token do Snyk
4. Clicar em "Add secret"

### 2. CODECOV_TOKEN (Cobertura de Testes)

**O que faz:** Rastreia cobertura de testes e gera relatórios

**Como obter:**

1. Ir para https://codecov.io
2. Clicar em "Sign up" → "GitHub"
3. Fazer login com sua conta GitHub
4. Selecionar seu repositório
5. Ir para Settings → "Repository upload token"
6. Copiar o token

**Como adicionar:**

1. No GitHub, clicar em "New repository secret"
2. **Name**: `CODECOV_TOKEN`
3. **Value**: Colar o token do Codecov
4. Clicar em "Add secret"

### 3. EAS_TOKEN (Builds do Expo - Opcional)

**O que faz:** Permite builds automáticos de APK/IPA

**Como obter:**

1. Ir para https://expo.dev
2. Fazer login ou criar conta
3. Ir para Settings (engrenagem) → "API Tokens"
4. Clicar em "Create token"
5. Nomear como "GitHub Actions"
6. Copiar o token

**Como adicionar:**

1. No GitHub, clicar em "New repository secret"
2. **Name**: `EAS_TOKEN`
3. **Value**: Colar o token do EAS
4. Clicar em "Add secret"

## ✅ Verificar Secrets Adicionados

1. Ir para Settings → Secrets and variables → Actions
2. Você deve ver os secrets listados (sem os valores visíveis)
3. Exemplo:
   ```
   ✓ SNYK_TOKEN
   ✓ CODECOV_TOKEN
   ✓ EAS_TOKEN
   ```

## 🔄 Como os Workflows Usam os Secrets

### CI Pipeline (`.github/workflows/ci.yml`)

```yaml
- name: Run npm audit
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  run: npm audit --audit-level=moderate
```

### Upload de Cobertura

```yaml
- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
```

## 🧪 Testar Secrets

### Verificar se SNYK_TOKEN Funciona

```bash
# Instalar Snyk CLI
npm install -g snyk

# Fazer login
snyk auth <seu-token>

# Testar
snyk test
```

### Verificar se CODECOV_TOKEN Funciona

```bash
# Fazer upload de cobertura
npm test -- --coverage

# Codecov fará upload automaticamente via GitHub Actions
```

## 🐛 Troubleshooting

### "Secret not found"

- Verificar se o nome está correto (case-sensitive)
- Verificar se foi adicionado na branch correta
- Fazer push novamente

### "Invalid token"

- Copiar token novamente (pode ter expirado)
- Gerar novo token no serviço
- Atualizar secret no GitHub

### "Workflow failed with secret error"

1. Ir para Actions → workflow que falhou
2. Ver logs detalhados
3. Procurar por erro de autenticação
4. Verificar se secret foi adicionado corretamente

## 📊 Monitorar Análises

### Snyk Security

1. Ir para https://app.snyk.io
2. Selecionar seu repositório
3. Ver vulnerabilidades encontradas
4. Clicar em vulnerabilidade para ver detalhes

### Codecov Coverage

1. Ir para https://codecov.io
2. Selecionar seu repositório
3. Ver gráfico de cobertura
4. Clicar em commit para ver detalhes

## 🔄 Rotação de Tokens

**Recomendado:** Rotacionar tokens a cada 6 meses

1. Gerar novo token no serviço
2. Atualizar secret no GitHub
3. Testar workflow
4. Revogar token antigo

## 📚 Recursos

- [GitHub Secrets Docs](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Snyk Docs](https://docs.snyk.io)
- [Codecov Docs](https://docs.codecov.io)
- [EAS Build Docs](https://docs.expo.dev/eas-update/introduction/)

## ✅ Checklist

- [ ] Criar conta Snyk
- [ ] Gerar SNYK_TOKEN
- [ ] Adicionar SNYK_TOKEN no GitHub
- [ ] Criar conta Codecov
- [ ] Gerar CODECOV_TOKEN
- [ ] Adicionar CODECOV_TOKEN no GitHub
- [ ] (Opcional) Gerar EAS_TOKEN
- [ ] (Opcional) Adicionar EAS_TOKEN no GitHub
- [ ] Fazer push para main
- [ ] Verificar se workflows rodaram com sucesso
- [ ] Verificar relatórios no Snyk e Codecov

## 🎯 Próximas Etapas

1. **Adicionar Secrets** - Seguir os passos acima
2. **Fazer Push** - Fazer commit e push para main
3. **Monitorar Workflows** - Ir para Actions e ver execução
4. **Revisar Relatórios** - Verificar segurança e cobertura
5. **Corrigir Problemas** - Resolver vulnerabilidades e aumentar cobertura

## 💡 Dicas

- **Comece com SNYK_TOKEN** - É o mais importante para segurança
- **Adicione CODECOV_TOKEN depois** - Para rastrear cobertura de testes
- **EAS_TOKEN é opcional** - Só se quiser builds automáticos de APK/IPA
- **Guarde tokens em lugar seguro** - Nunca compartilhe ou commite no Git
- **Revise secrets regularmente** - Remova tokens não usados

---

**Seus secrets estão configurados!** 🔐

Agora seus workflows rodarão com análise de segurança e cobertura de testes automáticas.
