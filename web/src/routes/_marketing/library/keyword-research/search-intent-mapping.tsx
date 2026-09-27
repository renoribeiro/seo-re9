import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/search-intent-mapping.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";

const PATH = "/library/keyword-research/search-intent-mapping";

const faqs = [
  {
    question: "Por que a intenção de busca é importante para SEO?",
    answer:
      "Porque o Google ranqueia páginas que atendem à intenção, não páginas que mencionam palavras-chave. Uma página perfeitamente otimizada para a intenção errada não consegue vencer. Leia a SERP e você verá a intenção que o Google decidiu que a consulta carrega.",
  },
  {
    question: "O que são palavras-chave com intenção de compra?",
    answer:
      'São consultas que sinalizam prontidão para comprar: "preço", "vs", "alternativa", "melhor X para Y", "desconto". Têm volume baixo e concorrência alta por clique, mas ainda costumam dar o melhor ROI, porque a pessoa chega já convencida.',
  },
  {
    question: "Como verificar a intenção de busca de uma palavra-chave?",
    answer:
      "Busque por ela. O Top 10 atual é a resposta do Google: se só aparecem listas, a intenção é de comparação comercial; se só aparecem documentações e definições, é informacional. O RE9 SEO também classifica automaticamente a intenção das palavras-chave pesquisadas na maioria dos países.",
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
  "/_marketing/library/keyword-research/search-intent-mapping",
)({
  head: () =>
    buildPageSeo({
      title:
        "O que é intenção de busca? Mapeando palavras-chave em quentes, mornas e frias",
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
        crumb="Mapeamento de intenção de busca"
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
