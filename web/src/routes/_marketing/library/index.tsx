import { createFileRoute } from "@tanstack/react-router";
import { buildPageSeo } from "@/lib/seo";
import {
  aiAgentSeoStrategies,
  competitiveAnalysisStrategies,
  keywordResearchStrategies,
  linkBuildingStrategies,
  rankTrackingStrategies,
  siteAuditStrategies,
} from "@/lib/strategy-libraries";

const PATH = "/library";
const description =
  "Estratégias práticas de SEO para encontrar demanda de busca, avaliar concorrentes, auditar um site, monitorar posições, conseguir links, fazer SEO com um agente de IA, mapear intenção e planejar páginas.";
const featuredStrategies = [
  ...keywordResearchStrategies.slice(0, 2),
  ...competitiveAnalysisStrategies.slice(0, 1),
  ...siteAuditStrategies.slice(0, 1),
  ...rankTrackingStrategies.slice(0, 1),
  ...linkBuildingStrategies.slice(0, 1),
  ...aiAgentSeoStrategies.slice(0, 1),
];

export const Route = createFileRoute("/_marketing/library/")({
  head: () =>
    buildPageSeo({
      title: "Biblioteca de estratégias de SEO",
      description,
      path: PATH,
      titleSuffix: "RE9 SEO",
    }),
  component: StrategyLibraryIndexPage,
});

function StrategyLibraryIndexPage() {
  return (
    <article className="mx-auto max-w-5xl">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-[var(--color-brand-accent)]">
          Recursos
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
          Biblioteca de estratégias de SEO
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-brand-muted)]">
          Encontre demanda de busca e decida quais páginas criar. As estratégias
          estão agrupadas por tema para você começar pelo problema que precisa
          resolver.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Navegue por tema
        </h2>
        <div className="mt-5 grid gap-4">
          <a
            href="/library/keyword-research"
            className="block rounded-lg border border-[var(--color-border-subtle)] bg-white p-6 transition-colors hover:border-neutral-900"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Pesquisa de palavras-chave
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-brand-muted)]">
              Comece pela linguagem do cliente, expanda para a demanda de cauda
              longa, mapeie a intenção de busca e decida quais oportunidades
              merecem uma página.
            </p>
            <p className="mt-5 text-sm font-medium text-neutral-950">
              Ver todas as {keywordResearchStrategies.length} estratégias{" "}
              <span aria-hidden="true">&rarr;</span>
            </p>
          </a>
          <a
            href="/library/competitive-analysis"
            className="block rounded-lg border border-[var(--color-border-subtle)] bg-white p-6 transition-colors hover:border-neutral-900"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Análise de concorrentes
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-brand-muted)]">
              Descubra quais domínios realmente ocupam seus resultados de busca,
              meça com honestidade a lacuna de palavras-chave e de links e
              decida o que vale a pena conquistar.
            </p>
            <p className="mt-5 text-sm font-medium text-neutral-950">
              Ver todas as {competitiveAnalysisStrategies.length} estratégias{" "}
              <span aria-hidden="true">&rarr;</span>
            </p>
          </a>
          <a
            href="/library/site-audit"
            className="block rounded-lg border border-[var(--color-border-subtle)] bg-white p-6 transition-colors hover:border-neutral-900"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Auditoria do site
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-brand-muted)]">
              Transforme um rastreamento em trabalho planejado: faça a triagem
              dos achados por gravidade, escreva o relatório para que ele seja
              aprovado e decida quais páginas devem deixar de existir.
            </p>
            <p className="mt-5 text-sm font-medium text-neutral-950">
              Ver todas as {siteAuditStrategies.length} estratégias{" "}
              <span aria-hidden="true">&rarr;</span>
            </p>
          </a>
          <a
            href="/library/rank-tracking"
            className="block rounded-lg border border-[var(--color-border-subtle)] bg-white p-6 transition-colors hover:border-neutral-900"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Monitoramento de posições
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-brand-muted)]">
              Escolha as palavras-chave que valem a pena acompanhar, saiba onde
              o Search Console para, monitore posições locais a partir de onde
              os clientes estão e escreva o relatório de posições que é lido.
            </p>
            <p className="mt-5 text-sm font-medium text-neutral-950">
              Ver todas as {rankTrackingStrategies.length} estratégias{" "}
              <span aria-hidden="true">&rarr;</span>
            </p>
          </a>
          <a
            href="/library/link-building"
            className="block rounded-lg border border-[var(--color-border-subtle)] bg-white p-6 transition-colors hover:border-neutral-900"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Link building
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-brand-muted)]">
              Leia um perfil de backlinks sem confiar cegamente na nota, reporte
              o número que move as posições e conquiste links a partir das
              páginas que já os recebem.
            </p>
            <p className="mt-5 text-sm font-medium text-neutral-950">
              Ver todas as {linkBuildingStrategies.length} estratégias{" "}
              <span aria-hidden="true">&rarr;</span>
            </p>
          </a>
          <a
            href="/library/ai-agent-seo"
            className="block rounded-lg border border-[var(--color-border-subtle)] bg-white p-6 transition-colors hover:border-neutral-900"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
              SEO com agentes de IA
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-brand-muted)]">
              Faça SEO pelo assistente que você já usa: conecte o MCP, decida o
              que fica com um agendamento e o que fica com uma pessoa, mantenha
              o briefing humano e torne a boa execução repetível.
            </p>
            <p className="mt-5 text-sm font-medium text-neutral-950">
              Ver todas as {aiAgentSeoStrategies.length} estratégias{" "}
              <span aria-hidden="true">&rarr;</span>
            </p>
          </a>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Comece por uma estratégia
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Vá direto a um fluxo de trabalho se você já sabe o que precisa fazer.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {featuredStrategies.map((strategy) => (
            <a
              key={strategy.href}
              href={strategy.href}
              className="rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 transition-colors hover:border-neutral-900"
            >
              <h3 className="text-base font-semibold text-neutral-950">
                {strategy.title} <span aria-hidden="true">&rarr;</span>
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-brand-muted)]">
                {strategy.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
