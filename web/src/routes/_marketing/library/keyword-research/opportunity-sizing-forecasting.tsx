import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/opportunity-sizing-forecasting.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";

const PATH = "/library/keyword-research/opportunity-sizing-forecasting";

const faqs = [
  {
    question: "Quão precisa é uma projeção de SEO?",
    answer:
      "Útil como direção e errada nos detalhes, e é por isso que o resultado deve ser uma faixa. Os volumes são estimativas, as curvas de CTR são médias de SERPs muito diferentes e o tempo para ranquear depende de concorrentes que também estão trabalhando. Faça projeções para comparar oportunidades entre si, não para prometer um número.",
  },
  {
    question: "Qual é um bom ROI de SEO?",
    answer:
      "Depende do valor da conversão e do prazo de retorno, não de uma referência de mercado. A conta útil é o custo do conteúdo e dos links contra a receita projetada em 12 meses, e se isso supera o que a mesma verba renderia em mídia paga. O SEO costuma perder essa comparação no primeiro mês e ganhar até o nono, então o prazo importa tanto quanto o múltiplo.",
  },
  {
    question: "Quais KPIs de SEO importam?",
    answer:
      "Leads e receita são os dois números que uma empresa trata como exatos. Todo o resto, incluindo posições, sessões e impressões, é diagnóstico: útil para explicar por que os números exatos mudaram, fraco como meta em si.",
  },
  {
    question: "Como calcular o tráfego potencial de palavras-chave?",
    answer:
      "O volume somado do grupo, multiplicado pelo CTR da posição esperada, dá as sessões estimadas. Multiplique pela taxa de conversão e pelo valor da conversão para chegar à receita. Faça a conta três vezes, com três posições, para terminar com uma faixa em vez de um número único em que ninguém deveria confiar.",
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
  "/_marketing/library/keyword-research/opportunity-sizing-forecasting",
)({
  head: () =>
    buildPageSeo({
      title:
        "Projeção de SEO: dimensione uma oportunidade de palavra-chave antes de construir",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <>
      <LibrarySpokePage
        title={frontmatter.title}
        description={frontmatter.description}
        crumb="Dimensionamento de oportunidades e projeções"
        path={PATH}
      >
        <Content components={{ ...defaultMdxComponents }} />
      </LibrarySpokePage>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  ),
});
