---
title: "Instale o plugin do RE9 SEO para Claude Code"
description: "Adicione o MCP e as skills de agente do RE9 SEO ao Claude Code com um comando de marketplace e um de instalação."
---

O plugin do RE9 SEO reúne o MCP do RE9 SEO e todas as dez skills de agente de SEO em uma única instalação. Esta é a forma recomendada de configurar o RE9 SEO no Claude Code.

## Instalação

Execute estes dois comandos no Claude Code:

```bash
/plugin marketplace add renoribeiro/seo-re9
/plugin install openseo@openseo
```

Se o resumo da instalação disser `Run /reload-plugins to activate.`, execute esse comando.

O Claude Code conecta o MCP do RE9 SEO em `https://seo.agenciare9.com.br/mcp` e ativa dez skills:

- Configuração do projeto de SEO (`seo-project-setup`)
- SEO Coach (`seo-coach`)
- Auditoria de SEO (`seo-audit`)
- Pesquisa de palavras-chave (`keyword-research`)
- Agrupamento de palavras-chave (`keyword-clustering`)
- Panorama competitivo (`competitive-landscape`)
- Análise de concorrentes (`competitor-analysis`)
- SEO local (`local-seo`)
- Prospecção de links (`link-prospecting`)
- Relatório de SEO (`seo-report`)

## Conclua o login

O Claude Code deve pedir que você entre no RE9 SEO logo após a instalação. Se isso não acontecer, execute `/mcp` e aprove a conexão do RE9 SEO por lá.

## Execute uma skill

As skills do plugin usam o nome do plugin como prefixo:

```
/openseo:seo-project-setup
/openseo:seo-coach
/openseo:seo-audit
/openseo:keyword-research
/openseo:keyword-clustering
/openseo:competitive-landscape
/openseo:competitor-analysis
/openseo:local-seo
/openseo:link-prospecting
```

## Claude Desktop

O Claude Desktop não é compatível com este formato de plugin — plugins são um recurso do Claude Code. No Claude Desktop, [adicione o RE9 SEO como um conector MCP](/docs/mcp#claude-desktop).

## Atualização

Execute dentro do Claude Code:

```text
/plugin marketplace update openseo
/plugin update openseo@openseo
/reload-plugins
```

As atualizações chegam ao cache imediatamente, mas a sessão em andamento mantém a versão antiga até você executar `/reload-plugins` ou reiniciar o Claude Code.

Para outros métodos de instalação, veja [Configuração do agente e atualização das skills](/docs/agent-setup#update-your-skills).

## Remoção

```text
/plugin uninstall openseo@openseo
```

## Solução de problemas

Para conferir o que está realmente instalado, execute `/plugin list` em vez de só `/plugin` — `/plugin` sozinho abre um painel interativo que não mostra texto simples.

Se `/reload-plugins` informar `0 skills`, isso é normal, não uma falha — o resumo só conta a pasta `commands/` do plugin, não a `skills/`. Confirme que as skills foram carregadas executando uma delas diretamente, por exemplo `/openseo:seo-audit`.

Se `/plugin uninstall openseo@openseo` informar "not installed in this project", provavelmente você instalou em um escopo diferente do que está sendo verificado (User, Project ou Local). Execute `/plugin list` para ver o escopo real ou evite o seletor usando o comando no shell: `claude plugin uninstall openseo@openseo --scope user`.

Se as skills do plugin não aparecerem, limpe o cache de plugins com `rm -rf ~/.claude/plugins/cache` — isso limpa o cache de todos os plugins instalados, não só o do RE9 SEO, então reinstale os outros depois — reinicie o Claude Code e reinstale o plugin.

Se a conexão do RE9 SEO não aparecer como autenticada, execute `/mcp`, selecione o RE9 SEO e conclua o login.

## Outros clientes

Este plugin é para o Claude Code. No Codex CLI, use o [plugin do RE9 SEO para Codex](/docs/codex-plugin). Para Cursor, Codex Desktop, Claude Desktop ou uma configuração com chave de API, veja [Configure o MCP do RE9 SEO](/docs/mcp) e [Configure as skills de agente do RE9 SEO](/docs/skills/setup).
