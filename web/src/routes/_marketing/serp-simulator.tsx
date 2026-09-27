import { createFileRoute } from "@tanstack/react-router";
import { SerpSimulatorTool } from "@/components/serp-simulator-tool";
import { ToolFrame } from "@/lib/free-tools/tool-frame";
import { freeTools } from "@/lib/free-tools/tool-pages";
import { buildPageSeo } from "@/lib/seo";

const TOOL = freeTools["serp-simulator"];

export const Route = createFileRoute("/_marketing/serp-simulator")({
  head: () =>
    buildPageSeo({
      title:
        "Simulador de SERP grátis: veja a prévia do título e da meta description no Google",
      description:
        "Veja a prévia do título e da meta description nos resultados de busca no desktop e no mobile, com medição em pixels e cortes aproximados. Sem cadastro e sem e-mail.",
      path: TOOL.path,
      titleSuffix: "RE9 SEO",
      imageAlt: "Simulador de snippet de SERP gratuito do RE9 SEO",
    }),
  component: SerpSimulatorPage,
});

const FAQS = [
  {
    question: "Qual deve ser o tamanho da tag title?",
    answer:
      "Coloque o tema principal no começo. Esta prévia usa como referência um título de 600 pixels no desktop e de duas linhas no mobile. A largura das letras varia, então só a contagem de caracteres não diz se um título vai caber.",
  },
  {
    question: "Qual deve ser o tamanho da meta description?",
    answer:
      "Coloque a informação mais útil primeiro. Esta prévia permite duas linhas no desktop e três no mobile, incluindo a data opcional. Os snippets reais variam conforme a busca e o tamanho da tela.",
  },
  {
    question: "Isso garante o que o Google vai mostrar?",
    answer:
      "Não. O Google reescreve títulos e descrições com frequência, principalmente quando eles não combinam com a busca. Isto é uma aproximação; o Google pode escolher outro texto, outras fontes ou outro layout.",
  },
  {
    question: "Esta ferramenta envia meu texto para algum lugar?",
    answer:
      "Não. Seu título, sua descrição e sua URL ficam no seu navegador. A prévia é atualizada enquanto você digita.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Meça a largura do título",
    description:
      "Veja a largura do título na fonte da prévia, junto com a contagem de caracteres.",
  },
  {
    title: "Desktop e mobile",
    description:
      "Alterne entre as prévias de desktop e mobile para ver como o texto quebra.",
  },
  {
    title: "Nada sai da página",
    description:
      "Seu título e sua descrição ficam no seu navegador. Não é preciso ter conta.",
  },
];

function SerpSimulatorPage() {
  return (
    <ToolFrame
      tool={TOOL}
      heading="Simulador de SERP grátis"
      subhead="Veja a prévia do título e da meta description no Google, no desktop e no mobile. Confira o tamanho e o texto antes de publicar."
      highlights={HIGHLIGHTS}
      faqs={FAQS}
      cta={{
        heading: "Encontre todas as páginas que precisam disso",
        body: "Encontre títulos e descrições ausentes, duplicados ou longos demais com uma auditoria do site no RE9 SEO.",
        featureLabel: "Conheça a Auditoria do site",
      }}
    >
      <SerpSimulatorTool />
    </ToolFrame>
  );
}
