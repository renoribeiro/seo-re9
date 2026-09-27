import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/which-keywords-to-track.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { RANK_TRACKING_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/rank-tracking/which-keywords-to-track";

const faqs = [
  {
    question: "Quantas palavras-chave devo monitorar para SEO?",
    answer:
      "De vinte a cinquenta para um site típico de pequeno ou médio porte: os termos ligados a páginas que geram receita, as consultas quase na primeira página do Search Console, um ou dois termos de marca como controle e alguns termos de concorrentes. Monitore mais só se alguém for ler as linhas extras.",
  },
  {
    question: "Quais palavras-chave devo monitorar primeiro?",
    answer:
      "As que o Search Console já mostra para o seu site entre as posições 4 e 20, com impressões reais. Elas têm demanda, estão ao alcance da primeira página, e uma mudança de posição aparece nos cliques rápido o bastante para você aprender com ela.",
  },
  {
    question:
      "Devo monitorar palavras-chave em que já estou em primeiro lugar?",
    answer:
      "Algumas. Termos de marca devem estar no monitoramento como controle de alerta precoce, e um termo em que você ranqueia perto do topo com uma taxa de cliques baixa vale ser monitorado pelos recursos da SERP, já que um recurso acima do seu resultado explica os cliques que faltam melhor do que a posição.",
  },
  {
    question: "Monitorar mais palavras-chave custa mais?",
    answer:
      "Sim, proporcionalmente. No RE9 SEO, o custo de uma checagem é o número de palavras-chave vezes o número de dispositivos vezes a profundidade de resultados analisada, e as checagens agendadas rodam numa fila mais barata do que as checagens avulsas ao vivo. O app mostra uma estimativa antes de você adicionar palavras-chave ou iniciar uma execução.",
  },
  {
    question: "Com que frequência devo reescolher as palavras-chave?",
    answer:
      "A cada trimestre para o grupo de consultas quase na primeira página, já que essas consultas mudam conforme as páginas se movem. O grupo das páginas que geram receita só muda quando o negócio muda.",
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
  "/_marketing/library/rank-tracking/which-keywords-to-track",
)({
  head: () =>
    buildPageSeo({
      title: "Quais palavras-chave monitorar, e quantas",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Quais palavras-chave monitorar"
      path={PATH}
      library={RANK_TRACKING_LIBRARY}
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
