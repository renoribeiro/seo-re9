export type StrategyLibraryItem = {
  title: string;
  description: string;
  href: string;
};

export const keywordResearchStrategies: StrategyLibraryItem[] = [
  {
    title: "Parta das conversas, não de um relatório de volume",
    description:
      "Colete palavras-chave semente em ligações de vendas e tickets de suporte, usando a linguagem que os clientes já usam.",
    href: "/library/keyword-research/seed-from-conversation",
  },
  {
    title: "O que são palavras-chave de cauda longa e como garimpá-las",
    description:
      "Encontre palavras-chave de cauda longa no People Also Ask, no preenchimento automático e nas consultas do Search Console em que suas páginas já ranqueiam.",
    href: "/library/keyword-research/long-tail-question-mining",
  },
  {
    title: "Mapeamento de intenção de busca (quente / morna / fria)",
    description:
      "Classifique as palavras-chave pela temperatura de compra antes de escrever e crie primeiro as páginas de alta intenção.",
    href: "/library/keyword-research/search-intent-mapping",
  },
  {
    title: "Agrupe palavras-chave em hubs temáticos",
    description:
      "Agrupe palavras-chave por intenção e monte hubs temáticos sem criar páginas que competem entre si.",
    href: "/library/keyword-research/cluster-topical-hubs",
  },
  {
    title: "Descoberta programática com o Search Console",
    description:
      "Use o MCP para encontrar consultas e páginas do Search Console com espaço para ganhar mais cliques.",
    href: "/library/keyword-research/gsc-programmatic-discovery",
  },
  {
    title: "Dimensionamento de oportunidades e projeções",
    description:
      "Estime a dificuldade, a faixa de tráfego e os cenários de retorno de um grupo de palavras-chave antes de investir.",
    href: "/library/keyword-research/opportunity-sizing-forecasting",
  },
  {
    title: "Intenção além do Google (Pinterest, IA, LinkedIn)",
    description:
      "Pesquise a demanda no Pinterest, no LinkedIn e em assistentes de IA.",
    href: "/library/keyword-research/intent-beyond-google",
  },
  {
    title: "Ligue o posicionamento à demanda real",
    description:
      "Verifique se a linguagem da sua categoria corresponde aos termos que os clientes buscam.",
    href: "/library/keyword-research/positioning-to-demand",
  },
];

export const COMPETITIVE_ANALYSIS_LIBRARY = {
  name: "Análise de concorrentes",
  path: "/library/competitive-analysis",
};

export const competitiveAnalysisStrategies: StrategyLibraryItem[] = [
  {
    title: "Descubra quem são seus concorrentes de verdade",
    description:
      "Os domínios que dividem suas SERPs raramente são as empresas da sua lista de concorrentes. Compare um conjunto de palavras-chave e leia a lista contra quem você realmente compete.",
    href: "/library/competitive-analysis/find-your-real-competitors",
  },
  {
    title:
      "Análise de lacunas de palavras-chave: tire os termos de marca primeiro",
    description:
      "A maioria das listas de palavras-chave ranqueadas é quase toda de marca. Tire a marca dos dois lados e a lacuna vira uma lista curta e executável.",
    href: "/library/competitive-analysis/keyword-gap-analysis",
  },
  {
    title: "Quão precisas são as estimativas de tráfego dos concorrentes?",
    description:
      "Leia uma visão geral do domínio sem se enganar com variantes próximas somadas ou com um número de tráfego que vem de outra linha de negócio.",
    href: "/library/competitive-analysis/competitor-traffic-estimates",
  },
  {
    title: "Leia o perfil de links de um concorrente antes de copiá-lo",
    description:
      "Domínios de referência, spam score e links quebrados mostram se uma vantagem de autoridade é real ou só repetida.",
    href: "/library/competitive-analysis/backlink-gap-analysis",
  },
];

export const SITE_AUDIT_LIBRARY = {
  name: "Auditoria do site",
  path: "/library/site-audit",
};

export const siteAuditStrategies: StrategyLibraryItem[] = [
  {
    title: "O checklist de auditoria técnica de SEO que termina em correções",
    description:
      "Um rastreamento trouxe 1.180 achados, e 35 importavam. Ordene por gravidade, agrupe por causa e leia a correção que acompanha cada problema.",
    href: "/library/site-audit/technical-seo-audit-checklist",
  },
  {
    title:
      "Escreva um relatório de auditoria que o cliente vai colocar em prática",
    description:
      "Uma estrutura de seis seções que liga cada achado a uma página, a um custo e a um número do negócio, e o que deixar de fora.",
    href: "/library/site-audit/seo-audit-report-template",
  },
  {
    title: "Inchaço de índice: quando a correção é apagar páginas",
    description:
      "Cinco milhões de páginas saíram de um site e ele se recuperou. Num site pequeno, o mesmo instinto costuma desperdiçar um fim de semana. Veja como saber qual é o seu caso.",
    href: "/library/site-audit/index-bloat",
  },
];

export const RANK_TRACKING_LIBRARY = {
  name: "Monitoramento de posições",
  path: "/library/rank-tracking",
};

export const rankTrackingStrategies: StrategyLibraryItem[] = [
  {
    title: "Quais palavras-chave monitorar, e quantas",
    description:
      "De vinte a cinquenta termos tirados do Search Console, ligados a páginas que geram receita, com custo estimado antes de entrarem. Um monitoramento de 500 linhas é um relatório que ninguém lê.",
    href: "/library/rank-tracking/which-keywords-to-track",
  },
  {
    title:
      "O Search Console serve para monitorar posições? Onde os dados gratuitos param",
    description:
      "O Search Console mostra uma média entre pessoas e dispositivos, com dados recentes preliminares. Basta para muitos sites. Veja como saber se o seu precisa de mais.",
    href: "/library/rank-tracking/search-console-vs-rank-tracker",
  },
  {
    title:
      "Monitoramento de posições local: a posição depende de onde a pessoa está",
    description:
      "Nove pontos a três quilômetros de distância, quatro empresas diferentes em primeiro lugar. Por que um negócio local precisa de uma grade antes de um monitoramento.",
    href: "/library/rank-tracking/local-rank-tracking",
  },
  {
    title: "O relatório de posições que o seu CEO vai ler",
    description:
      "Comece pelo número do negócio, agrupe as variações em quatro contagens, explique três linhas e diga o que vem a seguir. Uma página, todo mês.",
    href: "/library/rank-tracking/keyword-ranking-report",
  },
];

export const AI_AGENT_SEO_LIBRARY = {
  name: "SEO com agentes de IA",
  path: "/library/ai-agent-seo",
};

export const aiAgentSeoStrategies: StrategyLibraryItem[] = [
  {
    title: "Faça SEO pelo seu assistente de IA: o fluxo com MCP",
    description:
      "Conecte um servidor e o assistente que você já usa passa a ler o Search Console, puxar dados de palavras-chave e checar posições na mesma conversa. Os cinco primeiros prompts, e a linha que mostra por que uma pessoa ainda precisa ler o resultado.",
    href: "/library/ai-agent-seo/run-seo-from-your-ai-assistant",
  },
  {
    title: "O que automatizar e o que manter: a regra do despachante",
    description:
      "Uma checagem de posições agendada roda sem ninguém olhando. A decisão sobre quais palavras-chave entram nela, não. São três camadas, não duas.",
    href: "/library/ai-agent-seo/what-to-automate",
  },
  {
    title: "Conteúdo com pessoas no processo: o briefing é o trabalho",
    description:
      "A maioria das equipes faz o ciclo ao contrário. Pessoas escrevem o briefing, o modelo rascunha, pessoas editam, e as duas checagens que pegam o rascunho que soa igual a todos os outros.",
    href: "/library/ai-agent-seo/human-in-the-loop-content",
  },
  {
    title: "Skills, memória e rastro: torne a boa execução repetível",
    description:
      "Salve o fluxo como uma skill, dê ao agente uma memória que ele lê a cada execução e faça-o registrar cada passo. Mais as duas checagens que pegam a resposta errada dita com confiança.",
    href: "/library/ai-agent-seo/skills-memory-and-the-trace",
  },
];

export const LINK_BUILDING_LIBRARY = {
  name: "Link building",
  path: "/library/link-building",
};

export const linkBuildingStrategies: StrategyLibraryItem[] = [
  {
    title:
      "A auditoria de backlinks: ordene por data de descoberta, depois por relevância",
    description:
      "Os três links mais novos de um site real eram um domínio de cassino e dois vendedores de links. Embaixo deles estavam os links que contam. Como separar uns dos outros em uma hora.",
    href: "/library/link-building/backlink-audit",
  },
  {
    title:
      "Domínios de referência, não backlinks: o número que move as posições",
    description:
      "2.393 backlinks, 308 domínios de referência, 872 vindos de um único site que o mesmo dono também mantém. Por que o segundo número é o que deve ir no relatório.",
    href: "/library/link-building/referring-domains",
  },
  {
    title:
      "Como conseguir backlinks: comece pelas páginas que já conquistam links",
    description:
      "Uma calculadora gratuita com links de 17 domínios, uma página de mutirão de limpeza de parque com 270 backlinks. Nenhuma foi oferecida a ninguém. Quatro táticas que conquistaram links de verdade.",
    href: "/library/link-building/how-to-get-backlinks",
  },
];
