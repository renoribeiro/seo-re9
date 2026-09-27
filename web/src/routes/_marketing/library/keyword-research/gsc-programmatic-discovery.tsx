import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/gsc-programmatic-discovery.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";

const PATH = "/library/keyword-research/gsc-programmatic-discovery";

const faqs = [
  {
    question:
      "Dá para usar o Google Search Console para pesquisa de palavras-chave?",
    answer:
      "Sim, e ele é a fonte mais confiável que você tem, porque informa consultas que chegaram ao seu site em vez de estimar um mercado. Os limites são que ele só mostra termos em que você já ranqueia e esconde consultas abaixo de um limite de privacidade. Use-o para expandir e validar, e use uma ferramenta de palavras-chave para a demanda que você ainda não capturou.",
  },
  {
    question:
      "O que são palavras-chave quase na primeira página (striking distance)?",
    answer:
      "São consultas em que você ranqueia mais ou menos entre as posições 11 e 30. Elas ficam na segunda página, trazem poucos cliques e mostram que o Google já trata a sua página como uma resposta plausível. Na maioria dos sites, são as posições mais baratas de melhorar.",
  },
  {
    question: "Até quanto tempo atrás vão os dados do Google Search Console?",
    answer:
      "Dezesseis meses. A maioria das exportações usa por padrão um período bem menor, então puxar o intervalo completo revela consultas sazonais e posições históricas que uma visão de 90 dias esconde.",
  },
  {
    question:
      "Por que os cliques da tabela de consultas não batem com o total?",
    answer:
      "O Google anonimiza consultas feitas por poucas pessoas, então elas nunca aparecem pelo nome, mas os cliques continuam contando no total. A diferença vai de uma pequena fração até a maior parte do total, dependendo do tamanho do site. Ler as mesmas páginas no nível de página, e não de consulta, recupera boa parte dessa contagem.",
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
  "/_marketing/library/keyword-research/gsc-programmatic-discovery",
)({
  head: () =>
    buildPageSeo({
      title:
        "Pesquisa de palavras-chave com o Search Console: consultas quase na primeira página",
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
        crumb="Descoberta programática com o Search Console"
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
