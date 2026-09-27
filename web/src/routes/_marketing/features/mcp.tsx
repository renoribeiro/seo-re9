import { createFileRoute } from "@tanstack/react-router";
import { aiAgentSeoStrategies } from "@/lib/strategy-libraries";
import { buildPageSeo } from "@/lib/seo";

const mcpDescription =
  "Dê ao Claude, ao Cursor ou a qualquer cliente MCP ferramentas reais de SEO: pesquisa de palavras-chave, SERPs ao vivo, backlinks, monitoramento de posições e dados do Search Console em um único servidor MCP.";

const toolCategories = [
  {
    label: "Palavras-chave",
    tools: [
      {
        title: "Pesquisar palavras-chave",
        description:
          "Gere ideias de palavras-chave com volume, dificuldade e CPC.",
      },
      {
        title: "Obter resultados da SERP",
        description:
          "Veja os resultados orgânicos do Google ao vivo para uma palavra-chave.",
      },
      {
        title: "Salvar palavras-chave",
        description:
          "Mantenha as ideias úteis organizadas no seu projeto do RE9 SEO.",
      },
      {
        title: "Obter dados de monitoramento de posições",
        description:
          "Leia as posições das palavras-chave monitoradas e os resultados mais recentes dos monitoramentos do seu projeto.",
      },
    ],
  },
  {
    label: "Pesquisa de concorrentes",
    tools: [
      {
        title: "Obter visão geral do domínio",
        description: "Resuma a presença orgânica de um domínio.",
      },
      {
        title: "Obter palavras-chave do domínio",
        description:
          "Encontre as palavras-chave em que um domínio já ranqueia.",
      },
      {
        title: "Obter visão geral de backlinks",
        description:
          "Confira estatísticas de backlinks e domínios de referência.",
      },
    ],
  },
  {
    label: "Search Console",
    tools: [
      {
        title: "Obter desempenho do GSC",
        description:
          "Leia cliques, impressões, CTR e posição da propriedade conectada.",
      },
      {
        title: "Inspecionar URLs",
        description:
          "Verifique cobertura de indexação, rastreamento, URL canônica, Mobile e sinais de resultados avançados.",
      },
    ],
  },
] as const;

const workflows = [
  {
    title: "Primeira rodada de pesquisa de palavras-chave",
    description:
      "Peça ao agente para expandir temas-semente em ideias de palavras-chave com volume, dificuldade e CPC e salvar as mais promissoras no seu projeto do RE9 SEO para revisão humana.",
  },
  {
    title: "Raio-x de um concorrente",
    description:
      "Aponte o agente para o domínio de um concorrente e peça a visão geral do domínio, as palavras-chave ranqueadas e as estatísticas de backlinks, com um resumo de onde você pode competir de forma realista.",
  },
  {
    title: "Varredura de oportunidades próximas do topo no Search Console",
    description:
      "Peça ao agente para ler suas consultas do GSC, encontrar palavras-chave na página dois que valem ser levadas para a página um e checar a SERP ao vivo de cada uma antes de recomendar mudanças.",
  },
  {
    title: "Agrupamento e tags de palavras-chave",
    description:
      "Deixe o agente agrupar as palavras-chave salvas por intenção, marcá-las com tags por página ou cluster de temas e devolver um plano de conteúdo que você pode executar na interface do RE9 SEO.",
  },
];

export const Route = createFileRoute("/_marketing/features/mcp")({
  head: () =>
    buildPageSeo({
      title: "Servidor MCP de SEO: palavras-chave, SERP e backlinks",
      description: mcpDescription,
      path: "/features/mcp",
      titleSuffix: "RE9 SEO",
    }),
  component: McpPage,
});

function McpPage() {
  return (
    <>
      <p className="text-sm font-medium text-neutral-500">MCP do RE9 SEO</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight leading-tight">
        Um servidor MCP de SEO para agentes de IA
      </h1>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        O RE9 SEO é um servidor MCP de SEO que conecta o Claude, o Cursor, o
        Codex ou qualquer cliente MCP a dados reais. Assim, seu agente pode
        pesquisar palavras-chave, analisar SERPs ao vivo, comparar domínios de
        concorrentes, resumir o contexto de backlinks, salvar oportunidades de
        palavras-chave, revisar dados de monitoramento de posições e ler sinais
        próprios do Search Console.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="/docs/mcp"
          className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Configurar o MCP do RE9 SEO
        </a>
        <a
          href="/docs/skills"
          className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 px-5 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
        >
          Ver as skills do RE9 SEO
        </a>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">
          O que é um servidor MCP de SEO?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          MCP (Model Context Protocol) é o padrão que os clientes de IA usam
          para chamar ferramentas externas. Um servidor MCP de SEO expõe dados
          de SEO (métricas de palavras-chave, resultados da SERP, estatísticas
          de domínios e backlinks) como ferramentas que o agente pode chamar no
          meio da conversa. Em vez de chutar volumes de busca ou posições, seu
          agente consulta dados reais do seu projeto no RE9 SEO e pode salvar o
          que encontrou para você revisar na interface. Combine com a{" "}
          <a
            href="/features/keyword-research"
            className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-700"
          >
            pesquisa de palavras-chave
          </a>{" "}
          para uma primeira rodada, feita pelo agente, sobre qualquer tema.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">
          Fluxos com agentes que funcionam
        </h2>
        <ol className="mt-6 space-y-6">
          {workflows.map((workflow, index) => (
            <li
              key={workflow.title}
              className="grid grid-cols-[2.25rem_1fr] gap-x-4"
            >
              <span className="pt-[2px] font-mono text-sm tabular-nums text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  {workflow.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                  {workflow.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">
          Grupos de ferramentas disponíveis
        </h2>
        <div className="mt-5 grid gap-x-8 gap-y-8 md:grid-cols-3">
          {toolCategories.map((category) => (
            <div key={category.label}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                {category.label}
              </h3>
              <ul className="mt-3 space-y-3">
                {category.tools.map((tool) => (
                  <li key={tool.title} className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-neutral-900">
                      {tool.title}
                    </span>
                    <p className="text-xs leading-relaxed text-neutral-600">
                      {tool.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">
          Biblioteca de estratégias de SEO com agentes de IA
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Estratégias práticas para fazer SEO com um agente: o que conectar, o
          que automatizar, onde a pessoa continua no controle e como tornar uma
          boa execução repetível. Cada uma traz um prompt MCP pronto para
          copiar.
        </p>
        <ul className="mt-5 space-y-3">
          {aiAgentSeoStrategies.map((strategy) => (
            <li key={strategy.href}>
              <a
                href={strategy.href}
                className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-700"
              >
                {strategy.title}
              </a>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                {strategy.description}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <a
            href="/library/ai-agent-seo"
            className="inline-flex h-9 items-center justify-center rounded-md border border-neutral-300 px-4 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
          >
            Ver todas as estratégias de SEO com agentes de IA
          </a>
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-neutral-900">
          MCP do Google Search Console, sem configurar o Google Cloud
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          O MCP do RE9 SEO pode ler dados de desempenho e de inspeção de URLs do
          Search Console de um projeto hospedado conectado. Não é preciso criar
          projeto no Google Cloud nem credenciais OAuth. Essas ferramentas são
          somente leitura e não consomem créditos do RE9 SEO.
        </p>
        <div className="mt-4">
          <a
            href="/google-search-console-mcp"
            className="inline-flex h-9 items-center justify-center rounded-md border border-neutral-300 px-4 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
          >
            Conhecer o MCP do GSC
          </a>
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-neutral-200 bg-neutral-50 p-5">
        <h2 className="text-lg font-semibold text-neutral-900">
          A configuração está na documentação
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          A URL do servidor MCP, a configuração do Claude e do Codex e a solução
          de problemas ficam na documentação, para que esta página possa focar
          no que o MCP do RE9 SEO torna possível.
        </p>
        <div className="mt-4">
          <a
            href="/docs/mcp"
            className="inline-flex h-9 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Abrir a documentação do MCP
          </a>
        </div>
      </section>
    </>
  );
}
