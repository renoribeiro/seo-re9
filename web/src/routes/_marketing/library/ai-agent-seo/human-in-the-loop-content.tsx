import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/human-in-the-loop-content.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { AI_AGENT_SEO_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/ai-agent-seo/human-in-the-loop-content";

const faqs = [
  {
    question:
      "Como usar IA para conteúdo de SEO sem produzir páginas genéricas?",
    answer:
      "Escreva você mesmo o briefing: o leitor, a única coisa que ele deve fazer, os seus próprios dados, citações literais e o que não afirmar. Deixe o modelo rascunhar a partir disso. Depois, faça uma revisão de fatos em relação ao briefing e outra de frases com cara de texto de máquina antes de publicar qualquer coisa. Toda etapa pulada aparece no resultado.",
  },
  {
    question: "A IA deve escrever o briefing ou o rascunho?",
    answer:
      "O rascunho. Um briefing escrito por um modelo contém só o que o modelo já sabia, que é o que todas as páginas concorrentes já dizem. Um briefing escrito por uma pessoa traz os dados e as citações que tornam a página diferente. O rascunho é mão de obra; o briefing é conhecimento.",
  },
  {
    question: "O que é conteúdo com pessoas no processo (human in the loop)?",
    answer:
      "É um fluxo em que uma pessoa cuida das duas pontas, o briefing e a edição, e um modelo faz o meio. É o oposto do padrão comum em que o modelo faz o briefing e edita enquanto uma pessoa escreve, o que produz páginas bem acabadas e sem nada dentro.",
  },
  {
    question: "Como revisar um rascunho feito por IA?",
    answer:
      "Em duas passadas. Fatos: todo número, citação e afirmação sobre produto precisa apontar para o briefing ou para a fonte. Texto genérico: remova as frases e estruturas típicas de texto de máquina, como aberturas de enchimento, falsos contrastes e perguntas retóricas empilhadas. Vale manter um catálogo desses dois tipos de problema e aplicá-lo em toda página.",
  },
  {
    question: "O RE9 SEO escreve conteúdo?",
    answer:
      "Não. O MCP puxa a metade de dados de um briefing: desempenho no Search Console, métricas de palavras-chave, resultados da SERP, concorrentes, achados de auditoria. O assistente que você conecta escreve a partir do briefing que você completa.",
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
  "/_marketing/library/ai-agent-seo/human-in-the-loop-content",
)({
  head: () =>
    buildPageSeo({
      title: "Conteúdo com pessoas no processo: o briefing é o trabalho",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Conteúdo com pessoas no processo"
      path={PATH}
      library={AI_AGENT_SEO_LIBRARY}
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
