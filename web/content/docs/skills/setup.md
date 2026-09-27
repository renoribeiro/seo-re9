---
title: "Configure as skills de agente do RE9 SEO"
description: "Adicione os arquivos de skills do RE9 SEO ao seu agente de IA depois de conectar o MCP do RE9 SEO."
---

As skills de agente do RE9 SEO são arquivos separados do MCP do RE9 SEO.

No Claude Code, pule os passos abaixo e use o [plugin do RE9 SEO](/docs/claude-code-plugin) — ele instala o MCP e todas as skills em um só passo. No Codex CLI, use o [plugin do RE9 SEO](/docs/codex-plugin) da mesma forma.

Primeiro, [configure o MCP do RE9 SEO](/docs/mcp). O MCP dá ao seu agente acesso aos dados do RE9 SEO.

Depois, adicione os arquivos `SKILL.md` do RE9 SEO que você quer que o agente use. Cada skill dá ao agente um fluxo de trabalho de SEO.

## Escolha uma opção de instalação

Escolha a opção que corresponde à forma como você quer instalar os arquivos.

### Opção 1: instalar e escolher de forma interativa

Use esta opção se quiser que o instalador mostre as skills e os agentes disponíveis.

```bash
npx skills add renoribeiro/seo-re9
```

### Opção 2: instalar todas as skills do RE9 SEO

Use esta opção se quiser todas as skills do RE9 SEO.

```bash
npx skills add renoribeiro/seo-re9 --skill '*'
```

### Opção 3: instalar todas as skills só para o Claude Code

Use esta opção se as skills devem ficar disponíveis apenas no Claude Code.

```bash
npx skills add renoribeiro/seo-re9 --skill '*' --agent claude-code
```

### Opção 4: instalar todas as skills só para o OpenAI Codex

Use esta opção se as skills devem ficar disponíveis apenas no Codex.

```bash
npx skills add renoribeiro/seo-re9 --skill '*' --agent codex
```

### Opção 5: copiar os arquivos das skills manualmente

Use esta opção se preferir copiar os arquivos para a pasta de skills do seu agente.

```bash
git clone https://github.com/renoribeiro/seo-re9.git

# Codex
mkdir -p ~/.codex/skills
cp -R seo-re9/plugins/openseo/skills/* ~/.codex/skills/

# Claude Code
mkdir -p ~/.claude/skills
cp -R seo-re9/plugins/openseo/skills/* ~/.claude/skills/
```

Você também pode revisar as skills originais no GitHub:

- [Skills de agente do RE9 SEO no GitHub](https://github.com/renoribeiro/seo-re9/tree/main/.agents/skills)

A página de cada skill também tem um link para o `SKILL.md` original.

## Atualize as skills instaladas

Use o [prompt ou os comandos de atualização do seu método de instalação](/docs/agent-setup#update-your-skills). Atualize o plugin do RE9 SEO se é ele que fornece suas skills; caso contrário, use o instalador que você escolheu originalmente ou atualize suas cópias manuais.

## Execute uma skill

Depois que os arquivos das skills estiverem disponíveis para o agente, execute o comando de barra correspondente:

- `/seo-project-setup`
- `/seo-coach`
- `/keyword-research`
- `/keyword-clustering`
- `/competitive-landscape`
- `/competitor-analysis`
- `/link-prospecting`
- `/local-seo`
- `/seo-audit`

## Próximo passo

Comece pela [Configuração do projeto de SEO](/docs/skills/seo-project-setup) se este for um projeto de SEO novo, ou pelo [SEO Coach](/docs/skills/seo-coach) se não souber qual fluxo executar primeiro.
