import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/long-tail-question-mining.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";

const PATH = "/library/keyword-research/long-tail-question-mining";

const faqs = [
  {
    question: "O que são palavras-chave de cauda longa em SEO?",
    answer:
      "São consultas específicas, com várias palavras, que têm menos volume individual, mas mais tráfego somado e uma intenção mais clara do que os termos principais. Elas são o caminho mais rápido para um site novo ranquear, porque a concorrência se concentra nos termos principais.",
  },
  {
    question: "Como usar palavras-chave de cauda longa no conteúdo?",
    answer:
      "Uma intenção por página. Use a consulta de cauda longa literalmente como H2 (ou H1) quando soar natural, responda no primeiro parágrafo e aprofunde abaixo. Não espalhe vinte caudas numa única página; agrupe as caudas relacionadas e depois separe por intenção.",
  },
  {
    question: "Existe gerador gratuito de palavras-chave de cauda longa?",
    answer:
      "O Google oferece dois: o preenchimento automático e o People Also Ask. O seu Search Console é o terceiro e o melhor; ele mostra a cauda real do seu site. O RE9 SEO conecta o seu Search Console e expande o que você encontra em listas completas de palavras-chave.",
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
  "/_marketing/library/keyword-research/long-tail-question-mining",
)({
  head: () =>
    buildPageSeo({
      title: "O que são palavras-chave de cauda longa? Como encontrar e usar",
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
        crumb="Cauda longa e garimpo de perguntas"
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
