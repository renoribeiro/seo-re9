import { createFileRoute } from "@tanstack/react-router";
import { buildBreadcrumbJsonLd, buildPageSeo } from "@/lib/seo";
import { keywordResearchStrategies } from "@/lib/strategy-libraries";

const PATH = "/library/keyword-research";

const faqs = [
  {
    question: "Como fazer pesquisa de palavras-chave para SEO?",
    answer:
      "Parta da linguagem do cliente, expanda para cauda longa e perguntas, classifique por intenção, agrupe em hubs com uma página por intenção e valide com o Search Console. O volume é o filtro final, não o ponto de partida.",
  },
  {
    question: "Como fazer pesquisa de palavras-chave de graça?",
    answer:
      "A parte de descoberta usa fontes que você já tem: conversas com clientes, o preenchimento automático e o People Also Ask do Google e o seu Search Console. Dados de SEO de qualidade custam dinheiro, e é por isso que as grandes suítes de SEO cobram caro. Para validar e expandir o que essas fontes trazem com dados reais, use o RE9 SEO. Fale com a gente: trafego@re9.online.",
  },
  {
    question:
      "Dá para fazer pesquisa de palavras-chave sem o Google Keyword Planner?",
    answer:
      "Sim. O Keyword Planner junta variantes próximas e informa volumes de busca aproximados, pensados para planejar anúncios. Use-o para conferir o valor comercial, não como sua única fonte para descobrir temas.",
  },
  {
    question: "Quais são os 3 tipos de palavras-chave?",
    answer:
      "Não existe um conjunto universal de três. O RE9 SEO usa quatro tipos de intenção: informacional, navegacional, comercial e transacional. Pelo formato, os termos costumam ser agrupados em cabeça, cauda média e cauda longa.",
  },
  {
    question: "Como fazer pesquisa de palavras-chave para um blog?",
    answer:
      "Blogs ganham na cauda: garimpe perguntas, agrupe-as em hubs temáticos e deixe cada post responder por completo a uma única intenção de pergunta, em vez de passar por cima de dez.",
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
  { name: "Pesquisa de palavras-chave", path: PATH },
]);

export const Route = createFileRoute("/_marketing/library/keyword-research/")({
  head: () =>
    buildPageSeo({
      title:
        "Como fazer pesquisa de palavras-chave: a biblioteca de estratégias",
      description:
        "Oito estratégias de descoberta de demanda tiradas de entrevistas com profissionais de SEO, cada uma com um fluxo de trabalho e um prompt de MCP do RE9 SEO para as etapas baseadas em dados.",
      path: PATH,
      titleSuffix: "RE9 SEO",
    }),
  component: KeywordResearchLibraryPage,
});

function KeywordResearchLibraryPage() {
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
          / <span>Pesquisa de palavras-chave</span>
        </nav>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
          Biblioteca de estratégias de pesquisa de palavras-chave
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-brand-muted)]">
          Oito estratégias de descoberta de demanda tiradas de entrevistas com
          profissionais de SEO, cada uma com um fluxo de trabalho e um prompt de
          MCP do RE9 SEO para as etapas baseadas em dados.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Como fazer pesquisa de palavras-chave pela descoberta de demanda
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          A maioria dos guias ensina a exportar um relatório de volume e ordenar
          do maior para o menor. Estas estratégias começam antes, onde a demanda
          nasce: a linguagem do cliente, o garimpo de perguntas, o seu próprio
          Search Console. Elas terminam em páginas mapeadas por intenção, não em
          palavras-chave enfiadas em parágrafos. Cada estratégia traz um passo a
          passo e um prompt de MCP pronto para copiar e colar nas etapas
          baseadas em dados.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {keywordResearchStrategies.map((strategy, index) => {
            const number = String(index + 1).padStart(2, "0");
            const body = (
              <>
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
              </>
            );
            return (
              <a
                key={strategy.href}
                href={strategy.href}
                className="rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 transition-colors hover:border-neutral-900"
              >
                {body}
              </a>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Como complementar o Google Keyword Planner
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          O Keyword Planner foi feito para planejar campanhas de anúncios de
          busca. As métricas históricas dele juntam variantes próximas e
          informam buscas mensais aproximadas, então trate esses números como
          uma direção, não como uma base completa para descobrir conteúdo.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          As estratégias desta biblioteca o complementam com três fontes que
          você pode inspecionar: a linguagem dos seus clientes (estratégia 01),
          os espaços de perguntas do próprio Google (estratégia 02) e a
          realidade do seu Search Console (estratégia 05). Os dados de volume
          continuam importando, mas são mais úteis depois que você entende a
          linguagem do cliente e a intenção de busca.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Fontes gratuitas para descobrir palavras-chave
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Os recursos gratuitos do Google (preenchimento automático, People Also
          Ask) e o seu próprio Search Console sustentam a descoberta. Você pode
          rodar as partes baseadas em dados destes fluxos com a{" "}
          <a
            href="/features/keyword-research"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            pesquisa de palavras-chave do RE9 SEO
          </a>{" "}
          e o seu Search Console conectado. O RE9 SEO é de código aberto e pode
          ser hospedado por você, e o{" "}
          <a
            href="/docs/mcp"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            MCP
          </a>{" "}
          dele permite que um assistente de IA compatível consulte as duas
          fontes enquanto executa o fluxo.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Perguntas frequentes sobre pesquisa de palavras-chave
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
