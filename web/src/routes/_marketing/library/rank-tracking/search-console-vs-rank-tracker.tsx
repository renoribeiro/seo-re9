import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/search-console-vs-rank-tracker.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { RANK_TRACKING_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/rank-tracking/search-console-vs-rank-tracker";

const faqs = [
  {
    question: "O Google Search Console serve para monitorar posições?",
    answer:
      "Não no sentido usual. Ele informa uma posição média por consulta ou página, misturando dispositivos, países e datas, e só do seu próprio site verificado. A visão de 24 horas mostra dados recentes preliminares; os relatórios finais chegam depois. Um monitoramento de posições registra uma posição por palavra-chave, dispositivo e localização de forma agendada, e pode incluir sites que não são seus.",
  },
  {
    question:
      "Por que a posição do Search Console não bate com a do monitoramento?",
    answer:
      "Porque eles medem coisas diferentes. O Search Console tira a média da sua melhor posição em todas as impressões do período, então um termo que está em 3º lugar num estado e em 15º em outros aparece como algo no meio. Um monitoramento informa a posição a partir de um lugar, num dispositivo, num dia. Uma diferença de algumas posições entre os dois é normal.",
  },
  {
    question: "Quão precisa é a posição média do Search Console?",
    answer:
      "É a contagem do próprio Google de onde o seu resultado apareceu, então impressões e cliques são tão precisos quanto qualquer dado que você vai conseguir. A posição é precisa como média; ela não é uma colocação. Filtre por dispositivo e país e a média fica bem mais próxima do que uma pessoa vê.",
  },
  {
    question: "Como verificar posições de palavras-chave de graça?",
    answer:
      "Abra o Search Console, vá em Desempenho, filtre pela página ou consulta que interessa e ative a métrica de posição média. Filtre por um único dispositivo e país para o número fazer sentido. Isso cobre o seu próprio site; para as posições de um concorrente você precisa de uma ferramenta que busque os resultados, e isso custa dinheiro em qualquer lugar.",
  },
  {
    question: "O RE9 SEO consome créditos para ler o Search Console?",
    answer:
      "Não. As leituras do Search Console e da inspeção de URL são gratuitas no RE9 SEO, no app e pelo MCP. As checagens de monitoramento de posições consomem créditos porque buscam resultados ao vivo.",
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
  "/_marketing/library/rank-tracking/search-console-vs-rank-tracker",
)({
  head: () =>
    buildPageSeo({
      title:
        "O Search Console serve para monitorar posições? Onde os dados gratuitos param",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Search Console x monitoramento de posições"
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
