import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/backlink-audit.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { LINK_BUILDING_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/link-building/backlink-audit";

const faqs = [
  {
    question: "Como fazer uma auditoria de backlinks?",
    answer:
      "Comece com uma página de linhas de backlinks, uma por domínio de referência, ordenada pela data de descoberta e com o filtro de spam desligado. Separe em lixo suspeito, destinos quebrados, nofollow e vale a pena ler. Confira as páginas quebradas antes de restaurá-las ou escolher um redirecionamento relevante. Leia as linhas restantes e decida se uma pessoa na página de origem teria motivo para clicar.",
  },
  {
    question: "O que é um backlink tóxico?",
    answer:
      "Um link vindo de uma página que existe só para vender ou hospedar links: listas de vendedores de links, anúncios de PBN, domínios de cassino e de farmácia e páginas com centenas de links externos sem relação entre si. Eles costumam ter spam score alto e texto âncora com cara de anúncio. O Google geralmente os ignora.",
  },
  {
    question: "Domain rank ou DA é uma boa medida de um backlink?",
    answer:
      "É uma ajuda para ordenar, não um veredito. Um domínio de spam pode ter uma nota maior do que um site pequeno e relevante. Use a nota para ordenar a lista e depois julgue cada link pelo critério de a página que aponta tratar do mesmo assunto que a sua e de ter sido publicada por um site real.",
  },
  {
    question: "O RE9 SEO mostra backlinks quebrados?",
    answer:
      "A visão geral mostra backlinks quebrados e páginas de destino quebradas. As linhas do perfil incluem status de quebrado, dofollow ou nofollow, domain rank, spam score e data da primeira descoberta. A consulta de perfil usada aqui retorna backlinks ativos, então não consegue listar links perdidos. O verificador de backlinks gratuito mostra o resumo e os 15 principais links sem precisar de conta.",
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
  "/_marketing/library/link-building/backlink-audit",
)({
  head: () =>
    buildPageSeo({
      title:
        "A auditoria de backlinks: ordene por data de descoberta, depois por relevância",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Auditoria de backlinks"
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
