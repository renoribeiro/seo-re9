import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/local-rank-tracking.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { RANK_TRACKING_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/rank-tracking/local-rank-tracking";

const faqs = [
  {
    question:
      "Por que minhas posições locais aparecem diferentes no meu celular e no de um colega?",
    answer:
      "Porque vocês estão em lugares diferentes, ou o Google acha que estão. A proximidade é um dos sinais mais fortes nas consultas locais, então duas pessoas a poucos quilômetros de distância costumam ver pacotes de mapa diferentes. Um monitoramento que checa a partir de um único ponto mostra só uma dessas visões.",
  },
  {
    question: "O que é uma grade de posições local?",
    answer:
      "Um conjunto de buscas feitas a partir de pontos de uma grade em torno de um local, geralmente 3x3 ou 5x5, que mostra onde uma empresa ranqueia em cada ponto. Ela mostra até onde vai a visibilidade de uma empresa e onde os concorrentes assumem, algo que uma única checagem de posição não mostra.",
  },
  {
    question: "Quantos pontos uma grade de posições local deve ter?",
    answer:
      "Nove, espaçados para cobrir a área que você atende, bastam para ver o formato. Use vinte e cinco quando estiver tomando uma decisão sobre localização. Acima disso, você paga por uma resolução que não vai usar.",
  },
  {
    question:
      "Uma empresa que atende na área do cliente deve cadastrar área de atendimento ou endereço no Google?",
    answer:
      "Use as configurações que correspondem à forma como você atende. Uma loja física elegível que também visita ou entrega aos clientes pode mostrar tanto o endereço quanto a área de atendimento. Se os clientes não vão até o seu endereço, oculte-o e informe a área de atendimento.",
  },
  {
    question: "O RE9 SEO faz monitoramento de posições local?",
    answer:
      "Sim. A grade de posições local do MCP mede as posições do Perfil da Empresa no Maps. Os monitoramentos agendados medem as posições orgânicas do site a partir de uma localização escolhida. Os dois consomem créditos.",
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
  "/_marketing/library/rank-tracking/local-rank-tracking",
)({
  head: () =>
    buildPageSeo({
      title:
        "Monitoramento de posições local: a posição depende de onde a pessoa está",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Monitoramento de posições local"
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
