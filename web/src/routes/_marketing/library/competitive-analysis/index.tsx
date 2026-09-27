import { createFileRoute } from "@tanstack/react-router";
import { buildBreadcrumbJsonLd, buildPageSeo } from "@/lib/seo";
import { competitiveAnalysisStrategies } from "@/lib/strategy-libraries";

const PATH = "/library/competitive-analysis";

const faqs = [
  {
    question: "O que é análise de concorrentes em SEO?",
    answer:
      "É descobrir quais domínios ocupam os resultados de busca que você quer, pelo que eles ranqueiam e você não, e se a vantagem deles vem de conteúdo, links, marca ou de poucas páginas fortes. É diferente da análise de concorrentes do negócio porque a busca ranqueia páginas, não empresas. Por isso, os domínios que levam seus cliques muitas vezes não são as empresas que levam suas vendas.",
  },
  {
    question: "Como encontrar os sites dos seus concorrentes?",
    answer:
      "Compare um conjunto de palavras-chave em que você quer ranquear e veja quais domínios aparecem nesses resultados. Uma lista medida a partir de SERPs reais é mais confiável do que uma lista feita de memória e costuma incluir diretórios, marketplaces e plataformas de vídeo ao lado das empresas que você esperava.",
  },
  {
    question: "Quais são os tipos de análise de concorrentes?",
    answer:
      "Para busca, três grupos importam mais do que qualquer modelo formal. Concorrentes diretos vendem o que você vende e ranqueiam no que você quer. Resultados estruturais, como diretórios e marketplaces, ocupam posições pela categoria, não pelo mérito. Concorrentes acidentais ranqueiam com uma única página forte. Cada grupo pede uma resposta diferente, e tratar os três do mesmo jeito é o erro mais comum numa análise de concorrentes.",
  },
  {
    question: "Existe ferramenta gratuita de análise de concorrentes?",
    answer:
      "A parte do raciocínio é gratuita: leia as SERPs que importam para você, leia as páginas dos concorrentes e confira o seu próprio Search Console. O que custa dinheiro são os dados de palavras-chave ranqueadas e de backlinks do lado do concorrente, e é por isso que as grandes suítes de SEO cobram caro. O RE9 SEO é de código aberto e traz esses dados. Fale com a gente: trafego@re9.online.",
  },
  {
    question: "Quão precisas são as estimativas de tráfego dos concorrentes?",
    answer:
      "Úteis como direção e pouco confiáveis como número. As estimativas são modeladas a partir de palavras-chave ranqueadas, volumes de busca estimados e taxas de clique presumidas, então herdam todos os erros dos três e somam todas as linhas de negócio que um domínio opera. Trate a estimativa como ordem de grandeza e tendência, não como um número para planejar receita.",
  },
  {
    question: "O que é análise de lacunas de palavras-chave?",
    answer:
      "É o conjunto de palavras-chave em que um concorrente ranqueia e você não. Ela só é útil depois que os termos de marca são removidos dos dois lados; do contrário, a maior parte da diferença é só o fato de as duas empresas terem nomes diferentes.",
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
  { name: "Análise de concorrentes", path: PATH },
]);

export const Route = createFileRoute(
  "/_marketing/library/competitive-analysis/",
)({
  head: () =>
    buildPageSeo({
      title: "Análise de concorrentes em SEO: a biblioteca de estratégias",
      description:
        "Quatro estratégias de pesquisa de concorrentes para descobrir quem realmente ranqueia contra você, medir a lacuna com honestidade e decidir o que vale a pena conquistar. Cada uma traz um fluxo de trabalho e um prompt de MCP do RE9 SEO.",
      path: PATH,
      titleSuffix: "RE9 SEO",
    }),
  component: CompetitiveAnalysisLibraryPage,
});

function CompetitiveAnalysisLibraryPage() {
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
          / <span>Análise de concorrentes</span>
        </nav>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
          Biblioteca de estratégias de análise de concorrentes
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-brand-muted)]">
          Quatro estratégias de pesquisa de concorrentes para descobrir quem
          realmente ranqueia contra você, medir a lacuna com honestidade e
          decidir o que vale a pena conquistar. Cada uma traz um fluxo de
          trabalho e um prompt de MCP do RE9 SEO pronto para copiar e colar.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Como fazer uma análise de concorrentes para SEO?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Não é preenchendo um modelo. A busca ranqueia páginas, não empresas,
          então a sequência útil é medir quem ocupa os resultados que você quer,
          tirar o ruído da comparação, conferir se a vantagem deles é tão grande
          quanto o número principal sugere e só então decidir o que construir.
          Estas quatro estratégias seguem essa ordem.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {competitiveAnalysisStrategies.map((strategy, index) => {
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
          Por que modelos de análise de concorrentes não servem para SEO
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          A maior parte do material sobre análise de concorrentes é escrita para
          um plano de negócios. Ele pede que você liste os rivais, tabele preços
          e posicionamento e resuma forças e fraquezas. Vale a pena escrever
          esse documento, mas ele não vai dizer qual página publicar em seguida.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          A concorrência na busca é decidida por consulta e por página. A
          empresa para a qual você perde vendas pode nem aparecer nos seus
          resultados, e um diretório em que você nunca pensou pode ocupar três
          das dez posições que você quer. Uma análise de concorrentes útil para
          SEO precisa partir da SERP e ir para trás, e é por isso que toda
          estratégia aqui começa com dados medidos, não com uma lista de nomes.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          O que as ferramentas de análise de concorrentes entregam de fato
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Todo número num relatório de concorrentes é modelado de fora do
          negócio que ele descreve. As palavras-chave ranqueadas são reais, no
          sentido de que um robô viu a posição. Estimativas de tráfego não são
          medições. Notas de autoridade são invenções de terceiros que o Google
          não lê. Leia esses números como faixas e tendências, e as ferramentas
          passam a ser realmente úteis. Leia como fatos e você vai planejar um
          trimestre em cima de um número que ninguém consegue gastar.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Você pode rodar as partes baseadas em dados destes fluxos com a{" "}
          <a
            href="/features/domain-overview"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            visão geral do domínio
          </a>{" "}
          e o{" "}
          <a
            href="/features/backlink-checker"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            verificador de backlinks
          </a>{" "}
          do RE9 SEO, ou pelo{" "}
          <a
            href="/docs/mcp"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            MCP do RE9 SEO
          </a>
          , que permite a um assistente de IA compatível comparar domínios,
          puxar palavras-chave ranqueadas e ler perfis de links enquanto executa
          o fluxo. As skills de agente de{" "}
          <a
            href="/docs/skills/competitive-landscape"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            panorama competitivo
          </a>{" "}
          e de{" "}
          <a
            href="/docs/skills/competitor-analysis"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            análise de concorrentes
          </a>{" "}
          empacotam os mesmos passos como comandos reutilizáveis.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Onde a pesquisa de concorrentes encontra a pesquisa de palavras-chave
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Uma análise de concorrentes termina com uma lista de termos, e é aí
          que a{" "}
          <a
            href="/library/keyword-research"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            biblioteca de pesquisa de palavras-chave
          </a>{" "}
          assume o trabalho. As duas se cruzam em três pontos específicos.
        </p>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
          <li>
            O conjunto de palavras-chave usado para comparar concorrentes deve
            vir da linguagem do cliente, não da sua própria página de categoria,
            que é a disciplina de{" "}
            <a
              href="/library/keyword-research/seed-from-conversation"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              partir das conversas
            </a>
            .
          </li>
          <li>
            As palavras-chave vindas da lacuna ainda precisam ser agrupadas
            antes de virarem páginas, usando{" "}
            <a
              href="/library/keyword-research/cluster-topical-hubs"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              hubs temáticos
            </a>{" "}
            e{" "}
            <a
              href="/library/keyword-research/search-intent-mapping"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              mapeamento de intenção
            </a>
            .
          </li>
          <li>
            As suas próprias{" "}
            <a
              href="/library/keyword-research/gsc-programmatic-discovery"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              consultas do Search Console
            </a>{" "}
            são o único conjunto de dados de todo este exercício que é medido, e
            não estimado. Use-as para conferir qualquer número de concorrente
            que pareça surpreendente.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Perguntas frequentes sobre análise de concorrentes
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
            Faça uma análise de concorrentes com o seu próprio agente
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
