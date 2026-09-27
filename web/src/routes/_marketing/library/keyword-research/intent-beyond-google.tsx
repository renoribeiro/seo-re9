import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/intent-beyond-google.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";

const PATH = "/library/keyword-research/intent-beyond-google";

const faqs = [
  {
    question: "Como fazer pesquisa de palavras-chave para o Pinterest?",
    answer:
      "Use a própria caixa de busca da plataforma e as sugestões da busca guiada, depois coloque esses termos nos títulos e descrições dos pins, no texto da imagem e nos textos das pastas e do perfil. O Pinterest precisa entender a conta e o pin antes de associar qualquer um deles a uma consulta, então os dois níveis precisam do vocabulário.",
  },
  {
    question: "SEO funciona para perfis do LinkedIn?",
    answer:
      "Sim, e o perfil importa mais do que as publicações. A ação mais frequente na plataforma é ver um perfil, então o título e a seção Sobre têm o peso que a title tag tem num site. Escreva-os com as palavras que um desconhecido usaria para descrever o problema que você resolve.",
  },
  {
    question: "Como otimizar para assistentes de IA?",
    answer:
      "Responda às perguntas de forma direta e completa o suficiente para ser citável, e aceite que consultas que um assistente resolve em um parágrafo vão trazer menos cliques, qualquer que seja a sua posição. Dê mais peso na pesquisa às consultas que exigem uma ferramenta, um preço, um login ou uma pessoa, porque essas ainda geram visitas.",
  },
  {
    question:
      "Como medir o tráfego de plataformas que não enviam dados de referência?",
    answer:
      "Acompanhe a busca pela marca. A descoberta numa plataforma fechada costuma aparecer depois como pessoas buscando o seu nome, então uma linha de busca de marca subindo no Search Console durante uma campanha é um bom sinal de direção.",
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
  "/_marketing/library/keyword-research/intent-beyond-google",
)({
  head: () =>
    buildPageSeo({
      title:
        "Pesquisa de palavras-chave além do Google: Pinterest, LinkedIn e IA",
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
        crumb="Intenção além do Google"
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
