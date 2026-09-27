import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/how-to-get-backlinks.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { LINK_BUILDING_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/link-building/how-to-get-backlinks";

const faqs = [
  {
    question: "Como conseguir backlinks para um site novo?",
    answer:
      "Comece pelas empresas que atendem o mesmo cliente e não competem com você: parceiros, fornecedores, as ferramentas que seus clientes usam, as comunidades de que eles participam. Peça uma menção onde ela ajude o leitor deles. Depois, crie uma coisa que valha um link, uma ferramenta ou um dado, e conte para as dez pessoas com mais chance de usá-la.",
  },
  {
    question: "O que é um ativo linkável?",
    answer:
      "Uma página que faz pelo leitor de outro site algo que um parágrafo de texto não consegue: uma calculadora, um modelo, uma base de dados, um checklist, uma ferramenta. No site citado acima, uma calculadora de tráfego tem links de 17 domínios; nenhum artigo do site tem mais de 10.",
  },
  {
    question: "Outreach para link building ainda funciona?",
    answer:
      "Contato pessoal com uma lista curta funciona. O apresentador do podcast conseguiu certa vez dez links com dez cartas escritas à mão. E-mail em massa para uma lista comprada gera principalmente respostas de quem vende links, e esses são os links que aparecem numa auditoria com spam score na casa dos 60.",
  },
  {
    question: "Devo comprar backlinks?",
    answer:
      "Não. Os vendedores que mandam e-mail para você produzem links de domínios de cassino e de PBN que os buscadores ignoram e que deixam o seu perfil com cara de fabricado. Os profissionais do podcast também alertam que os sistemas de busca com IA talvez não perdoem um perfil manipulado como o Google acabou perdoando.",
  },
  {
    question: "Como o RE9 SEO ajuda no link building?",
    answer:
      "A ferramenta de backlinks mostra quais das suas páginas atraem links e de onde, que é o ponto de partida acima. Ela mostra o mesmo para qualquer concorrente, então você pode listar os domínios que apontam para ele e não para você. Use a tabela de páginas principais do app para comparar a contagem de domínios de referência por página; o MCP entrega resumos de backlinks e as linhas individuais de backlinks. A skill de prospecção de links empacota o fluxo de concorrentes.",
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
  "/_marketing/library/link-building/how-to-get-backlinks",
)({
  head: () =>
    buildPageSeo({
      title:
        "Como conseguir backlinks: comece pelas páginas que já conquistam links",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Como conseguir backlinks"
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
