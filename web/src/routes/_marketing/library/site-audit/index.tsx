import { createFileRoute } from "@tanstack/react-router";
import { buildBreadcrumbJsonLd, buildPageSeo } from "@/lib/seo";
import { siteAuditStrategies } from "@/lib/strategy-libraries";

const PATH = "/library/site-audit";

const faqs = [
  {
    question: "O que é uma auditoria técnica de SEO?",
    answer:
      "É verificar se os buscadores conseguem acessar, renderizar e entender as suas páginas. Ela cobre acesso ao rastreamento, códigos de status, sinais de canonical e de indexação, títulos e cabeçalhos, links internos, conteúdo duplicado e tempo de resposta. Vem antes do trabalho de conteúdo e de links, porque um problema de conteúdo numa página que o Google não consegue buscar não é o problema que você tem.",
  },
  {
    question: "O que um checklist de auditoria técnica de SEO deve produzir?",
    answer:
      "Uma ordem de serviço, não uma contagem. Agrupe os achados por tipo de problema em vez de por URL, deixe à vista de quem lê só os problemas que impedem uma página de ser acessada ou entendida e anexe a correção específica a cada um. Um relatório com 1.180 achados em 318 páginas costuma descrever uma dúzia de causas de fundo.",
  },
  {
    question: "Por que as auditorias de SEO geram tantos problemas?",
    answer:
      "Porque a maioria das verificações roda por página e a maioria dos sites usa templates, então um defeito de template se multiplica por todas as páginas que o usam. Duzentas e setenta e nove páginas sem meta description são uma mudança de template, não 279 tarefas. Agrupar por causa é o que transforma o número de volta em trabalho.",
  },
  {
    question: "O que é inchaço de índice e como saber se eu tenho?",
    answer:
      "É ter mais URLs aptas à indexação do que coisas distintas que o site tem a dizer: paginação, parâmetros de filtro, arquivos de tags e links permanentes por item. Um rastreador não consegue dizer se você tem esse problema, porque toda página inchada retorna 200 e passa nas próprias verificações. Em vez disso, inspecione uma amostra das URLs suspeitas no Search Console. Se elas voltarem como desconhecidas para o Google ou canonicalizadas para outra URL, não há nada para apagar.",
  },
  {
    question: "Por que meu rastreador de SEO foi bloqueado?",
    answer:
      "Uma camada de proteção contra bots o recusou, geralmente com um 403, um limite de requisições 429 ou um desafio gerenciado, e geralmente na borda da CDN, não no seu servidor. O Googlebot costuma ficar isento porque os fornecedores o verificam por DNS reverso; rastreadores de terceiros não. Até o acesso ser corrigido, todos os outros números da auditoria cobrem só as páginas que foram entregues.",
  },
  {
    question: "Existe ferramenta gratuita de auditoria de SEO?",
    answer:
      "Em parte. O Google Search Console mostra cobertura e indexação da sua propriedade verificada sem custo, e é mais confiável do que qualquer estimativa de terceiros para tudo o que é específico do Google. Um rastreador acrescenta a visão on-page e de links internos que o Search Console não dá. O RE9 SEO é de código aberto e faz esse rastreamento. Fale com a gente: trafego@re9.online.",
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
  { name: "Auditoria do site", path: PATH },
]);

export const Route = createFileRoute("/_marketing/library/site-audit/")({
  head: () =>
    buildPageSeo({
      title: "Auditoria técnica de SEO: a biblioteca de estratégias",
      description:
        "Três estratégias de auditoria para transformar um rastreamento em trabalho planejado: triagem por gravidade, um relatório que seja aprovado e a decisão do que apagar. Cada uma traz um fluxo de trabalho e um prompt de MCP do RE9 SEO.",
      path: PATH,
      titleSuffix: "RE9 SEO",
    }),
  component: SiteAuditLibraryPage,
});

function SiteAuditLibraryPage() {
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
          / <span>Auditoria do site</span>
        </nav>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
          Biblioteca de estratégias de auditoria do site
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-brand-muted)]">
          Três estratégias para transformar um rastreamento em trabalho
          planejado: faça a triagem dos achados por gravidade, escreva o
          relatório para que ele seja aprovado e decida quais páginas devem
          deixar de existir. Cada uma traz um fluxo de trabalho e um prompt de
          MCP do RE9 SEO pronto para copiar e colar.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Como fazer uma auditoria do site que termine em correções?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Ordene os achados por gravidade, decida quais merecem entrar na sprint
          de alguém e escreva a justificativa para que o trabalho seja
          autorizado. Apagar páginas é uma decisão separada, que precisa das
          próprias evidências.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {siteAuditStrategies.map((strategy, index) => {
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
          Por que a maioria das auditorias para um passo antes
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Um rastreador é bom em encontrar problemas e não tem opinião sobre
          quais deles importam para o seu negócio. Então o resultado é uma
          lista, a lista é longa, e o trabalho caro de decidir o que fazer com
          ela fica para depois, até ninguém lembrar por que o rastreamento foi
          feito. Auditorias não falham porque os achados estão errados. Falham
          porque uma descrição correta de 1.180 problemas não dá a quem paga por
          ela nenhum jeito de decidir nada.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Dois hábitos fecham a maior parte dessa distância. Agrupe os achados
          pela causa de fundo, não por URL, porque um site feito com templates
          transforma um erro em centenas de linhas. E leve a correção junto com
          o achado, para que quem lê o relatório não precise sair pesquisando o
          que é um conflito de canonical antes de agir.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          O que a auditoria do site do RE9 SEO verifica
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          O rastreador respeita o robots.txt e fica na mesma origem. Ele
          verifica 27 tipos de problema em três níveis de gravidade: quatro
          críticos (rastreador bloqueado, erro 5xx, link interno quebrado,
          título ausente), 14 alertas que cobrem títulos e descrições
          duplicados, conteúdo duplicado, H1 ausente ou múltiplo, cadeias e
          loops de redirecionamento, conflitos de canonical, conteúdo raso,
          texto alternativo de imagem ausente, páginas órfãs e sem saída, e nove
          verificações informativas de tamanho, ordem de cabeçalhos, tempo de
          resposta e sinais intencionais de noindex ou canonical. Todo problema
          traz um <code>how_to_fix</code> escrito para aquele tipo de problema.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          Você pode rodar tudo isso pela página de{" "}
          <a
            href="/features/site-audit"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            auditoria do site
          </a>{" "}
          ou pelo{" "}
          <a
            href="/docs/mcp"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            MCP do RE9 SEO
          </a>
          , que permite a um assistente de IA compatível iniciar o rastreamento,
          acompanhar o andamento, ler os problemas com suas correções e cruzar
          URLs específicas com o Google Search Console numa só conversa. A skill
          de agente{" "}
          <a
            href="/docs/skills/seo-audit"
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            seo-audit
          </a>{" "}
          empacota os mesmos passos como um comando reutilizável.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-brand-muted)]">
          O Lighthouse é opcional e analisa uma amostra de até 10 páginas
          representativas, não todas as URLs.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Onde a auditoria precisa de dados que o rastreamento não tem
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700">
          Alguns dos resultados mais valiosos de uma auditoria são decisões, não
          defeitos, e nenhum rastreador vai mostrá-los como uma linha.
        </p>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
          <li>
            Quais páginas quebradas alguém realmente visitaria. A gravidade é
            uma propriedade do problema; o valor é uma propriedade da página.
            Cruze a lista crítica com as suas{" "}
            <a
              href="/library/keyword-research/gsc-programmatic-discovery"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              consultas e páginas do Search Console
            </a>{" "}
            e as correções que importam se separam das que são apenas corretas.
          </li>
          <li>
            Se um paredão de URLs quase idênticas está mesmo no índice. Um
            rastreador relata 800 páginas saudáveis; a inspeção de URL mostra
            que o Google nunca buscou 795 delas.
          </li>
          <li>
            Se a vantagem de um concorrente é técnica ou estrutural. Antes de
            refazer um template, confira os{" "}
            <a
              href="/library/competitive-analysis/find-your-real-competitors"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
            >
              domínios que realmente ocupam seus resultados
            </a>
            , porque metade deles costuma ser de diretórios que você nunca iria
            ultrapassar.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Perguntas frequentes sobre auditoria do site
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
            Faça uma auditoria do site com o seu próprio agente
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
