import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/what-to-automate.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { AI_AGENT_SEO_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/ai-agent-seo/what-to-automate";

const faqs = [
  {
    question: "Quais tarefas de SEO podem ser automatizadas?",
    answer:
      "Tudo que tem entrada e saída fixas e não exige julgamento: checagens de posições agendadas, extrações do Search Console, auditorias do site iniciadas num dia fixo, exportações de dados. Um agente pode acrescentar uma segunda camada, resumindo e rascunhando a partir desses dados, desde que uma pessoa leia o resultado. Escolher o que monitorar, o que construir e o que dizer a um cliente continua com uma pessoa.",
  },
  {
    question:
      "Qual a diferença entre automação de SEO e um agente de SEO com IA?",
    answer:
      "A automação roda o mesmo trabalho num agendamento, sem nenhum modelo envolvido, como uma checagem de posições semanal. Um agente recebe entradas variáveis e produz uma saída estruturada usando um modelo de linguagem, como ler a checagem e escrever o resumo. Muitos produtos vendidos como agentes são um agendamento mais um prompt; isso é útil, mas ainda precisa de alguém que leia.",
  },
  {
    question: "Dá para automatizar relatórios de SEO?",
    answer:
      "A coleta de dados, sim: o monitoramento e as extrações do Search Console rodam sozinhos e não consomem créditos para leitura. O rascunho, também, com um agente e um prompt salvo. A frase que diz o que aquilo significa para o negócio ainda deve ser escrita, ou pelo menos lida, por uma pessoa antes de ser enviada.",
  },
  {
    question: "Quanto custa o monitoramento de posições agendado no RE9 SEO?",
    answer:
      "O app faz a estimativa antes de rodar qualquer coisa. O custo depende da quantidade de palavras-chave, dos dispositivos, da profundidade e da frequência, e as checagens agendadas passam por uma fila mais barata do que as checagens avulsas ao vivo. Para saber mais, fale com a gente: trafego@re9.online.",
  },
  {
    question: "Devo automatizar a produção de conteúdo?",
    answer:
      "Não de ponta a ponta. A estratégia sobre [conteúdo com pessoas no processo](/library/ai-agent-seo/human-in-the-loop-content) mostra a divisão que funciona: uma pessoa escreve o briefing, o agente rascunha, uma pessoa edita. Automatizar o briefing ou a edição produz conteúdo que soa igual a qualquer outro site automatizado.",
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
  "/_marketing/library/ai-agent-seo/what-to-automate",
)({
  head: () =>
    buildPageSeo({
      title: "O que automatizar e o que manter: a regra do despachante",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="O que automatizar"
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
