import { createFileRoute } from "@tanstack/react-router";
import { DomainAgeCheckerTool } from "@/components/domain-age-checker-tool";
import { ToolFrame } from "@/lib/free-tools/tool-frame";
import { freeTools } from "@/lib/free-tools/tool-pages";
import { buildPageSeo } from "@/lib/seo";

const TOOL = freeTools["domain-age-checker"];

export const Route = createFileRoute("/_marketing/domain-age-checker")({
  head: () =>
    buildPageSeo({
      title: "Verificador de idade de domínio grátis: data de registro e idade",
      description:
        "Descubra quando um domínio foi registrado, quantos anos ele tem, quando expira e qual é o registrador — até 10 domínios de uma vez. Sem cadastro e sem e-mail.",
      path: TOOL.path,
      titleSuffix: "RE9 SEO",
      imageAlt: "Verificador de idade de domínio gratuito do RE9 SEO",
    }),
  component: DomainAgeCheckerPage,
});

const FAQS = [
  {
    question: "A idade do domínio afeta o ranqueamento?",
    answer:
      "Quase nada, por si só. O Google já disse que idade não é fator de ranqueamento. O que se relaciona com a idade é tudo o que um site acumula ao longo dos anos — links, conteúdo, buscas pela marca — e isso, sim, importa. Um domínio antigo e vazio ranqueia pior que um novo e útil.",
  },
  {
    question: "De onde vêm esses dados?",
    answer:
      "Do RDAP, o protocolo de registro que substituiu o WHOIS. A consulta vai direto ao registro responsável pelo domínio, então não há nenhuma fonte de dados de terceiros no meio.",
  },
  {
    question: "Por que um domínio aparece sem dados de registro?",
    answer:
      "Alguns domínios de país (ccTLDs) não publicam registros RDAP, e alguns registros ocultam as datas. Nesses casos, a ferramenta avisa naquela linha em vez de chutar, e os outros domínios da lista continuam aparecendo.",
  },
  {
    question: "A idade é a mesma da data de lançamento do site?",
    answer:
      "Não. É a data em que o domínio foi registrado pela primeira vez. Um domínio pode ficar parado por anos, ou mudar de dono e recomeçar com conteúdo novo. Veja em que ele ranqueia antes de tirar conclusões.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Idade em anos e meses",
    description:
      "Data de registro, idade em anos e meses, última atualização e expiração de cada domínio que você colar.",
  },
  {
    title: "Registrador informado",
    description:
      "Por meio de qual registrador o domínio foi registrado, quando o registro publica essa informação.",
  },
  {
    title: "Dez de uma vez",
    description:
      "Útil para avaliar uma lista de prospects de links ou de domínios expirados e ver as datas em uma só tabela.",
  },
];

function DomainAgeCheckerPage() {
  return (
    <ToolFrame
      tool={TOOL}
      heading="Verificador de idade de domínio grátis"
      subhead="Veja quando um domínio foi registrado, quantos anos ele tem, quando expira e qual registrador usa. Até 10 domínios de uma vez, direto do registro."
      highlights={HIGHLIGHTS}
      faqs={FAQS}
      cta={{
        heading: "Confira as posições e os links do domínio",
        body: "Consulte as palavras-chave ranqueadas e os backlinks do domínio no RE9 SEO.",
        featureLabel: "Conheça a Visão geral do domínio",
      }}
    >
      <DomainAgeCheckerTool />
    </ToolFrame>
  );
}
