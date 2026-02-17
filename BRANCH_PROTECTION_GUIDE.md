# Guia: Configurar Proteção de Branch no GitHub

Instruções para configurar proteção de branch e exigir PRs + testes antes de mergear na main.

## 🎯 O que é Proteção de Branch?

Proteção de branch é um recurso do GitHub que permite:

- ✅ Exigir pull requests para mudanças
- ✅ Exigir aprovações antes de mergear
- ✅ Exigir testes passando (status checks)
- ✅ Exigir código atualizado com main
- ✅ Descartar PRs obsoletas automaticamente
- ✅ Exigir assinatura de commits

**Benefícios:**
- Previne bugs em produção
- Garante qualidade de código
- Documenta mudanças via PRs
- Rastreia histórico de decisões

## 🚀 Passo 1: Acessar Configurações de Branch

1. Ir para seu repositório: https://github.com/arifagb/SwArifa-Assistant
2. Clicar em "Settings" (engrenagem no topo)
3. No menu lateral, clicar em "Branches"
4. Clicar em "Add rule" (ou editar regra existente)

## 📋 Configurar Regra de Proteção

### 1. Nome do Branch

**Branch name pattern:** `main`

Isto protegerá a branch main.

### 2. Exigir Pull Requests

✅ **Require a pull request before merging**

- ✅ Require approvals
  - **Number of required approvals:** 1
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from code owners

### 3. Exigir Testes Passando

✅ **Require status checks to pass before merging**

- ✅ Require branches to be up to date before merging
- **Status checks that are required:**
  - `CI / test` (testes)
  - `CI / build-web` (build web)
  - `CI / code-quality` (qualidade de código)

### 4. Outras Configurações

✅ **Require code reviews before merging**
- ✅ Require approval of reviewers
- **Number of required reviewers:** 1

✅ **Require status checks to pass before merging**
- ✅ Require branches to be up to date before merging

✅ **Require conversation resolution before merging**
- Exigir que todos os comentários sejam resolvidos

✅ **Require signed commits**
- Exigir que commits sejam assinados (opcional, avançado)

### 5. Aplicar a Regra

✅ **Include administrators**
- Aplicar regras também para administradores

✅ **Restrict who can push to matching branches**
- Apenas pessoas específicas podem fazer push direto

## 📊 Resultado Final

Após configurar, a branch main terá:

```
✓ Exige pull request
✓ Exige 1 aprovação
✓ Exige testes passando
✓ Exige código atualizado
✓ Descarta PRs obsoletas
✓ Requer resolução de comentários
```

## 🔄 Workflow com Proteção

### Antes (sem proteção)
```
1. Editar código
2. Fazer commit
3. Push direto para main
4. ❌ Bug em produção!
```

### Depois (com proteção)
```
1. Editar código
2. Fazer commit
3. Push para branch feature
4. Criar Pull Request
5. ✅ Testes rodam automaticamente
6. 👀 Revisão de código
7. ✅ Aprovação
8. Mergear para main
9. ✅ Código de qualidade em produção!
```

## 📝 Exemplo de PR Protegida

```
Pull Request: feat: Adicionar filtro por rarity

Status:
✅ All checks passed
✅ 1 approval required (1 approved)
✅ Branches are up to date

Merge button: ENABLED ✓
```

## 🐛 Troubleshooting

### "Cannot merge - checks failed"

1. Ir para "Checks" na PR
2. Ver qual teste falhou
3. Clicar em "Details" para ver logs
4. Corrigir o código localmente
5. Fazer push novamente

### "Cannot merge - needs approval"

1. Pedir revisão para um colega
2. Colega clica em "Review changes" → "Approve"
3. Agora pode mergear

### "Cannot merge - branch out of date"

1. Clicar em "Update branch"
2. Ou fazer localmente:
   ```bash
   git fetch origin
   git rebase origin/main
   git push --force-with-lease
   ```

## 🔐 Segurança Adicional

### Exigir Assinatura de Commits

1. Gerar chave GPG: https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key
2. Adicionar ao GitHub: Settings → SSH and GPG keys
3. Configurar Git localmente:
   ```bash
   git config --global user.signingkey <sua-chave>
   git config --global commit.gpgsign true
   ```
4. Ativar em Branch Protection: ✅ Require signed commits

### Exigir CODEOWNERS

1. Criar arquivo `.github/CODEOWNERS`:
   ```
   # Todos os arquivos
   * @arifagb

   # Componentes
   /components/ @arifagb

   # Testes
   *.test.ts @arifagb
   ```

2. Ativar em Branch Protection: ✅ Require review from code owners

## 📚 Recursos

- [GitHub Branch Protection Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Status Checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches#about-branch-protection-rules)
- [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

## ✅ Checklist

- [ ] Acessar Settings → Branches
- [ ] Clicar em "Add rule"
- [ ] Configurar pattern: `main`
- [ ] ✅ Require pull request
- [ ] ✅ Require approvals (1)
- [ ] ✅ Dismiss stale PRs
- [ ] ✅ Require status checks
- [ ] ✅ Require branches up to date
- [ ] ✅ Require conversation resolution
- [ ] ✅ Include administrators
- [ ] Salvar regra
- [ ] Testar criando uma PR

## 🎯 Próximas Etapas

1. **Configurar proteção** - Seguir os passos acima
2. **Testar com PR** - Criar uma PR e validar que tudo funciona
3. **Documentar no README** - Adicionar seção sobre como contribuir
4. **Comunicar ao time** - Explicar novo workflow

## 💡 Dicas

- **Comece simples** - Apenas exigir PR e testes
- **Aumente gradualmente** - Adicione mais regras conforme necessário
- **Comunique mudanças** - Avise o time sobre novas regras
- **Revise regularmente** - Ajuste regras conforme experiência
- **Documente exceções** - Se precisar fazer bypass, documente por quê

---

**Sua branch main está protegida!** 🔒

Agora todas as mudanças passarão por revisão e testes antes de chegar em produção.
