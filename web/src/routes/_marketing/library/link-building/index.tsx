import { createFileRoute } from "@tanstack/react-router";
import { buildBreadcrumbJsonLd, buildPageSeo } from "@/lib/seo";
import { linkBuildingStrategies } from "@/lib/strategy-libraries";

const PATH = "/library/link-building";

const faqs = [
  {
    question: "O que é link building?",
    answer:
      "É fazer com que outros sites apontem links para o seu, para que os buscadores e as pessoas desses sites tratem suas páginas como dignas de indicação. Os links que contam vêm de sites sobre o mesmo assunto, e o número que move as posições é quantos sites diferentes apontam para você, não quantos links existem.",
  },
  {
    question: "Backlinks ainda importam para SEO?",
    answer:
      "Sim, e os profissionais do podcast acham que podem importar ainda mais à medida que ficam mais raros. O que mudou foi quais deles contam: sites relevantes da sua área valem mais do que sites com nota alta de outra área, e domínios de referência distintos valem mais do que links repetidos do mesmo site. Os sistemas de busca com IA também se apoiam nos mesmos sinais de autoridade baseados em links.",
  },
  {
    question:
      "Qual é uma boa estratégia de link building para um pequeno negócio?",
    answer:
      "Faça coisas que um site local noticiaria: patrocine, participe, organize, limpe uma praça. Peça uma menção às empresas que atendem o mesmo cliente e não competem com você. Crie uma ferramenta que as pessoas da sua área procuram. Depois, conte domínios de referência, não backlinks, e ignore quem manda e-mail oferecendo links à venda.",
  },
  {
    question: "Quantos backlinks eu preciso para ranquear?",
    answer:
      "Tantos domínios de referência quanto as páginas que estão à sua frente têm, vindos de sites da mesma área. A contagem de backlinks é um guia ruim, porque um único site pode fornecer centenas deles. Veja no perfil de um concorrente o número de domínios de referência e, na análise de lacunas de backlinks, os domínios que apontam para ele e não para você.",
  },
  {
    question: "Como o RE9 SEO ajuda no link building?",
    answer:
      "A ferramenta de backlinks mostra, para qualquer domínio, os backlinks, os domínios de referência, as páginas mais linkadas, o texto âncora, dofollow ou nofollow, o domain rank, o spam score e o status de link quebrado, com filtros e exportação. Um verificador de backlinks gratuito mostra o resumo sem precisar de conta. O MCP entrega resumos de backlinks e as linhas individuais de backlinks; use o app para a tabela de páginas principais. A skill de prospecção de links empacota o fluxo de concorrentes.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbLd = buildBreadcrumbJsonLd([
  { name: "Biblioteca de estratégias", path: "/library" },
  { name: "Link building", path: PATH },
]);

export const Route = createFileRoute("/_marketing/library/link-building/")({
  head: () =>
    buildPageSeo({
      title: "Link building: a biblioteca de estratégias",
      description:
        "Três estratégias de link building de profissionais que vivem de conseguir links: audite um perfil de backlinks sem confiar cegamente na nota, reporte domínios de referência em vez de backlinks e conquiste links a partir das páginas que já os recebem. Cada uma traz um fluxo de trabalho e um prompt de MCP do RE9 SEO.",
      path: PATH,
      titleSuffix: "RE9 SEO",
    }),
  component: LinkBuildingLibraryPage,
});

function LinkBuildingLibraryPage() {
  return (
    <article className="mx-auto max-w-5xl">
      <header className="max-w-3xl">
        <nav
          aria-label="Trilha de navegação"
          className="text-sm text-[var(--color-brand-muted)]"
        >
          <a
            href="/library"
            className="font-medium text-[var(--color-brand-accent)]"
          >
            Biblioteca de estratégias
          </a>{" "}
          / <span>Link building</span>
        </nav>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
          Biblioteca de estratégias de link building
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-brand-muted)]">
          Três estratégias para quem precisa aumentar a autoridade de um site
          sem verba para links: como ler um perfil de backlinks sem confiar
          cegamente na nota, qual número reportar e de onde vêm os próximos
          links. Cada uma parte de um perfil real e traz um prompt de MCP do RE9
          SEO pronto para copiar e colar.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Como conseguir links que contam?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Leia o que você já tem, conte as fontes distintas e veja quais páginas
          já estão atraindo atenção.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {linkBuildingStrategies.map((strategy, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <a
                key={strategy.href}
                href={strategy.href}
                className="rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 transition-colors hover:border-neutral-900"
              >
                <span className="font-mono text-sm tabular-nums text-[var(--color-brand-accent)]">
                  {number}
                </span>
                <h3 className="mt-3 text-base font-semibold text-neutral-950">
                  {strategy.title}
                  <span
                    aria-hidden="true"
                    className="ml-1 text-[var(--color-brand-accent)]"
                  >
                    &rarr;
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-brand-muted)]">
                  {strategy.description}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Por que a maior parte do link building gera os links errados
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Link building é a parte do SEO com mais vendedores e menos medição. Os
          vendedores ordenam a web por uma nota, e a nota é fácil de comprar.
          Num perfil real, os três links mais novos vieram de um domínio de
          cassino e de dois vendedores de links, sem ninguém ter pedido, e o
          domínio de cassino tinha um domain rank maior do que os sites
          relevantes abaixo dele. Uma estratégia baseada na nota teria contado
          isso como vitória.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Os profissionais do podcast Unscripted SEO, pessoas que conseguem
          links para clientes e testam nos próprios sites, descrevem outra
          ordem. Primeiro a relevância: um link de um site sobre o seu assunto,
          para uma página sobre esse assunto. Depois a diversidade: quantos
          sites diferentes, não quantos links. As três estratégias acima seguem
          essa ordem, e cada uma parte de um perfil de backlinks real, não
          hipotético.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          O que a análise de backlinks do RE9 SEO mostra
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Informe qualquer domínio, o seu ou o de um concorrente, e a visão
          geral mostra backlinks, domínios de referência, páginas de referência,
          domain rank, spam score e backlinks e páginas quebrados, com um ano de
          histórico de backlinks e de domínios de referência e os backlinks
          novos e perdidos por mês. Abaixo ficam três tabelas: cada backlink com
          página de origem, página de destino, texto âncora, marcação dofollow
          ou nofollow, domain rank, spam score e data da primeira descoberta;
          cada domínio de referência com sua contagem de backlinks e problemas;
          e suas páginas principais pelos links que atraem.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          A tabela de backlinks mostra uma linha por domínio de referência por
          padrão, ou cada link individual, e filtra por domain rank, spam score,
          tipo de link e termos da origem. Tudo pode ser exportado. O{" "}
          <a
            href="/backlink-checker"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            verificador de backlinks gratuito
          </a>{" "}
          mostra o resumo e os 15 principais links de qualquer domínio sem
          precisar de conta. No app, uma visão geral do domínio consome cerca de
          50 créditos, e uma página com 100 linhas de backlinks, cerca de 30.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Você pode rodar tudo isso pela página do{" "}
          <a
            href="/features/backlink-checker"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            verificador de backlinks
          </a>
          . O{" "}
          <a
            href="/docs/mcp"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            MCP do RE9 SEO
          </a>{" "}
          entrega a um assistente de IA a visão geral e as linhas de backlinks,
          junto com o Search Console e os dados de palavras-chave, numa só
          conversa. Use o app para a tabela de páginas principais. A{" "}
          <a
            href="/docs/skills/link-prospecting"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            skill de prospecção de links
          </a>{" "}
          empacota o fluxo de concorrentes.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Onde o link building termina
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Três coisas que um perfil de backlinks não consegue dizer, e onde
          encontrá-las.
        </p>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
          <li>
            Quais domínios apontam para seus concorrentes e não para você. Isso
            é uma comparação entre perfis, e a{" "}
            <a
              href="/library/competitive-analysis/backlink-gap-analysis"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              análise de lacunas de backlinks
            </a>{" "}
            da biblioteca de análise de concorrentes é a estratégia para isso.
          </li>
          <li>
            Se a menção contou mesmo sem link. Menções de marca sem link e
            citações são o que os assistentes de IA usam para decidir quem
            recomendar; um convidado citou dados mostrando que a maior parte do
            que faz uma marca ser citada numa resposta de IA está fora do
            próprio domínio dela. A{" "}
            <a
              href="/features/ai-brand-visibility"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              visibilidade da marca em IA
            </a>{" "}
            mede esse lado; uma ferramenta de backlinks, não.
          </li>
          <li>
            Se a página merecia o link. Uma página que conquista links costuma
            ser uma ferramenta, um dado ou um evento, e{" "}
            <a
              href="/library/keyword-research/positioning-to-demand"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              ligar o posicionamento à demanda
            </a>{" "}
            é o jeito de decidir o que construir antes de pedir a alguém que
            aponte para ela.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Perguntas frequentes sobre link building
        </h2>
        <div className="mt-5 divide-y divide-[var(--color-border-subtle)] rounded-lg border border-[var(--color-border-subtle)] bg-white">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-5">
              <h3 className="text-sm font-semibold text-neutral-900">
                {faq.question}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-[var(--color-brand-muted)]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-col items-start justify-between gap-4 rounded-xl border border-[var(--color-border-subtle)] bg-white p-6 sm:flex-row sm:items-center md:p-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Leia o seu perfil de backlinks com o seu próprio agente
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-brand-muted)]">
            Cada estratégia termina com um prompt de MCP pronto para copiar e
            colar. O RE9 SEO é de código aberto. Fale com a gente:
            trafego@re9.online.
          </p>
        </div>
        <a
          href="https://seo.agenciare9.com.br/sign-up"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-neutral-950 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Começar com o RE9 SEO
          <span aria-hidden="true" className="ml-2">
            &rarr;
          </span>
        </a>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </article>
  );
}
