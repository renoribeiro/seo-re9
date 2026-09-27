import { createFileRoute } from "@tanstack/react-router";
import { CompetitorAnalysisTool } from "@/components/competitor-analysis-tool";
import { ToolFrame } from "@/lib/free-tools/tool-frame";
import { freeTools } from "@/lib/free-tools/tool-pages";
import { buildPageSeo } from "@/lib/seo";

const TOOL = freeTools["competitor-analysis"];

export const Route = createFileRoute("/_marketing/competitor-analysis")({
  head: () =>
    buildPageSeo({
      title: "Ferramenta gratuita de análise de concorrentes em SEO",
      description:
        "Veja as principais palavras-chave orgânicas e páginas de um concorrente, compare o tráfego dele com o seu e descubra as palavras-chave em que ele ranqueia e você não. Sem cadastro e sem e-mail.",
      path: TOOL.path,
      titleSuffix: "RE9 SEO",
      imageAlt: "Ferramenta gratuita de análise de concorrentes do RE9 SEO",
    }),
  component: CompetitorAnalysisPage,
});

const FAQS = [
  {
    question: "Quantas palavras-chave a ferramenta gratuita mostra?",
    answer:
      "As 20 principais palavras-chave orgânicas do concorrente por tráfego estimado, as 10 principais páginas e até 20 palavras-chave em que ele ranqueia e você não. O relatório também informa quantas palavras-chave existem no índice no total.",
  },
  {
    question: "Preciso informar meu próprio domínio?",
    answer:
      "Não. Sem ele, você recebe as palavras-chave e as páginas do concorrente. Com o seu domínio, você também vê uma comparação de tráfego lado a lado e a lacuna de palavras-chave entre vocês.",
  },
  {
    question: "De onde vêm os dados?",
    answer:
      "Do índice Labs da DataForSEO, a mesma fonte usada na pesquisa de concorrentes do RE9 SEO. Os números de tráfego são estimativas de um modelo, não o analytics do concorrente.",
  },
  {
    question: "Qual concorrente devo verificar?",
    answer:
      "Escolha um site que ranqueia para palavras-chave relevantes para o seu negócio. Ele pode ser diferente dos concorrentes que você encontra nas vendas.",
  },
];

const HIGHLIGHTS = [
  {
    title: "As melhores palavras-chave dele",
    description:
      "As 20 principais palavras-chave em que o concorrente ranqueia, com volume de busca, dificuldade, posição e a URL ranqueada.",
  },
  {
    title: "As melhores páginas dele",
    description:
      "As 10 páginas com maior tráfego orgânico estimado, para você ver qual conteúdo traz visitantes.",
  },
  {
    title: "A lacuna em relação a você",
    description:
      "Adicione seu domínio para ver o tráfego estimado lado a lado e as palavras-chave em que ele ranqueia e você nem aparece.",
  },
];

function CompetitorAnalysisPage() {
  return (
    <ToolFrame
      tool={TOOL}
      heading="Ferramenta gratuita de análise de concorrentes"
      subhead="Consulte as palavras-chave orgânicas e as principais páginas de qualquer concorrente, compare o tráfego de busca dele com o seu e descubra as palavras-chave em que ele ranqueia e você não."
      highlights={HIGHLIGHTS}
      faqs={FAQS}
      cta={{
        heading: "Transforme a lacuna em um plano",
        body: "Veja mais palavras-chave do concorrente no RE9 SEO, salve as relevantes e adicione-as ao monitoramento de posições.",
        featureLabel: "Conheça a Visão geral do domínio",
      }}
    >
      <CompetitorAnalysisTool />
      <p className="mt-4 text-sm leading-6 text-[var(--color-brand-muted)]">
        Está começando agora? A{" "}
        <a
          href="/library/competitive-analysis/find-your-real-competitors"
          className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
        >
          biblioteca de análise competitiva
        </a>{" "}
        explica como escolher os concorrentes certos antes de começar a puxar as
        palavras-chave deles.
      </p>
    </ToolFrame>
  );
}
