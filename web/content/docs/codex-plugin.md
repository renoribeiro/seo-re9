---
title: "Instale o plugin do RE9 SEO para Codex"
description: "Adicione o MCP e as skills de agente do RE9 SEO ao Codex com um comando de marketplace e um de instalação."
---

O plugin do RE9 SEO reúne o MCP do RE9 SEO e todas as dez skills de agente de SEO em uma única instalação. Esta é a forma recomendada de configurar o RE9 SEO no Codex CLI.

## Instalação

Execute estes comandos no seu terminal:

```bash
codex plugin marketplace add renoribeiro/seo-re9
codex plugin add openseo@openseo
codex mcp login openseo
```

O `codex mcp login` abre o navegador para você aprovar a conexão do RE9 SEO. Se ele informar que `openseo` não foi encontrado, reinicie o Codex primeiro — servidores MCP incluídos em plugins só são registrados depois de reiniciar, não logo após a instalação — e execute `codex mcp login openseo` de novo.

O Codex conecta o MCP do RE9 SEO em `https://seo.agenciare9.com.br/mcp` e ativa dez skills:

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

## Execute uma skill

Digite `$` no Codex para ver as skills disponíveis ou peça ao Codex para executar uma pelo nome, por exemplo "execute a seo-project-setup" ou "execute a seo-audit em example.com".

## Atualização

```bash
codex plugin marketplace upgrade openseo
```

Recarregue ou reinicie o Codex se as skills atualizadas não estiverem disponíveis. Para outros métodos de instalação, veja [Configuração do agente e atualização das skills](/docs/agent-setup#update-your-skills).

## Remoção

```bash
codex plugin remove openseo@openseo
```

## Solução de problemas

Se o servidor MCP do RE9 SEO não aparecer depois de reiniciar, execute `/mcp` na TUI do Codex para verificar o status e depois execute `codex mcp login openseo` de novo.

Se ainda assim a autenticação não funcionar, saia primeiro e tente de novo:

```bash
codex mcp logout openseo
codex mcp login openseo
```

Se um comando `codex plugin` informar "unrecognized subcommand", execute `codex plugin --help` para ver os subcomandos que a sua versão instalada realmente aceita — eles mudaram entre versões (por exemplo, `add`/`remove`, e não `install`/`uninstall`).

## Outros clientes

Este plugin é para o Codex CLI. No Claude Code, use o [plugin do RE9 SEO para Claude Code](/docs/claude-code-plugin). Para Claude Desktop, Cursor, Codex Desktop ou uma configuração com chave de API, veja [Configure o MCP do RE9 SEO](/docs/mcp) e [Configure as skills de agente do RE9 SEO](/docs/skills/setup).
