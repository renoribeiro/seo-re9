import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/seed-from-conversation.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";

const PATH = "/library/keyword-research/seed-from-conversation";

const faqs = [
  {
    question: "Como fazer pesquisa de palavras-chave de graça?",
    answer:
      "Conversas para as sementes (esta página), preenchimento automático do Google e People Also Ask para expandir, Search Console para validar. O RE9 SEO valida e expande o que essas fontes trazem.",
  },
  {
    question: "Como encontrar palavras-chave LSI?",
    answer:
      '"Palavras-chave LSI" é um jargão do mercado de ferramentas para formas relacionadas de dizer a mesma coisa. As fontes gratuitas mais rápidas são a caixa People Also Ask e o rodapé de "pesquisas relacionadas". Melhor ainda: os sinônimos dos seus próprios clientes, que é exatamente o que a coleta a partir de conversas captura.',
  },
  {
    question: "De quantas palavras-chave semente eu preciso?",
    answer:
      "De 5 a 15 sementes fortes por tema. Passando disso, você está expandindo, não semeando. Em seguida, leve-as para a estratégia de garimpo de cauda longa. Vale também confrontar esse mesmo vocabulário dos clientes com o seu posicionamento: veja se alguém busca pelo nome que você usa para se descrever.",
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
  "/_marketing/library/keyword-research/seed-from-conversation",
)({
  head: () =>
    buildPageSeo({
      title:
        "Palavras-chave semente a partir de conversas com clientes (pesquisa de palavras-chave sem ferramenta paga)",
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
        crumb="Parta das conversas"
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
