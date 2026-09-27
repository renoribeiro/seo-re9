import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { featureGroups } from "@/lib/feature-pages";
import { buildPageSeo } from "@/lib/seo";

const featuresDescription =
  "Conheça as ferramentas de SEO open source do RE9 SEO: fluxos com agentes de IA, MCP do Google Search Console, pesquisa de palavras-chave, monitoramento de posições, backlinks, auditoria do site, análise de concorrentes e visibilidade em IA.";

export const Route = createFileRoute("/_marketing/features/")({
  head: () =>
    buildPageSeo({
      title: "Recursos",
      description: featuresDescription,
      path: "/features",
      titleSuffix: "RE9 SEO",
    }),
  component: FeaturesIndex,
});

function FeaturesIndex() {
  return (
    <article className="mx-auto max-w-5xl">
      <p className="text-sm font-medium text-[var(--color-brand-accent)]">
        Ferramentas de SEO open source
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
        Todas as ferramentas de que você precisa, em um só lugar
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-brand-muted)]">
        Pesquise palavras-chave, monitore posições, audite sites e entenda sua
        visibilidade em IA em uma única plataforma moderna.
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <div className="border-b border-[var(--color-border-subtle)] pb-4">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Fluxos com agentes de IA
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
              Deixe clientes MCP compatíveis pesquisarem palavras-chave, SERPs,
              domínios, backlinks e dados próprios do Search Console pelo RE9
              SEO.
            </p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <FeatureCard href="/features/mcp">
              <p className="text-xs font-medium text-[var(--color-brand-accent)]">
                MCP do RE9 SEO
              </p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-950">
                MCP do RE9 SEO
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-brand-muted)]">
                Conecte o Claude, o Codex e outros agentes às ferramentas de
                pesquisa do RE9 SEO.
              </p>
              <p className="mt-4 text-sm font-medium text-neutral-950">
                Conhecer o MCP <span aria-hidden="true">&rarr;</span>
              </p>
            </FeatureCard>
            <FeatureCard href="/google-search-console-mcp">
              <p className="text-xs font-medium text-[var(--color-brand-accent)]">
                Search Console MCP
              </p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-950">
                MCP do Google Search Console
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-brand-muted)]">
                Dê aos agentes acesso a cliques, impressões, CTR, posição e
                inspeção de URLs.
              </p>
              <p className="mt-4 text-sm font-medium text-neutral-950">
                Conhecer o MCP do GSC <span aria-hidden="true">&rarr;</span>
              </p>
            </FeatureCard>
          </div>
        </section>

        {featureGroups.map((group) => (
          <section key={group.label}>
            <div className="border-b border-[var(--color-border-subtle)] pb-4">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                {group.label}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
                {group.description}
              </p>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {group.pages.map((page) => (
                <FeatureCard key={page.slug} href={`/features/${page.slug}`}>
                  <p className="text-xs font-medium text-[var(--color-brand-accent)]">
                    {page.eyebrow}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-neutral-950">
                    {page.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-brand-muted)]">
                    {page.navDescription}
                  </p>
                  <p className="mt-4 text-sm font-medium text-neutral-950">
                    Conhecer o recurso <span aria-hidden="true">&rarr;</span>
                  </p>
                </FeatureCard>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

function FeatureCard({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="block rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 transition-colors hover:border-neutral-900"
    >
      {children}
    </a>
  );
}
