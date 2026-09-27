import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/cluster-topical-hubs.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";

const PATH = "/library/keyword-research/cluster-topical-hubs";

const faqs = [
  {
    question: "Qual é a melhor ferramenta de agrupamento de palavras-chave?",
    answer:
      "Para agrupar por sobreposição de SERP em escala existem ferramentas pagas, mas, para a maioria dos sites, a pesquisa do RE9 SEO somada a uma etapa de agrupamento por intenção (o prompt de MCP acima) resolve. Avalie as ferramentas pelo critério de agrupar por sobreposição de SERP; agrupar por semelhança de palavras é brincadeira.",
  },
  {
    question: "Existe ferramenta gratuita de agrupamento de palavras-chave?",
    answer:
      "Não uma ilimitada. A etapa de agrupamento em si é gratuita (o prompt de MCP acima faz isso), mas ela roda sobre palavras-chave pesquisadas, e dados de palavras-chave de qualidade são a parte que custa dinheiro em qualquer lugar. O RE9 SEO inclui a etapa de agrupamento junto com a pesquisa, então não há uma ferramenta de agrupamento separada para comprar.",
  },
  {
    question: "O que é um modelo de mapa de palavras-chave?",
    answer:
      "Uma planilha com uma linha por grupo: palavra-chave principal, palavras-chave de apoio, intenção, URL de destino e status. O mapa de palavras-chave acima é o exemplo prático; copie a estrutura. Acrescente uma coluna de projeção e ele vira uma ordem de construção: dimensione cada grupo antes de comprometer o trimestre.",
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
  "/_marketing/library/keyword-research/cluster-topical-hubs",
)({
  head: () =>
    buildPageSeo({
      title:
        "Agrupamento de palavras-chave: transforme uma lista em hubs temáticos (e corrija a canibalização)",
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
        crumb="Agrupe palavras-chave em hubs temáticos"
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
