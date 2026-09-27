import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/seo-audit-report-template.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { SITE_AUDIT_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/site-audit/seo-audit-report-template";

const faqs = [
  {
    question: "O que deve ter num relatório de auditoria de SEO?",
    answer:
      "Escopo e confiabilidade do rastreamento, os problemas críticos com responsáveis nomeados e correções exatas, os alertas agrupados pela causa de fundo e não por URL, uma estimativa do custo de cada grupo na métrica do próprio cliente, uma proposta priorizada e um plano curto de medição com datas. Os achados brutos vão num apêndice.",
  },
  {
    question: "Qual deve ser o tamanho de um relatório de auditoria de SEO?",
    answer:
      "O corpo deve ser curto o bastante para ser lido numa reunião, o que na prática significa de quatro a oito páginas. O volume fica no apêndice. Um corpo longo indica que os achados não passaram por triagem, que é justamente o trabalho pelo qual o cliente está pagando.",
  },
  {
    question: "Um relatório de auditoria de SEO deve ter uma nota?",
    answer:
      "Não uma nota composta. Um número único de 0 a 100 provoca discussão sobre os pesos e tira o foco da conversa sobre quais correções entram na agenda. Informe contagens por gravidade, que podem ser conferidas, e deixe o julgamento para a proposta. Pode incluir as notas das categorias do Lighthouse, desde que você diga quantas páginas elas cobrem.",
  },
  {
    question:
      "Como apresentar os achados de uma auditoria de SEO a um cliente?",
    answer:
      "Comece pela decisão que você quer, não pelas evidências que reuniu. Abra com a proposta e o custo, mantenha os problemas críticos numa lista que possa ser repassada, agrupe todo o resto por causa e deixe a exportação completa atrás de um link. Diga com clareza quais números são estimativas.",
  },
  {
    question: "Existe um modelo gratuito de relatório de auditoria de SEO?",
    answer:
      "A estrutura desta página é o modelo, e ela é mais útil do que um documento formatado porque diz o que vai em cada seção e o que deixar de fora. O RE9 SEO consegue produzir cada seção a partir de um rastreamento real usando o prompt acima, e é de código aberto.",
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
  "/_marketing/library/site-audit/seo-audit-report-template",
)({
  head: () =>
    buildPageSeo({
      title:
        "Modelo de relatório de auditoria de SEO: uma estrutura que vira ação",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Escreva um relatório de auditoria que o cliente vai colocar em prática"
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
