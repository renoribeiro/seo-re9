import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/index-bloat.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { SITE_AUDIT_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/site-audit/index-bloat";

const faqs = [
  {
    question: "Como saber se meu site tem inchaço de índice?",
    answer:
      "Compare o número de URLs que você quer indexadas com a contagem de indexadas no relatório de indexação de páginas do Search Console. Uma diferença grande é o sinal. Depois, inspecione uma amostra das URLs excedentes, porque um rastreador pode mostrar centenas de páginas quase duplicadas que o Google nunca buscou, e isso não é inchaço.",
  },
  {
    question: "O inchaço de índice prejudica as posições?",
    answer:
      "Pode prejudicar, em escala, quando uma grande parte das páginas de um domínio é rasa ou duplicada e o domínio é avaliado como um todo. Num site de algumas centenas de páginas, os efeitos mais comuns são rastreamento desperdiçado e autoridade de links internos espalhada por URLs que nunca iriam ranquear. Nenhum dos dois é urgente por si só.",
  },
  {
    question: "Devo usar noindex ou apagar páginas duplicadas?",
    answer:
      "Use noindex quando a página tem utilidade para as pessoas, como uma listagem filtrada ou um arquivo paginado. Use um 410 ou um 301 quando a página não tem utilidade nenhuma. Tirar uma URL do sitemap não a desindexa; só faz você parar de pedir a indexação.",
  },
  {
    question: "Quantas páginas um site deveria ter indexadas?",
    answer:
      "Tantas quantas forem as coisas distintas que valem ranquear, o que, para a maioria dos sites de pequenas empresas, significa dezenas, não milhares. A contagem importa menos do que a proporção: se a maioria das suas URLs indexadas não recebe nenhuma impressão em um ano, o conjunto é maior do que o site consegue sustentar.",
  },
  {
    question:
      "Uma ferramenta de auditoria do site consegue encontrar inchaço de índice?",
    answer:
      "Não diretamente, porque toda página inchada retorna 200 e passa nas verificações por página. O que um rastreador entrega é a matéria-prima: títulos repetidos, contagens de palavras baixas e padrões de URL recorrentes. Combine isso com a inspeção de URL do Search Console para descobrir quais dessas URLs o Google mantém. O RE9 SEO faz as duas coisas: rastreia o site e roda a inspeção de URL na sua propriedade conectada sem consumir créditos.",
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
  "/_marketing/library/site-audit/index-bloat",
)({
  head: () =>
    buildPageSeo({
      title: "Inchaço de índice: quando a correção é apagar páginas",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Inchaço de índice"
      path={PATH}
      library={SITE_AUDIT_LIBRARY}
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
