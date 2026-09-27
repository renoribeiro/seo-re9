import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/keyword-ranking-report.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { RANK_TRACKING_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/rank-tracking/keyword-ranking-report";

const faqs = [
  {
    question: "O que um relatório de posições de SEO deve incluir?",
    answer:
      "A métrica de negócio das páginas monitoradas comparada ao período anterior, a variação de posições em quatro contagens (entrou no Top 3, entrou na primeira página, saiu da primeira página, sem mudança), as três linhas que explicam a variação com os recursos da SERP anotados, a divisão entre marca e não marca e uma lista curta do trabalho feito e planejado. A tabela completa de palavras-chave vai em anexo.",
  },
  {
    question: "Com que frequência enviar um relatório de posições?",
    answer:
      "Mensalmente para a maioria das empresas, semanalmente se houver um lançamento ou uma migração em andamento. O monitoramento pode checar todo dia; o relatório não deve, porque o ruído de posições de uma semana para outra é real e reportá-lo ensina quem lê a ignorar o relatório.",
  },
  {
    question: "Um relatório de posições deve mostrar a posição média?",
    answer:
      "Não somando todas as palavras-chave. Ela é uma média de consultas sem relação entre si, muda sempre que a lista muda e não significa nada para quem não é de SEO. Informe a posição por palavra-chave nas poucas linhas que importam e contagens de variação para o resto.",
  },
  {
    question: "Como explicar uma queda de posição para um cliente ou gestor?",
    answer:
      "Diga qual é a palavra-chave, a posição anterior e a atual, a URL e o que aparece agora na página de resultados, e depois diga o que você está fazendo a respeito. Se a posição se manteve e os cliques caíram, mostre o recurso da SERP que levou o clique. Uma queda com causa e plano é um relatório normal; uma queda sem nenhum dos dois é um problema.",
  },
  {
    question: "O RE9 SEO gera relatório de posições?",
    answer:
      "Ele fornece as peças: posições monitoradas com as posições anteriores e os recursos da SERP, cliques do Search Console por página e por consulta sem consumir créditos e um MCP para que um assistente monte o relatório a partir de um prompt como o de cima. De propósito, ele não produz uma nota composta.",
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

export const Route = createFileRoute(
  "/_marketing/library/rank-tracking/keyword-ranking-report",
)({
  head: () =>
    buildPageSeo({
      title: "O relatório de posições de palavras-chave que o seu CEO vai ler",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Relatório de posições"
      path={PATH}
      library={RANK_TRACKING_LIBRARY}
    >
      <Content components={{ ...defaultMdxComponents }} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </LibrarySpokePage>
  ),
});
