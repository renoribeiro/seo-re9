import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/skills-memory-and-the-trace.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { AI_AGENT_SEO_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/ai-agent-seo/skills-memory-and-the-trace";

const faqs = [
  {
    question: "O que é uma skill de agente?",
    answer:
      "Um arquivo, geralmente SKILL.md, que ensina um assistente de IA a fazer um trabalho: quais ferramentas chamar e em que ordem, o que verificar e como deve ser o resultado. O RE9 SEO traz skills de pesquisa de palavras-chave, análise de concorrentes, auditoria do site, SEO local, prospecção de links, relatórios e configuração de projeto, para que o assistente execute cada fluxo sempre do mesmo jeito.",
  },
  {
    question:
      "Por que o ChatGPT ou o Claude dão respostas diferentes para o mesmo prompt?",
    answer:
      "Porque um chat em branco é feito para variar; nada restringe o caminho entre o prompt e a resposta. Salvar o fluxo como uma skill, dar ao assistente uma memória que ele lê antes de cada execução e pedir que registre cada passo reduzem essa variação. Uma skill, em especial, executa os mesmos passos na mesma ordem.",
  },
  {
    question: "Como dar memória a um agente de IA?",
    answer:
      "Com um repositório de texto simples que ele lê antes de começar: arquivos markdown com decisões, transcrições e regras, ou um contexto de projeto estruturado como o do RE9 SEO, que guarda objetivo, posicionamento, concorrentes, páginas principais e um registro de pesquisas. Um feedback escrito nesse repositório vira regra; um feedback dado uma vez no chat é esquecido.",
  },
  {
    question: "Como saber se um relatório de SEO feito por IA está correto?",
    answer:
      "Faça o assistente registrar cada chamada de ferramenta e citar a linha do registro para cada número. Um número sem chamada de ferramenta por trás veio do modelo, não dos dados. Depois, leia tudo, não só as cinco primeiras linhas, e só confie nele numa área em que você mesmo perceberia uma resposta errada.",
  },
  {
    question: "O RE9 SEO tem memória de projeto?",
    answer:
      "Sim. Cada projeto tem um contexto compartilhado: visão geral do negócio, objetivo atual, posicionamento, preferências de escrita, concorrentes, páginas principais e um registro de pesquisas. O MCP lê esse contexto com get_project_context e o atualiza com update_project_context, e a skill seo-project-setup o preenche na primeira execução.",
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
  "/_marketing/library/ai-agent-seo/skills-memory-and-the-trace",
)({
  head: () =>
    buildPageSeo({
      title: "Skills, memória e rastro: torne a boa execução repetível",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Skills, memória e rastro"
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
