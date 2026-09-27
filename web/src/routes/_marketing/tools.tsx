import { createFileRoute } from "@tanstack/react-router";
import { freeToolList } from "@/lib/free-tools/tool-pages";
import { buildBreadcrumbJsonLd, buildPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/_marketing/tools")({
  head: () =>
    buildPageSeo({
      title: "Ferramentas de SEO gratuitas",
      description:
        "Encontre palavras-chave de concorrentes, gere ideias de palavras-chave e verifique backlinks, tráfego, spam score e idade de domínio com as ferramentas de SEO gratuitas do RE9 SEO. Sem cadastro.",
      path: "/tools",
      titleSuffix: "RE9 SEO",
      imageAlt: "Ferramentas de SEO gratuitas do RE9 SEO",
    }),
  component: ToolsPage,
});

const breadcrumbLd = buildBreadcrumbJsonLd([
  { name: "Início", path: "/" },
  { name: "Ferramentas gratuitas", path: "/tools" },
]);

function ToolsPage() {
  return (
    <article className="mx-auto max-w-5xl">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-[var(--color-brand-accent)]">
          Ferramentas gratuitas
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
          Ferramentas de SEO gratuitas
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-brand-muted)]">
          Verifique backlinks, posições, tráfego e dados de domínio, ou veja a
          prévia de um resultado de busca. Use estas ferramentas sem criar
          conta.
        </p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {freeToolList.map((tool) => (
          <a
            key={tool.slug}
            href={tool.path}
            className="rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 transition-colors hover:border-neutral-900"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-base font-semibold text-neutral-950">
                {tool.name}
                <span
                  aria-hidden="true"
                  className="ml-1 text-[var(--color-brand-accent)]"
                >
                  &rarr;
                </span>
              </h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--color-brand-muted)]">
              {tool.shortDescription}
            </p>
          </a>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-950">
          Conecte seus dados do Search Console
        </h2>
        <a
          href="/google-search-console-mcp"
          className="mt-4 block rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 transition-colors hover:border-neutral-900"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-base font-semibold text-neutral-950">
              Google Search Console MCP
              <span
                aria-hidden="true"
                className="ml-1 text-[var(--color-brand-accent)]"
              >
                &rarr;
              </span>
            </h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--color-brand-muted)]">
            Conecte o Claude, o Codex ou qualquer cliente MCP aos seus próprios
            dados do Search Console. Basta conectar sua conta Google para
            começar; não é preciso ter um projeto no Google Cloud.
          </p>
        </a>
      </section>

      <section className="mt-12 rounded-xl border border-[var(--color-border-subtle)] bg-white p-6 md:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Por que são gratuitas
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Estas ferramentas dão uma primeira visão útil de um site sem precisar
          de conta. As consultas de dados têm limites de uso para continuarem
          gratuitas. Para ir além, o RE9 SEO reúne pesquisa de palavras-chave,
          monitoramento de posições, backlinks e auditorias de site em um só
          lugar.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <a
            href="https://seo.agenciare9.com.br/sign-up"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Experimente o RE9 SEO
            <span aria-hidden="true" className="ml-2">
              &rarr;
            </span>
          </a>
          <a
            href="/features"
            className="text-sm font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            Ver todos os recursos
            <span aria-hidden="true" className="ml-1">
              &rarr;
            </span>
          </a>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </article>
  );
}
