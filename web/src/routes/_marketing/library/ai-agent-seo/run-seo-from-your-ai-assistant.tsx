import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/run-seo-from-your-ai-assistant.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { AI_AGENT_SEO_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/ai-agent-seo/run-seo-from-your-ai-assistant";

const faqs = [
  {
    question: "O que é MCP em SEO?",
    answer:
      "É o Model Context Protocol, um padrão que permite a um assistente de IA chamar ferramentas externas e receber dados. Um servidor MCP de SEO dá ao assistente dados do Search Console, de palavras-chave, da SERP, de backlinks, de monitoramento de posições e de auditoria dentro da conversa, para que ele busque e analise em vez de só escrever a partir do que você cola.",
  },
  {
    question: "Quais assistentes de IA funcionam com o MCP do RE9 SEO?",
    answer:
      "Claude Code, Claude Desktop, Codex e Cursor, com uma única configuração de servidor. A documentação traz a configuração de cada um. As skills de agente, que são arquivos SKILL.md que descrevem fluxos de SEO, são instaladas junto.",
  },
  {
    question: "Usar o MCP consome créditos?",
    answer:
      "Leituras do Search Console, inspeção de URL e leitura de auditorias não consomem créditos. Chamadas que buscam dados num provedor, como métricas de palavras-chave, resultados da SERP, dados de domínio e de backlinks e checagens de posições, consomem créditos, e cada ferramenta informa o custo antes de rodar. Instalações auto-hospedadas pagam o provedor diretamente.",
  },
  {
    question: "Um agente de IA consegue fazer SEO sozinho?",
    answer:
      "Ele consegue buscar, filtrar, ordenar e rascunhar sozinho. Não consegue distinguir uma consulta de robô de uma humana, julgar se uma posição vale a pena nem saber o que o negócio vai colocar em prática. Os fluxos daqui mantêm uma pessoa nas etapas em que esse julgamento acontece.",
  },
  {
    question: "Qual é a primeira coisa a rodar depois de conectar o MCP?",
    answer:
      "A configuração do projeto e, em seguida, uma extração do Search Console com as consultas entre as posições 4 e 20 com impressões reais, com um filtro que remove consultas de robôs e lixo. Não custa nada e gera a lista de onde todos os outros fluxos partem.",
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
  "/_marketing/library/ai-agent-seo/run-seo-from-your-ai-assistant",
)({
  head: () =>
    buildPageSeo({
      title: "Faça SEO pelo seu assistente de IA: o fluxo com MCP",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Faça SEO pelo seu assistente de IA"
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
