import { createFileRoute } from "@tanstack/react-router";
import { KeywordDiscoveryTool } from "@/components/keyword-discovery-tool";
import { ToolFrame } from "@/lib/free-tools/tool-frame";
import { freeTools } from "@/lib/free-tools/tool-pages";
import { buildPageSeo } from "@/lib/seo";
const TOOL = freeTools["competitor-keyword-finder"];
export const Route = createFileRoute("/_marketing/competitor-keyword-finder")({
  head: () =>
    buildPageSeo({
      title: "Localizador gratuito de palavras-chave de concorrentes",
      description:
        "Descubra as palavras-chave em que um concorrente ranqueia no Google, com volume de busca, posições e as páginas ranqueadas. Digite um domínio para começar.",
      path: TOOL.path,
      titleSuffix: "RE9 SEO",
      imageAlt: "Localizador gratuito de palavras-chave de concorrentes",
    }),
  component: Page,
});
const HIGHLIGHTS = [
  {
    title: "As principais palavras-chave dele",
    description:
      "Veja até 20 palavras-chave orgânicas, começando pelas que devem trazer mais tráfego do Google.",
  },
  {
    title: "Demanda de busca e dificuldade",
    description:
      "Compare o volume de busca mensal estimado e a dificuldade, quando disponíveis, antes de escolher o que priorizar.",
  },
  {
    title: "As páginas que ranqueiam",
    description:
      "Abra a URL ranqueada de cada palavra-chave para ver o conteúdo com o qual você vai competir.",
  },
];
const FAQS = [
  {
    question: "Posso verificar meu próprio site?",
    answer:
      "Sim. Digite o seu domínio ou o de um concorrente. Você não precisa conhecer nenhuma palavra-chave dele antes.",
  },
  {
    question: "Qual a diferença para um verificador de posições?",
    answer:
      "Um verificador de posições confere a posição de uma palavra-chave que você já conhece. Esta ferramenta descobre as palavras-chave em que um domínio ranqueia, para você encontrar ideias que ainda não tinha considerado.",
  },
  {
    question: "De onde vêm os dados?",
    answer:
      "Os resultados vêm do banco de palavras-chave do Google da DataForSEO para o país selecionado. São uma amostra de posições conhecidas, não uma busca ao vivo no Google nem uma lista completa. Os resultados podem ficar em cache por 24 horas.",
  },
  {
    question: "Posso ver as principais páginas dele ou comparar dois sites?",
    answer:
      "Use nossa ferramenta de Análise de concorrentes para ver as principais páginas e, se quiser, comparar as palavras-chave com o seu próprio domínio.",
  },
  {
    question: "É grátis?",
    answer:
      "Sim. Esta ferramenta retorna até 20 palavras-chave sem cadastro. Há limites de uso.",
  },
];
function Page() {
  return (
    <ToolFrame
      tool={TOOL}
      heading={"Localizador gratuito de palavras-chave de concorrentes"}
      subhead={
        "Descubra as palavras-chave em que um concorrente ranqueia no Google, com volume de busca, posições e as páginas ranqueadas. Digite um domínio para começar."
      }
      highlights={HIGHLIGHTS}
      faqs={FAQS}
      cta={{
        heading: "Escolha seu próximo tema de conteúdo",
        body: "Continue a pesquisa no RE9 SEO e salve palavras-chave no seu projeto.",
        featureLabel: "Conheça a Visão geral do domínio",
      }}
    >
      <KeywordDiscoveryTool tool={"competitor-keyword-finder"} />
      <p className="mt-4 text-sm leading-6 text-[var(--color-brand-muted)]">
        Quer as principais páginas dele e uma comparação com o seu site?{" "}
        <a
          className="font-medium text-neutral-950 underline underline-offset-4"
          href="/competitor-analysis"
        >
          Experimente a Análise de concorrentes &rarr;
        </a>
      </p>
    </ToolFrame>
  );
}
