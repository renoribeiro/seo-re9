import { createFileRoute } from "@tanstack/react-router";
import { BacklinkCheckerTool } from "@/components/backlink-checker-tool";
import { ToolFrame } from "@/lib/free-tools/tool-frame";
import { freeTools } from "@/lib/free-tools/tool-pages";
import { buildPageSeo } from "@/lib/seo";

const TOOL = freeTools["backlink-checker"];

export const Route = createFileRoute("/_marketing/backlink-checker")({
  // `?target=example.com` prefills the input. Plain links still work.
  validateSearch: (search: Record<string, unknown>): { target?: string } =>
    typeof search.target === "string" ? { target: search.target } : {},
  head: () =>
    buildPageSeo({
      title:
        "Verificador de backlinks grátis: confira os backlinks de qualquer site",
      description:
        "Confira os backlinks de qualquer domínio: domínios de referência, principais backlinks, texto âncora e tipo de link (follow ou nofollow). Resultados na hora, sem cadastro e sem e-mail.",
      path: TOOL.path,
      titleSuffix: "RE9 SEO",
      imageAlt: "Verificador de backlinks gratuito do RE9 SEO",
    }),
  component: BacklinkCheckerPage,
});

const FAQS = [
  {
    question: "De onde vêm os dados de backlinks?",
    answer:
      "Os resultados vêm do índice de links da DataForSEO, a mesma fonte de dados usada na pesquisa de backlinks do RE9 SEO. O índice é atualizado continuamente, então os números podem variar um pouco em relação a outras ferramentas que rastreiam a web no próprio ritmo.",
  },
  {
    question: "Quantos backlinks posso ver de graça?",
    answer:
      "O verificador gratuito mostra as métricas de resumo do domínio e os 15 principais backlinks, um por domínio de referência, ordenados pela força do domínio. Crie uma conta no RE9 SEO para navegar pela lista completa, ver domínios de referência e âncoras, filtrar spam e exportar os dados.",
  },
  {
    question: "Posso verificar os backlinks de um concorrente?",
    answer:
      "Sim. Digite o seu domínio, o de um concorrente ou o de um site que você está avaliando para outreach. Dados de backlinks são dados públicos da web, então não é preciso ser dono do site nem fazer nenhuma verificação.",
  },
  {
    question: "O que é o Domain Rank?",
    answer:
      "O Domain Rank é uma pontuação de 0 a 100 da força do perfil de links de um domínio, parecida com as métricas de autoridade de domínio de outras ferramentas. Quanto maior, mais links (e mais fortes) apontam para o domínio.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Resumo do perfil de links",
    description:
      "Domain Rank, total de backlinks, domínios de referência e backlinks quebrados do domínio verificado.",
  },
  {
    title: "Principais backlinks",
    description:
      "Os links mais fortes que apontam para o domínio, um por domínio de referência, com texto âncora e tipo de link (follow ou nofollow).",
  },
  {
    title: "Visão sobre concorrentes",
    description:
      "Funciona com qualquer domínio, então você vê quem linka para os concorrentes e de onde vem a autoridade deles.",
  },
];

function BacklinkCheckerPage() {
  const { target } = Route.useSearch();

  return (
    <ToolFrame
      tool={TOOL}
      heading="Verificador de backlinks grátis"
      subhead="Confira os backlinks de qualquer site. Digite um domínio e veja o Domain Rank, os domínios de referência e os principais backlinks, com texto âncora e tipo de link."
      highlights={HIGHLIGHTS}
      faqs={FAQS}
      cta={{
        heading: "Explore mais backlinks",
        body: "Navegue pelos domínios de referência, analise o texto âncora e filtre backlinks no RE9 SEO.",
        featureLabel: "Conheça o recurso de Backlinks",
      }}
    >
      <BacklinkCheckerTool initialTarget={target} />
    </ToolFrame>
  );
}
