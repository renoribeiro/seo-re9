---
title: "Configure o MCP do RE9 SEO"
description: "Conecte o MCP do RE9 SEO ao Claude, ao Codex e a outros clientes de IA."
---

O MCP do RE9 SEO permite que clientes de IA compatíveis chamem as ferramentas do RE9 SEO para pesquisa de palavras-chave, análise de SERP, pesquisa de negócios locais, inteligência competitiva de busca, pesquisa de domínios, visão geral de backlinks, palavras-chave salvas, monitoramento de posições, contexto compartilhado do projeto e desempenho e inspeção de URLs do Google Search Console.

A URL do servidor MCP hospedado é:

```txt
https://seo.agenciare9.com.br/mcp
```

Na primeira conexão, você passa pelo login do RE9 SEO. Depois da autorização, seu cliente MCP pode chamar as ferramentas do RE9 SEO com o contexto de projeto e os escopos de conta que você aprovou. Para ambientes sem interface (headless) e CI, [conecte com uma chave de API](#connect-with-an-api-key).

Para ver a tela de configuração mais atual e um endpoint pronto para copiar, abra a [Configuração do agente no RE9 SEO](https://seo.agenciare9.com.br/ai).

Para prompts de configuração, comandos de plugin e atualização das skills, veja [Configuração do agente](/docs/agent-setup).

Ainda não tem conta? Experimente as [ferramentas de SEO gratuitas](/tools).

## Claude Code

O [plugin do RE9 SEO](/docs/claude-code-plugin) é a forma recomendada de conectar o Claude Code — uma instalação adiciona o MCP e as skills públicas de SEO juntos. Use os passos abaixo só se quiser apenas o MCP.

Use o escopo de usuário (user) para deixar o RE9 SEO disponível em todos os projetos. Use o escopo local para o repositório atual.

```bash
claude mcp add --transport http --scope user openseo https://seo.agenciare9.com.br/mcp
```

Depois de adicionar o servidor, aprove o login do RE9 SEO quando for solicitado.

## Claude Desktop

1. Abra Customize -> Connectors.
2. Clique em Add (ou +) e escolha Add custom connector.
3. Cole `https://seo.agenciare9.com.br/mcp`.
4. Aprove o login do RE9 SEO quando for solicitado.

Conectores personalizados do Claude Desktop estão disponíveis nos planos Free, Pro, Max, Team e Enterprise da Anthropic. O plano Free permite um conector personalizado.

## Cursor

1. Abra Cursor Settings -> Tools & Integrations -> MCP Tools.
2. Clique em New MCP Server. O Cursor abre o `mcp.json`.
3. Adicione:

```json
{
  "mcpServers": {
    "openseo": {
      "url": "https://seo.agenciare9.com.br/mcp"
    }
  }
}
```

4. Aprove o login do RE9 SEO quando for solicitado.

## Codex CLI

O [plugin do RE9 SEO](/docs/codex-plugin) é a forma recomendada de conectar o Codex CLI — uma instalação adiciona o MCP e as skills públicas de SEO juntos. Use os passos abaixo só se quiser apenas o MCP.

Execute no seu terminal:

```bash
codex mcp add openseo --url https://seo.agenciare9.com.br/mcp
```

Aprove o login quando for solicitado.

## Codex Desktop

1. Abra Settings -> Integrations & MCP.
2. Clique em Add your own.
3. Cole `https://seo.agenciare9.com.br/mcp`.
4. Aprove o login do RE9 SEO quando for solicitado.

## Conectar com uma chave de API [#connect-with-an-api-key]

Use uma chave de API em ambientes sem interface (headless), em CI ou em clientes em que o OAuth é pouco prático. As chaves de API são pessoais: tudo o que um agente fizer com a sua chave é feito em seu nome, no seu workspace.

No [app do RE9 SEO](https://seo.agenciare9.com.br/settings), abra **Configurações -> Chaves de API**, crie uma chave e copie-a assim que ela aparecer. Ela não será exibida de novo.

No Claude Code, execute:

```bash
claude mcp add --transport http --scope user openseo https://seo.agenciare9.com.br/mcp --header "Authorization: Bearer oseo_YOUR_KEY"
```

No Cursor, adicione `headers` à entrada do servidor no `mcp.json`:

```json
{
  "mcpServers": {
    "openseo": {
      "url": "https://seo.agenciare9.com.br/mcp",
      "headers": {
        "Authorization": "Bearer oseo_YOUR_KEY"
      }
    }
  }
}
```

No Codex CLI, coloque a chave em uma variável de ambiente e faça referência a ela:

```bash
export OPENSEO_API_KEY=oseo_YOUR_KEY
codex mcp add openseo --url https://seo.agenciare9.com.br/mcp --bearer-token-env-var OPENSEO_API_KEY
```

Troque `oseo_YOUR_KEY` pela chave que você copiou. Qualquer outro cliente que aceite cabeçalhos HTTP personalizados pode enviar `Authorization: Bearer oseo_YOUR_KEY` ou `x-api-key: oseo_YOUR_KEY`.

## Ferramentas disponíveis

O MCP do RE9 SEO oferece ferramentas para fluxos de pesquisa de SEO:

- Pesquisar palavras-chave com volume, dificuldade e CPC.
- Buscar resultados orgânicos da SERP do Google em tempo real para palavras-chave.
- Encontrar linhas exatas de palavra-chave, página, posição, volume, CPC, intenção e tráfego de um domínio ou página.
- Comparar concorrentes na SERP para um conjunto de palavras-chave informado.
- Buscar negócios locais perto de uma coordenada, filtrando por nota, número de avaliações ou status de reivindicação.
- Buscar uma SERP do Maps ou do Local Finder e ler as perguntas e respostas do Google Business quando necessário.
- Auditar um Perfil da Empresa no Google: categorias, nota, horários, fotos e status de reivindicação.
- Coletar avaliações do Google (incluindo avaliações de outros sites) e posts do Google Business.
- Consultar os slugs válidos de categorias do Google Business.
- Verificar a posição no Google Maps em cada ponto de uma grade ao redor de um negócio.
- Enriquecer palavras-chave com volume de busca, dificuldade, intenção, CPC e tendências.
- Listar as palavras-chave salvas de um projeto do RE9 SEO.
- Salvar palavras-chave úteis de volta no RE9 SEO.
- Ler as configurações do monitoramento de posições e as posições mais recentes das palavras-chave.
- Resumir a presença orgânica de um domínio.
- Encontrar palavras-chave para as quais um domínio já ranqueia.
- Consultar a visão geral de backlinks e domínios de referência.
- Ler o desempenho do Google Search Console com dados próprios (cliques, impressões, CTR, posição).
- Inspecionar status de indexação, rastreamento e canonical de URLs específicas (até 10 por chamada).
- Ler e atualizar o contexto compartilhado de um projeto: negócio, objetivo, posicionamento, preferências de escrita, concorrentes, páginas principais e um registro de pesquisa (não consome créditos).
- Salvar e ler relatórios HTML em um projeto (não consome créditos).
- Listar os modelos de relatório de um projeto e salvar um briefing de relatório reutilizável no projeto (não consome créditos).

## O que fazer depois da configuração

Com o MCP do RE9 SEO conectado, [configure as skills de agente do RE9 SEO](/docs/skills/setup). O MCP dá ao seu agente acesso aos dados do RE9 SEO. As skills são arquivos `SKILL.md` separados que dizem ao agente como usar esses dados em tarefas específicas de SEO.

Comece com um fluxo de trabalho específico, em vez de pedir ao agente para "fazer SEO" de forma ampla.

- Use a [Configuração do projeto de SEO](/docs/skills/seo-project-setup) para salvar seus objetivos, posicionamento, concorrentes e páginas principais no contexto do projeto, para que todas as outras skills reaproveitem essas informações.
- Use o [SEO Coach](/docs/skills/seo-coach) se você está começando em SEO ou não sabe qual fluxo executar primeiro.
- Use a [Pesquisa de palavras-chave](/docs/skills/keyword-research) para descobrir oportunidades de palavras-chave.
- Use o [Panorama competitivo](/docs/skills/competitive-landscape) para mapear um mercado antes de escolher concorrentes ou páginas.
- Use a [Análise de concorrentes](/docs/skills/competitor-analysis) para estudar um concorrente.
- Use o [Agrupamento de palavras-chave](/docs/skills/keyword-clustering) para transformar palavras-chave em grupos de páginas.
- Use a [Prospecção de links](/docs/skills/link-prospecting) para encontrar sites para outreach de um conteúdo que merece links.

## Solução de problemas

Se o seu cliente não conseguir se conectar, confira se a URL do servidor é exatamente `https://seo.agenciare9.com.br/mcp`.

Se o Codex informar `Authorization server response missing required issuer: expected https://seo.agenciare9.com.br`, atualize o Codex CLI ou o app desktop do Codex para a versão 0.147.0 ou mais recente. As versões 0.143 a 0.146 do Codex removem o issuer do callback do OAuth. Você também pode [conectar com uma chave de API](#connect-with-an-api-key) em vez de usar OAuth.

Se a autorização falhar, desconecte o servidor do RE9 SEO no seu cliente, adicione-o de novo e repita o login.

Se o seu agente não encontrar um projeto, peça para ele listar primeiro os projetos do RE9 SEO e usar o ID de projeto retornado nas próximas chamadas de ferramenta.
