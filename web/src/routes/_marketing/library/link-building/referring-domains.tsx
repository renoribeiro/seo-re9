import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/referring-domains.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { LINK_BUILDING_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/link-building/referring-domains";

const faqs = [
  {
    question: "Qual a diferença entre backlinks e domínios de referência?",
    answer:
      "Um backlink é um link vindo de uma página. Um domínio de referência é um site que aponta para você, não importa quantas vezes. Dois mil backlinks podem vir de vinte sites. Domínios de referência é a contagem de fontes distintas e a melhor medida de quantos sites endossam o seu.",
  },
  {
    question: "De quantos domínios de referência eu preciso?",
    answer:
      "O suficiente para igualar as páginas que estão à sua frente nos termos que você quer, vindos de sites da mesma área. Veja o número nos perfis dos concorrentes; uma análise de lacunas de backlinks mostra os domínios que apontam para eles e não para você.",
  },
  {
    question: "Links dos meus outros sites valem alguma coisa?",
    answer:
      "Um pouco, e cada vez menos. São links reais, mas um buscador consegue ver que o dono e a hospedagem são os mesmos, e a diversidade que move as posições vem de sites que você não controla. Conte esses links separadamente para não inflar o total.",
  },
  {
    question: "O que é distância até a semente (distance to seed)?",
    answer:
      "É o número de saltos de link entre um site e os sites em que um buscador mais confia numa área. Um link de um site que é citado pelas autoridades do setor está perto da semente e conta mais do que um link de um site com nota alta de uma área sem relação. Você não consegue ver a lista de sementes, mas consegue avaliar se um site que aponta para você é citado pelo seu setor.",
  },
  {
    question: "O RE9 SEO mostra domínios de referência?",
    answer:
      "Sim. A visão geral de backlinks mostra a contagem de domínios de referência e os principais domínios de referência com contagem de backlinks, nota, spam score e data da primeira descoberta, e o gráfico de crescimento mostra backlinks e domínios de referência no último ano. O verificador de backlinks gratuito mostra o resumo sem precisar de conta.",
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
  "/_marketing/library/link-building/referring-domains",
)({
  head: () =>
    buildPageSeo({
      title:
        "Domínios de referência, não backlinks: o número que move as posições",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Domínios de referência"
      path={PATH}
      library={LINK_BUILDING_LIBRARY}
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
