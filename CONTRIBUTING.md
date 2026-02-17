# Guia de Contribuição - SwArifa Assistant

Obrigado por estar interessado em contribuir para o SwArifa Assistant! Este guia explica como você pode ajudar a melhorar o projeto.

## 🎯 Tipos de Contribuição

### 🐛 Reportar Bugs

Se encontrou um bug:

1. **Verificar se já foi reportado** - Ir para [Issues](https://github.com/arifagb/SwArifa-Assistant/issues)
2. **Criar novo issue** - Clicar em "New issue" → "Bug report"
3. **Descrever o bug:**
   - Título claro e conciso
   - Descrição detalhada
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Screenshots/videos se possível
   - Versão do app, SO, dispositivo

**Exemplo:**
```
Título: Busca não funciona com monstros com acentos

Descrição:
Quando digito "Susano" com acento, a busca não encontra resultados.

Passos para reproduzir:
1. Abrir app
2. Digitar "Susanô" no campo de busca
3. Clicar em "Buscar"

Esperado: Mostrar resultados para Susanô
Atual: Mostra "Nenhum resultado encontrado"

Versão: v1.0.0
SO: Android 12
Dispositivo: Samsung Galaxy S21
```

### ✨ Sugerir Features

Para sugerir uma nova feature:

1. **Ir para [Discussions](https://github.com/arifagb/SwArifa-Assistant/discussions)**
2. **Clicar em "New discussion" → "Ideas"**
3. **Descrever a feature:**
   - O que é a feature?
   - Por que seria útil?
   - Como funcionaria?
   - Exemplos de uso

**Exemplo:**
```
Título: Adicionar filtro por rarity

Descrição:
Seria útil poder filtrar monstros por rarity (1-6 estrelas).

Caso de uso:
Quando estou montando uma defesa, quero ver apenas monstros lendários (5-6 estrelas).

Como funcionaria:
- Adicionar slider de rarity no filtro
- Mostrar apenas monstros dentro do range selecionado
- Salvar preferência do usuário
```

### 💻 Contribuir com Código

Para contribuir com código:

#### 1. Setup Local

```bash
# Clonar repositório
git clone https://github.com/arifagb/SwArifa-Assistant.git
cd SwArifa-Assistant

# Instalar dependências
npm install

# Criar branch para sua feature
git checkout -b feature/sua-feature
```

#### 2. Fazer Mudanças

- Editar arquivos
- Testar localmente: `npm run dev`
- Executar testes: `npm test`
- Verificar tipos: `npm run check`
- Formatar código: `npm run format`

#### 3. Commit e Push

```bash
# Adicionar mudanças
git add .

# Commit com mensagem clara
git commit -m "feat: adicionar filtro por rarity"

# Push para sua branch
git push origin feature/sua-feature
```

#### 4. Criar Pull Request

1. Ir para [Pull Requests](https://github.com/arifagb/SwArifa-Assistant/pulls)
2. Clicar em "New pull request"
3. Selecionar sua branch
4. Preencher template:
   - Descrição das mudanças
   - Tipo: feat/fix/docs/style/refactor/test
   - Checklist de testes
   - Screenshots/videos se aplicável

## 📋 Padrões de Código

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adicionar novo componente
fix: corrigir bug na busca
docs: atualizar README
style: formatar código
refactor: reorganizar estrutura
test: adicionar testes unitários
chore: atualizar dependências
```

### Branches

Use nomes descritivos:

```
feature/nome-da-feature
fix/nome-do-bug
docs/nome-da-documentacao
refactor/nome-da-refatoracao
```

### Code Style

- **TypeScript** - Sempre tipado
- **Prettier** - Formatação automática
- **ESLint** - Linting
- **Tailwind CSS** - Estilos

```bash
# Formatar código
npm run format

# Verificar linting
npm run lint

# Verificar tipos
npm run check
```

### Componentes React

```tsx
// ✅ Bom
import { View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

export function MyComponent({ title, onPress }: MyComponentProps) {
  const colors = useColors();
  
  return (
    <View className="p-4 rounded-lg bg-surface">
      <Text className="text-lg font-bold text-foreground">
        {title}
      </Text>
    </View>
  );
}

// ❌ Evitar
function MyComponent(props) {
  return (
    <div style={{ padding: 16 }}>
      {props.title}
    </div>
  );
}
```

### Testes

Sempre adicione testes para novas features:

```typescript
import { describe, it, expect } from "vitest";
import { searchDefenseFromSwgt } from "@/lib/swgt-real-api";

describe("swgt-real-api", () => {
  it("deve retornar defesa quando buscar por monstros válidos", async () => {
    const result = await searchDefenseFromSwgt("Susano", "Garo", "Orion");
    expect(result).toBeDefined();
    expect(result?.defense).toBeDefined();
  });
});
```

## 🧪 Testes

```bash
# Rodar todos os testes
npm test

# Rodar testes em modo watch
npm test -- --watch

# Gerar cobertura
npm test -- --coverage
```

**Meta:** Manter cobertura acima de 80%

## 📚 Documentação

Sempre documente suas mudanças:

- **Código** - Adicione comentários para lógica complexa
- **README** - Atualize se adicionar features
- **CHANGELOG** - Documente mudanças significativas
- **Commits** - Use mensagens claras

## 🔍 Revisão de Código

Todos os PRs serão revisados. Espere:

- ✅ Verificação automática (testes, linting, tipos)
- 👀 Revisão manual
- 💬 Feedback e sugestões
- ✨ Aprovação e merge

**Tempo esperado:** 24-48 horas

## 🚀 Processo de Release

Releases são criadas regularmente:

1. **Versioning** - Seguir [Semantic Versioning](https://semver.org/)
   - `v1.0.0` - Major (breaking changes)
   - `v1.1.0` - Minor (novas features)
   - `v1.0.1` - Patch (bug fixes)

2. **Release Notes** - Documentar mudanças
3. **Tags** - Criar tag no GitHub
4. **Builds** - Gerar APK/IPA

## 🤝 Código de Conduta

- Seja respeitoso
- Aceite críticas construtivas
- Foque no código, não na pessoa
- Reporte comportamento inadequado

## 📞 Precisa de Ajuda?

- **Dúvidas** - Criar [Discussion](https://github.com/arifagb/SwArifa-Assistant/discussions)
- **Bugs** - Criar [Issue](https://github.com/arifagb/SwArifa-Assistant/issues)
- **Chat** - Abrir uma [Discussion](https://github.com/arifagb/SwArifa-Assistant/discussions)

## ✅ Checklist para PR

Antes de submeter seu PR:

- [ ] Código segue o style guide
- [ ] Testes passam: `npm test`
- [ ] Linting passa: `npm run lint`
- [ ] Tipos passam: `npm run check`
- [ ] Código formatado: `npm run format`
- [ ] Commits seguem Conventional Commits
- [ ] Descrição do PR é clara
- [ ] Documentação atualizada
- [ ] Screenshots/videos adicionados (se aplicável)
- [ ] Sem conflitos com main branch

## 🎓 Recursos

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vitest](https://vitest.dev)

## 🙏 Obrigado!

Obrigado por contribuir para tornar o SwArifa Assistant melhor! 🎮

---

**Versão:** 1.0.0  
**Última atualização:** Fevereiro 2026
