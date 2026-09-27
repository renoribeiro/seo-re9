import { createFileRoute } from "@tanstack/react-router";
import { KeywordDiscoveryTool } from "@/components/keyword-discovery-tool";
import { ToolFrame } from "@/lib/free-tools/tool-frame";
import { freeTools } from "@/lib/free-tools/tool-pages";
import { buildPageSeo } from "@/lib/seo";
const TOOL = freeTools["keyword-generator"];
export const Route = createFileRoute("/_marketing/keyword-generator")({
  head: () =>
    buildPageSeo({
      title: "Gerador de palavras-chave grátis",
      description:
        "Comece com um tema e encontre ideias de palavras-chave que as pessoas buscam. Compare o volume de busca estimado e a dificuldade no país que você quer alcançar.",
      path: TOOL.path,
      titleSuffix: "RE9 SEO",
      imageAlt: "Gerador de palavras-chave grátis",
    }),
  component: Page,
});
const HIGHLIGHTS = [
  {
    title: "Ideias a partir de um tema",
    description:
      "Receba até 20 sugestões de palavras-chave a partir de uma frase curta, como marketing digital ou tênis de corrida.",
  },
  {
    title: "Volume de busca mensal",
    description:
      "Veja a estimativa de buscas no Google no país selecionado. Use o volume para comparar demanda, não para prever visitas.",
  },
  {
    title: "Estimativas de dificuldade",
    description:
      "Use as pontuações de dificuldade de 0 a 100 disponíveis como uma primeira avaliação e depois analise os resultados de busca antes de escolher uma palavra-chave.",
  },
];
const FAQS = [
  {
    question: "A ferramenta usa IA para inventar palavras-chave?",
    answer:
      "Não. As sugestões vêm do banco de palavras-chave do Google da DataForSEO, com as métricas de volume e dificuldade disponíveis. Alguns temas ou países podem retornar poucas ideias ou nenhuma.",
  },
  {
    question: "Como escolher um tema inicial?",
    answer:
      "Use uma frase curta que descreva seu produto, seu serviço ou o problema do seu público. Se os resultados forem amplos demais, tente uma frase mais específica; se não houver resultados, tente uma mais ampla.",
  },
  {
    question: "O que significam as métricas em branco?",
    answer:
      "Um traço significa que o provedor não tem valor para aquela métrica. Não significa zero buscas nem zero concorrência. Os volumes são estimativas, e variações próximas podem ter a mesma estimativa.",
  },
  {
    question: "Os resultados são atuais?",
    answer:
      "A ferramenta usa o banco de palavras-chave da DataForSEO, que é atualizado periodicamente. Os resultados podem ficar em cache por até 24 horas; não são uma contagem de buscas em tempo real.",
  },
  {
    question: "É grátis?",
    answer:
      "Sim. Você recebe até 20 ideias de palavras-chave sem cadastro. Há limites de uso.",
  },
];
function Page() {
  return (
    <ToolFrame
      tool={TOOL}
      heading={"Gerador de palavras-chave grátis"}
      subhead={
        "Comece com um tema e encontre ideias de palavras-chave que as pessoas buscam. Compare o volume de busca estimado e a dificuldade no país que você quer alcançar."
      }
      highlights={HIGHLIGHTS}
      faqs={FAQS}
      cta={{
        heading: "Escolha seu próximo tema de conteúdo",
        body: "Continue a pesquisa no RE9 SEO e salve palavras-chave no seu projeto.",
        featureLabel: "Conheça a pesquisa de palavras-chave",
      }}
    >
      <KeywordDiscoveryTool tool={"keyword-generator"} />
      <p className="mt-4 text-sm leading-6 text-[var(--color-brand-muted)]">
        Já conhece um concorrente do seu mercado?{" "}
        <a
          className="font-medium text-neutral-950 underline underline-offset-4"
          href="/competitor-keyword-finder"
        >
          Descubra as palavras-chave em que ele ranqueia &rarr;
        </a>
      </p>
    </ToolFrame>
  );
}
