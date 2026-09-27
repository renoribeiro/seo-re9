import { createFileRoute } from "@tanstack/react-router";
import { buildBreadcrumbJsonLd, buildPageSeo } from "@/lib/seo";
import { aiAgentSeoStrategies } from "@/lib/strategy-libraries";

const PATH = "/library/ai-agent-seo";

const faqs = [
  {
    question: "O que é SEO com agentes de IA?",
    answer:
      "É fazer SEO por meio de um assistente de IA capaz de chamar ferramentas: ler o Search Console, puxar dados de palavras-chave e da SERP, checar posições, rodar um rastreamento e rascunhar a partir dos resultados, tudo dentro de uma conversa. É um jeito de trabalhar, não um jeito de ser encontrado; como os assistentes de IA decidem mencionar sua marca é outro assunto, tratado em visibilidade da marca em IA.",
  },
  {
    question: "A IA pode fazer SEO por mim?",
    answer:
      "Ela busca, filtra, ordena e rascunha mais rápido que uma pessoa. Mas não consegue distinguir uma consulta de robô de uma humana, decidir quais palavras-chave valem a verba nem saber o que um cliente vai colocar em prática. Os fluxos daqui colocam um agente para buscar e rascunhar e mantêm uma pessoa nas decisões e na checagem final.",
  },
  {
    question: "O que é MCP e eu preciso dele para SEO?",
    answer:
      "O Model Context Protocol permite que um assistente de IA chame ferramentas externas e receba dados. Sem ele, o assistente só sabe o que aprendeu no treinamento e o que você cola na conversa. Com um servidor MCP de SEO conectado, ele lê dados próprios e de pesquisa diretamente. O do RE9 SEO se conecta ao Claude Code, ao Claude Desktop, ao Codex e ao Cursor.",
  },
  {
    question: "Quais tarefas de SEO devem ser automatizadas e quais não?",
    answer:
      "Automatize tudo que tem entrada e saída fixas e não exige julgamento: checagens de posições agendadas, extrações do Search Console, exportações. Deixe um agente fazer o trabalho de entrada variável que uma pessoa vai ler: resumos, classificações, rascunhos. Mantenha as decisões com uma pessoa: o que monitorar, o que construir, o que dizer ao cliente e qualquer processo que você ainda não consegue descrever por escrito.",
  },
  {
    question: "A IA deve escrever meu conteúdo de SEO?",
    answer:
      "Ela deve escrever o rascunho, a partir de um briefing escrito por uma pessoa com o leitor, os dados e citações literais. Não deve escrever o briefing, e uma pessoa deve editar o resultado com uma revisão de fatos e outra de frases com cara de texto de máquina. Equipes que fazem o ciclo ao contrário produzem páginas bem acabadas e sem nada dentro.",
  },
  {
    question: "Como tornar repetível o trabalho de SEO de um agente de IA?",
    answer:
      "Três hábitos: salve o fluxo como um arquivo de skill que o assistente lê, dê a ele uma memória, como um contexto do projeto carregado antes de cada execução, e faça-o registrar cada chamada de ferramenta, para que cada número do resultado aponte para uma fonte de dados. Um chat em branco é o jeito de usar um modelo com mais variação; esses hábitos eliminam a maior parte dela.",
  },
  {
    question: "O que o MCP do RE9 SEO entrega a um agente?",
    answer:
      "Desempenho na busca e inspeção de URL do Search Console sem consumir créditos, métricas e pesquisa de palavras-chave, resultados da SERP ao vivo, dados de domínio e de backlinks, monitoramento de posições com estimativa de custo, auditorias do site, grades de posições locais e o contexto compartilhado do projeto. Skills de agente para pesquisa de palavras-chave, análise de concorrentes, auditoria do site, SEO local, prospecção de links, relatórios e configuração de projeto são instaladas junto.",
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
  { name: "SEO com agentes de IA", path: PATH },
]);

export const Route = createFileRoute("/_marketing/library/ai-agent-seo/")({
  head: () =>
    buildPageSeo({
      title: "SEO com agentes de IA: a biblioteca de estratégias",
      description:
        "Quatro estratégias para fazer SEO por um assistente de IA: conecte o MCP e rode os cinco primeiros prompts, decida o que fica com um agendamento e o que fica com uma pessoa, mantenha o briefing humano e torne a boa execução repetível com skills, memória e rastro. Cada uma traz um fluxo de trabalho e um prompt de MCP do RE9 SEO.",
      path: PATH,
      titleSuffix: "RE9 SEO",
    }),
  component: AiAgentSeoLibraryPage,
});

function AiAgentSeoLibraryPage() {
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
          / <span>SEO com agentes de IA</span>
        </nav>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
          Biblioteca de estratégias de SEO com agentes de IA
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-brand-muted)]">
          Quatro estratégias para quem já tem o Claude, o Codex ou o Cursor
          aberto e quer que o trabalho de SEO aconteça ali: o que conectar e os
          cinco primeiros prompts, o que fica com um agendamento e o que fica
          com uma pessoa, por que o briefing é trabalho humano e como fazer uma
          boa execução acontecer de novo. Todas partem de execuções reais pelo
          MCP do RE9 SEO e terminam com um prompt pronto para copiar e colar.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Como fazer SEO com um agente de IA sem perder o rumo?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Dê os dados ao agente, fique com as decisões, escreva você mesmo o
          briefing e faça cada execução deixar um rastro.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {aiAgentSeoStrategies.map((strategy, index) => {
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
          Por que esta biblioteca é diferente de visibilidade em IA
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Duas coisas diferentes são chamadas de &ldquo;SEO com IA&rdquo;, e
          elas apontam para direções opostas. Uma é você usar um assistente de
          IA para fazer o trabalho: puxar os dados, rodar a auditoria, rascunhar
          a página. A outra é um assistente de IA mencionar sua marca quando
          alguém faz uma pergunta. Esta biblioteca trata da primeira. Ela nunca
          ensina como ser lido por um modelo; ensina como fazer o trabalho por
          meio de um, e onde a pessoa continua. Ser citado é assunto da{" "}
          <a
            href="/features/ai-brand-visibility"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            visibilidade da marca em IA
          </a>
          .
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Os profissionais destas quatro páginas fazem SEO com agentes todos os
          dias, para clientes e nos próprios sites, e concordam em mais coisas
          do que se imagina: o agente é um motorista rápido com pouca atenção, a
          pessoa é o despachante, o briefing é onde o conhecimento mora, e a
          execução que não pode ser repetida não valeu os tokens. Toda
          estratégia parte de uma chamada real pelo MCP do RE9 SEO, inclusive
          aquela em que os dados voltaram com o próprio prompt de um agente de
          IA dentro.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          O que o MCP do RE9 SEO entrega a um agente
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Um servidor, conectado ao Claude Code, ao Claude Desktop, ao Codex ou
          ao Cursor. Por ele, o assistente lê o desempenho na busca e a inspeção
          de URL do Search Console de uma propriedade conectada sem consumir
          créditos, puxa métricas e pesquisa de palavras-chave, busca resultados
          da SERP ao vivo, lê dados de domínio e de backlinks, cria e roda
          monitoramentos de posições com estimativa de custo antes, inicia e lê
          auditorias do site, roda grades de posições locais e lê e atualiza o
          contexto compartilhado do projeto. Chamadas de pesquisa que acessam um
          provedor de dados consomem créditos e avisam antes de rodar.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Junto com ele, as{" "}
          <a
            href="/docs/skills"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            skills de agente
          </a>{" "}
          são arquivos SKILL.md que ensinam o assistente a usar essas
          ferramentas, cada uma para um trabalho: pesquisa de palavras-chave,
          análise de concorrentes, auditoria do site, SEO local, prospecção de
          links, relatórios e configuração de projeto, com um coach de SEO que
          escolhe o fluxo se você estiver em dúvida. O{" "}
          <a
            href="/google-search-console-mcp"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            MCP do Search Console
          </a>{" "}
          não exige projeto no Google Cloud nem configuração de OAuth própria. A
          configuração de cada cliente está na{" "}
          <a
            href="/docs/mcp"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            documentação do MCP
          </a>
          .
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Onde esta biblioteca termina
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Três coisas que um fluxo com agente não consegue dar, e onde
          encontrá-las.
        </p>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
          <li>
            Se um assistente de IA recomenda você. Essa é a outra direção da
            seta, medida pela{" "}
            <a
              href="/features/ai-brand-visibility"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              visibilidade da marca em IA
            </a>{" "}
            e pelos{" "}
            <a
              href="/features/ai-search-prompts"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              prompts de busca com IA
            </a>
            , e movida pelas mesmas coisas que movem o Google: links relevantes,
            menções e um site que responde à pergunta.
          </li>
          <li>
            O julgamento sobre qual palavra-chave vale a pena. Um agente lista
            em segundos todas as consultas entre as posições 4 e 20; o{" "}
            <a
              href="/library/keyword-research/search-intent-mapping"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              mapeamento de intenção de busca
            </a>{" "}
            é como uma pessoa decide quais delas quer.
          </li>
          <li>
            O número que o negócio lê. Um agente rascunha o relatório a partir
            do{" "}
            <a
              href="/features/rank-tracking"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              monitoramento de posições
            </a>{" "}
            e do Search Console; o formato que é lido é o que uma pessoa dá a
            ele.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Perguntas frequentes sobre SEO com agentes de IA
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
            Conecte o MCP e rode o primeiro prompt
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
