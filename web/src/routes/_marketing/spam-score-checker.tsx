import { createFileRoute } from "@tanstack/react-router";
import { SpamScoreCheckerTool } from "@/components/spam-score-checker-tool";
import { ToolFrame } from "@/lib/free-tools/tool-frame";
import { freeTools } from "@/lib/free-tools/tool-pages";
import { buildPageSeo } from "@/lib/seo";

const TOOL = freeTools["spam-score-checker"];

export const Route = createFileRoute("/_marketing/spam-score-checker")({
  head: () =>
    buildPageSeo({
      title: "Verificador de spam score de backlinks grátis",
      description:
        "Confira o spam score dos backlinks de um domínio e veja os links mais suspeitos que apontam para ele. Sem cadastro e sem e-mail.",
      path: TOOL.path,
      titleSuffix: "RE9 SEO",
      imageAlt: "Verificador de spam score de backlinks gratuito do RE9 SEO",
    }),
  component: SpamScoreCheckerPage,
});

const FAQS = [
  {
    question: "O que o spam score mede de fato?",
    answer:
      "A DataForSEO dá uma nota de 0 a 100 a um perfil de links analisando sinais que o índice dela associa a sites de baixa qualidade — conteúdo raso ou duplicado, redes de links, padrões incomuns de links de saída. Quanto maior, mais desses sinais. Não é uma nota de penalidade do Google; o Google não publica nenhum número assim.",
  },
  {
    question: "Devo fazer disavow dos links mostrados?",
    answer:
      "Normalmente, não. O Google já ignora sozinho a maioria dos links de baixa qualidade, e fazer disavow de links bons causa um estrago real. Trate uma pontuação alta como motivo para investigar, não como uma lista de tarefas.",
  },
  {
    question: "Quantos links a verificação gratuita mostra?",
    answer:
      "Os 10 domínios de referência com mais sinais de spam, um link de cada. O RE9 SEO permite filtrar o perfil completo de backlinks por spam score e ver quanto dele é afetado.",
  },
  {
    question: "De onde vêm os dados?",
    answer:
      "Do índice de backlinks da DataForSEO, com cache de 24 horas por domínio. São os mesmos dados que o RE9 SEO usa na pesquisa de backlinks.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Dois spam scores",
    description:
      "Um para os links que apontam para o domínio e outro para o próprio domínio. Eles respondem a perguntas diferentes e muitas vezes discordam.",
  },
  {
    title: "Os piores casos",
    description:
      "Os 10 domínios de referência com mais sinais de spam, com a página de origem, o texto âncora e se o link é follow ou nofollow.",
  },
  {
    title: "Pontuação com contexto",
    description:
      "Veja o spam score ao lado dos domínios de referência e do Domain Rank. Use uma pontuação alta como motivo para revisar os links, não como prova de penalidade.",
  },
];

function SpamScoreCheckerPage() {
  return (
    <ToolFrame
      tool={TOOL}
      heading="Verificador de spam score de backlinks grátis"
      subhead="Veja o quanto o perfil de backlinks de um domínio parece spam e quais domínios de referência estão puxando a pontuação para cima."
      highlights={HIGHLIGHTS}
      faqs={FAQS}
      cta={{
        heading: "Revise mais do perfil de backlinks",
        body: "Filtre backlinks por spam score, Domain Rank e tipo de link (follow ou nofollow) no RE9 SEO.",
        featureLabel: "Conheça o recurso de Backlinks",
      }}
    >
      <SpamScoreCheckerTool />
    </ToolFrame>
  );
}
