import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/technical-seo-audit-checklist.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { SITE_AUDIT_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/site-audit/technical-seo-audit-checklist";

const faqs = [
  {
    question: "O que inclui uma auditoria técnica de SEO?",
    answer:
      "No mínimo: rastreabilidade e acesso, códigos de status, sinais de canonical e de indexação, títulos e meta descriptions, estrutura de cabeçalhos, links internos (incluindo links quebrados e páginas órfãs), conteúdo duplicado, cobertura de texto alternativo em imagens e tempo de resposta do servidor. O RE9 SEO verifica 27 tipos de problema nessas áreas e pode, opcionalmente, rodar o Lighthouse numa amostra de até 10 páginas para achados de desempenho e acessibilidade.",
  },
  {
    question: "Com que frequência fazer uma auditoria técnica de SEO?",
    answer:
      "Faça uma antes e depois de qualquer migração, mudança de template ou atualização de plataforma, porque são esses os eventos que criam problemas críticos. Fora isso, um rastreamento por trimestre basta para um site estável. Auditar todo mês um site que ninguém está mudando gera o mesmo relatório todo mês e ensina todo mundo a ignorá-lo.",
  },
  {
    question:
      "Qual a diferença entre uma auditoria técnica de SEO e uma auditoria de SEO?",
    answer:
      "Uma auditoria técnica pergunta se os buscadores conseguem acessar, renderizar e entender as suas páginas. Uma auditoria de SEO mais ampla acrescenta qualidade do conteúdo, cobertura de palavras-chave e links. A camada técnica vem primeiro, porque um problema de conteúdo numa página que o Google não consegue buscar não é o problema que você tem.",
  },
  {
    question: "Por que as auditorias de SEO geram tantos problemas?",
    answer:
      "Porque a maioria dos tipos de problema é por página e a maioria dos sites usa templates, então um único defeito de template se multiplica pelo número de páginas que o usam. Um relatório com 1.180 problemas em 318 páginas costuma descrever uma dúzia de causas de fundo. Agrupe por tipo de problema antes de contar qualquer coisa.",
  },
  {
    question: "Existe ferramenta gratuita de auditoria técnica de SEO?",
    answer:
      "Em parte. O Google Search Console mostra cobertura e indexação da sua propriedade verificada sem custo, e é a fonte mais confiável para tudo o que é específico do Google. Um rastreador acrescenta a visão on-page e de links internos que o Search Console não dá. O RE9 SEO é de código aberto e faz esse rastreamento.",
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
  "/_marketing/library/site-audit/technical-seo-audit-checklist",
)({
  head: () =>
    buildPageSeo({
      title: "O checklist de auditoria técnica de SEO que termina em correções",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="O checklist de auditoria técnica de SEO"
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
