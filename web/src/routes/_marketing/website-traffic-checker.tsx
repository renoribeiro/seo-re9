import { createFileRoute } from "@tanstack/react-router";
import { WebsiteTrafficCheckerTool } from "@/components/website-traffic-checker-tool";
import { ToolFrame } from "@/lib/free-tools/tool-frame";
import { freeTools } from "@/lib/free-tools/tool-pages";
import { buildPageSeo } from "@/lib/seo";

const TOOL = freeTools["website-traffic-checker"];

export const Route = createFileRoute("/_marketing/website-traffic-checker")({
  head: () =>
    buildPageSeo({
      title:
        "Verificador de tráfego de sites grátis: estime o tráfego orgânico de qualquer site",
      description:
        "Estime o tráfego orgânico, o número de palavras-chave e o valor do tráfego de qualquer site, com as principais palavras-chave e páginas. Compare dois domínios. Sem cadastro e sem e-mail.",
      path: TOOL.path,
      titleSuffix: "RE9 SEO",
      imageAlt: "Verificador de tráfego de sites gratuito do RE9 SEO",
    }),
  component: WebsiteTrafficCheckerPage,
});

const FAQS = [
  {
    question: "Esses números de tráfego são precisos?",
    answer:
      "A DataForSEO estima o tráfego orgânico a partir das posições e do volume de busca. Use essas estimativas para comparar domínios; elas não medem visitas reais.",
  },
  {
    question: "Por que o resultado é diferente do Google Analytics?",
    answer:
      "O Analytics conta as visitas que realmente aconteceram, em todos os canais. Esta ferramenta estima apenas as visitas da busca orgânica, para um país, com base em dados de posição. Diferenças são esperadas.",
  },
  {
    question: "Quanto eu recebo de graça?",
    answer:
      "As métricas de resumo, mais as 5 principais palavras-chave e as 5 principais páginas de cada domínio, para um país por vez. No RE9 SEO, você vê mais palavras-chave e páginas, filtra os resultados e salva palavras-chave para o monitoramento de posições.",
  },
  {
    question: "De onde vêm os dados?",
    answer:
      "Do índice Labs da DataForSEO — a mesma fonte usada na visão geral do domínio do RE9 SEO. Os resultados ficam em cache por 24 horas por domínio e país.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Estimativa de tráfego orgânico",
    description:
      "Visitas orgânicas mensais estimadas, em quantas palavras-chave o domínio ranqueia e quanto custaria comprar esse tráfego.",
  },
  {
    title: "Principais palavras-chave e páginas",
    description:
      "As cinco palavras-chave que mais trazem tráfego e as cinco páginas que mais o recebem, com volume, posição e URL ranqueada.",
  },
  {
    title: "Compare dois domínios",
    description:
      "Adicione um segundo domínio para comparar tráfego e número de palavras-chave e depois explore as principais palavras-chave e páginas de cada site.",
  },
];

function WebsiteTrafficCheckerPage() {
  return (
    <ToolFrame
      tool={TOOL}
      heading="Verificador de tráfego de sites grátis"
      subhead="Estime quanto tráfego da busca orgânica qualquer site recebe, quais palavras-chave o trazem e quais páginas o recebem. Adicione um segundo domínio para comparar."
      highlights={HIGHLIGHTS}
      faqs={FAQS}
      cta={{
        heading: "Explore mais palavras-chave e páginas",
        body: "Explore relatórios de domínio, salve palavras-chave promissoras e monitore as posições delas no RE9 SEO.",
        featureLabel: "Conheça a Visão geral do domínio",
      }}
    >
      <WebsiteTrafficCheckerTool />
    </ToolFrame>
  );
}
