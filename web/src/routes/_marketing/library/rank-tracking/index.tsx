import { createFileRoute } from "@tanstack/react-router";
import { buildBreadcrumbJsonLd, buildPageSeo } from "@/lib/seo";
import { rankTrackingStrategies } from "@/lib/strategy-libraries";

const PATH = "/library/rank-tracking";

const faqs = [
  {
    question: "O que é monitoramento de posições?",
    answer:
      "É verificar, de forma agendada, onde um site aparece nos resultados do Google para um conjunto escolhido de palavras-chave, a partir de uma localização e de um dispositivo escolhidos, registrando a posição a cada vez para ver a variação. Ele responde a uma pergunta mais estreita e mais precisa do que o Search Console, que informa uma posição média entre todas as pessoas que buscaram.",
  },
  {
    question: "Quantas palavras-chave devo monitorar?",
    answer:
      "De vinte a cinquenta para a maioria dos sites. Tire-as do Search Console, onde dá para ver quais consultas já mostram seu site entre as posições 4 e 20 com impressões reais, ligue cada uma a uma página que gera leads ou receita e acrescente um ou dois termos de marca como controle. Um monitoramento com 500 linhas é um relatório que ninguém lê.",
  },
  {
    question: "Com que frequência devo checar as posições?",
    answer:
      "Semanalmente é o padrão útil. As posições mudam de um dia para o outro por motivos que não têm nada a ver com o seu trabalho, e uma checagem diária registra principalmente esse ruído, por cerca de sete vezes o custo. Cheque diariamente durante uma migração ou um lançamento e depois volte ao semanal.",
  },
  {
    question: "Devo monitorar posições no Mobile ou no Desktop?",
    answer:
      "Mobile, a menos que você saiba que seus clientes buscam pelo computador. A maioria das consultas hoje é mobile-first, e as duas páginas de resultados são diferentes. O RE9 SEO usa Mobile por padrão e pode monitorar os dois, o que dobra o custo de cada checagem.",
  },
  {
    question: "O Google Search Console serve para monitorar posições?",
    answer:
      "Não exatamente. Ele informa uma posição média por consulta, misturando dispositivos, países e datas, e só do seu próprio site. A visão de 24 horas mostra dados recentes preliminares; os relatórios finais chegam depois. Isso basta para um site com uma única localização que quer uma direção. Um monitoramento acrescenta a posição exata por palavra-chave e dispositivo, a URL que ranqueia, os recursos da SERP e os concorrentes, e cada checagem tem custo.",
  },
  {
    question: "Quanto custa o monitoramento de posições no RE9 SEO?",
    answer:
      "Depende das palavras-chave, dos dispositivos, da profundidade e do agendamento, e o app mostra a estimativa antes de rodar qualquer coisa. Instalações auto-hospedadas pagam o provedor de dados diretamente. Para saber mais, fale com a gente: trafego@re9.online.",
  },
  {
    question: "Posso monitorar posições locais em uma cidade específica?",
    answer:
      "Sim. Cada monitoramento mede as posições orgânicas do site a partir de uma localização escolhida, então você pode acompanhar as mesmas palavras-chave em várias cidades. Para posições do Perfil da Empresa no Maps, use a grade de posições local do MCP, que busca a partir de cada ponto de uma grade 3x3 ou 5x5.",
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
  { name: "Monitoramento de posições", path: PATH },
]);

export const Route = createFileRoute("/_marketing/library/rank-tracking/")({
  head: () =>
    buildPageSeo({
      title: "Monitoramento de posições: a biblioteca de estratégias",
      description:
        "Quatro estratégias de monitoramento de posições para quem presta contas de SEO sem ter verba de SEO: escolha as palavras-chave, saiba onde o Search Console para, monitore posições locais do jeito certo e escreva o relatório que é lido. Cada uma traz um fluxo de trabalho e um prompt de MCP do RE9 SEO.",
      path: PATH,
      titleSuffix: "RE9 SEO",
    }),
  component: RankTrackingLibraryPage,
});

function RankTrackingLibraryPage() {
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
          / <span>Monitoramento de posições</span>
        </nav>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
          Biblioteca de estratégias de monitoramento de posições
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-brand-muted)]">
          Quatro estratégias para quem precisa mostrar um número a alguém todo
          mês: quais palavras-chave monitorar e quantas, onde param os dados
          gratuitos do Search Console, como monitorar um negócio local a partir
          de onde os clientes estão e como escrever o relatório de posições que
          é lido. Cada uma traz um fluxo de trabalho e um prompt de MCP do RE9
          SEO pronto para copiar e colar.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Como monitorar posições de palavras-chave sem desperdiçar a verba?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Parta do que o Search Console já mostra, monitore só o que alguém vai
          ler, meça posições locais a partir de onde os clientes estão e
          apresente as variações como explicação para o número do negócio, não
          como uma tabela.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {rankTrackingStrategies.map((strategy, index) => {
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
          Por que o monitoramento de posições é contratado e depois ignorado
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          O monitoramento de posições é a ferramenta de SEO mais fácil de
          justificar e a mais fácil de parar de ler. É contratado porque posição
          é o número que todo mundo entende. É ignorado porque uma tabela com
          300 palavras-chave e setas verdes e vermelhas não diz a quem paga se
          aconteceu algo que importa, e depois de uns dois meses a pessoa para
          de abrir.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          A solução vem antes da ferramenta. Monitore uma lista curta escolhida
          no Search Console, para que cada linha seja uma consulta em que o
          Google já mostra seu site e uma página que gera algum resultado.
          Depois, apresente as posições como explicação para o que aconteceu com
          os cliques, não como manchete. As quatro estratégias acima seguem essa
          sequência: escolher, medir, medir localmente se o negócio for local,
          reportar.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          O que o monitoramento de posições do RE9 SEO verifica
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Um monitoramento é um domínio, uma localização e um idioma. Você
          escolhe os dispositivos (Mobile, Desktop ou ambos; Mobile por padrão),
          a profundidade (do Top 10 aos 100 primeiros resultados, 40 por padrão)
          e o agendamento (manual, diário, semanal ou mensal). Cada checagem
          registra, por palavra-chave e dispositivo, a posição, a posição
          anterior, a URL que ranqueou e os recursos da SERP na página. Um
          monitoramento comporta até 1.000 palavras-chave, e um projeto comporta
          até 500 monitoramentos, e é assim que você acompanha várias
          localizações de um mesmo negócio.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Criar um monitoramento e adicionar palavras-chave não tem custo. As
          checagens consomem créditos, e o app mostra uma estimativa antes de
          cada inclusão agendada e de cada execução ao vivo. Checagens agendadas
          passam por uma fila bem mais barata por palavra-chave do que uma
          checagem avulsa ao vivo. Quantidade de palavras-chave, dispositivos,
          profundidade e agendamento se multiplicam: usar os dois dispositivos
          dobra o custo, e checagens diárias o multiplicam por cerca de sete.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Instalações auto-hospedadas pagam o provedor de dados diretamente. As
          leituras do Search Console, que as estratégias daqui usam bastante,
          não consomem créditos.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Você pode rodar tudo isso pela página de{" "}
          <a
            href="/features/rank-tracking"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            monitoramento de posições
          </a>{" "}
          ou pelo{" "}
          <a
            href="/docs/mcp"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            MCP do RE9 SEO
          </a>
          , que expõe o monitoramento a um assistente de IA: criar, estimar o
          custo, adicionar e remover palavras-chave, rodar uma checagem e ler as
          posições mais recentes, junto com o Search Console e a grade de
          posições local, na mesma conversa.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Onde o monitoramento de posições termina
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Três coisas que um monitoramento não consegue dizer, e onde
          encontrá-las.
        </p>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
          <li>
            Se alguém clicou. Posições descrevem uma página de resultados;
            cliques descrevem o que as pessoas fizeram nela. O Search Console é
            o registro, e a{" "}
            <a
              href="/library/keyword-research/gsc-programmatic-discovery"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              descoberta programática com o Search Console
            </a>{" "}
            é o jeito de lê-lo em escala. É um registro incompleto: parte dos
            cliques chega por consultas que o Search Console nunca informa.
          </li>
          <li>
            Se a palavra-chave valia a pena. Um termo pode ir da posição 14 para
            a 4 e não mudar nada, porque a demanda nunca existiu ou a intenção
            estava errada. O{" "}
            <a
              href="/library/keyword-research/search-intent-mapping"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              mapeamento de intenção de busca
            </a>{" "}
            vem antes do monitoramento, não depois.
          </li>
          <li>
            Se um assistente de IA recomenda você. As ferramentas que monitoram
            isso dão só uma direção; as respostas são personalizadas e não há
            relatório oficial por trás delas. Reporte isso como um sinal, ao
            lado do monitoramento, nunca como o mesmo tipo de número.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Perguntas frequentes sobre monitoramento de posições
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
            Monitore posições com o seu próprio agente
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
