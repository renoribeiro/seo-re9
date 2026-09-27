import { FEATURE_PAGE_SLUGS } from "@/lib/feature-page-slugs";

export type FeaturePage = {
  slug: string;
  eyebrow: string;
  navDescription: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  imageAlt: string;
  imageSrc: string;
  workflows: Array<{
    title: string;
    description: string;
  }>;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  showMetrics?: boolean;
  useCases: string[];
  differentiators: string[];
  featuredLink?: {
    title: string;
    description: string;
    href: string;
  };
  related: Array<{
    label: string;
    href: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  guides?: {
    title: string;
    description: string;
    items: Array<{
      label: string;
      description: string;
      href: string;
    }>;
    cta: {
      label: string;
      href: string;
    };
  };
};

export const featurePages = {
  keywordResearch: {
    slug: FEATURE_PAGE_SLUGS.keywordResearch,
    eyebrow: "Pesquisa de palavras-chave",
    navDescription: "Encontre ideias de palavras-chave e SERPs.",
    title:
      "Ferramenta de pesquisa de palavras-chave para um planejamento de SEO prático",
    description:
      "Encontre ideias de palavras-chave, compare volume de busca e dificuldade, analise os resultados da SERP e salve as oportunidades que valem o investimento.",
    primaryKeyword: "ferramenta de pesquisa de palavras-chave",
    secondaryKeywords: [
      "ferramenta de palavras-chave para seo",
      "ferramenta gratuita de palavras-chave",
      "ferramentas de pesquisa de palavras-chave",
    ],
    imageAlt: "Painel de pesquisa de palavras-chave do RE9 SEO",
    imageSrc:
      "https://imagedelivery.net/ysLOa6bzFaM49Jxok-TAlw/d77077d0-cdf4-4523-0c41-56a7b4861300/public",
    workflows: [
      {
        title: "Pesquise temas-semente",
        description:
          "Comece com um ou mais termos-semente e transforme-os em ideias de palavras-chave com volume, dificuldade, CPC e sinais de intenção.",
      },
      {
        title: "Analise a SERP real",
        description:
          "Abra os resultados da SERP ao lado das métricas para decidir o conteúdo com base nas páginas que já ranqueiam para a busca.",
      },
      {
        title: "Salve e organize oportunidades",
        description:
          "Guarde as palavras-chave úteis no seu espaço de trabalho e marque-as com tags para planejamento de conteúdo, monitoramento de posições ou fluxos com agentes de IA.",
      },
    ],
    metrics: [
      { label: "Volume de busca", value: "Demanda" },
      { label: "Dificuldade da palavra-chave (KD)", value: "Concorrência" },
      { label: "CPC", value: "Sinal comercial" },
      { label: "Resultados da SERP", value: "Contexto da busca" },
    ],
    showMetrics: true,
    useCases: [
      "Monte um plano de conteúdo com dados reais de palavras-chave.",
      "Encontre variações com menos concorrência antes de escrever.",
      "Agrupe palavras-chave para artigos, landing pages e monitoramento de posições.",
    ],
    differentiators: [
      "Fluxos de SEO open source que você pode hospedar por conta própria ou usar no app gerenciado.",
      "Métricas da DataForSEO sem prender a pesquisa em uma caixa-preta.",
      "Acesso via MCP para que agentes de IA pesquisem e salvem palavras-chave por você.",
    ],
    featuredLink: {
      title: "Ferramenta gratuita de análise de concorrentes",
      description:
        "Veja as principais palavras-chave orgânicas de um concorrente e os termos em que ele ranqueia e você não. Sem cadastro.",
      href: "/competitor-analysis",
    },
    related: [
      {
        label: "Agrupamento de palavras-chave",
        href: "/docs/skills/keyword-clustering",
      },
      {
        label: "Pesquisa de palavras-chave",
        href: "/docs/skills/keyword-research",
      },
      { label: "Monitoramento de posições", href: "/features/rank-tracking" },
    ],
    faqs: [
      {
        question: "Para que serve a pesquisa de palavras-chave do RE9 SEO?",
        answer:
          "Para encontrar ideias de palavras-chave para SEO, verificar demanda e dificuldade e transformar essas ideias em palavras-chave salvas que você pode revisitar.",
      },
      {
        question:
          "Posso usar o RE9 SEO como ferramenta gratuita de pesquisa de palavras-chave?",
        answer:
          "Não de forma ilimitada: dados de palavras-chave de qualidade têm custo em qualquer ferramenta. Como o RE9 SEO é open source, você pode hospedá-lo por conta própria com a sua conta da DataForSEO. Para o plano hospedado, fale com a gente: trafego@re9.online.",
      },
      {
        question: "O RE9 SEO mostra resultados de busca ao vivo?",
        answer:
          "Sim. A pesquisa de palavras-chave pode ser combinada com a análise da SERP para você ver as páginas que ranqueiam ao lado das métricas.",
      },
    ],
    guides: {
      title: "Biblioteca de estratégias de pesquisa de palavras-chave",
      description:
        "Estratégias práticas para usar a pesquisa de palavras-chave e descobrir demanda. Cada guia traz um passo a passo completo e um prompt MCP pronto para copiar.",
      items: [
        {
          label:
            "Tire as sementes das conversas, não de um relatório de volume",
          description:
            "Colete palavras-chave-semente em ligações de vendas e chamados de suporte.",
          href: "/library/keyword-research/seed-from-conversation",
        },
        {
          label: "O que são palavras-chave de cauda longa e como encontrá-las",
          description:
            "Expansão pelo “As pessoas também perguntam”, coleta do preenchimento automático e suas próprias consultas do GSC.",
          href: "/library/keyword-research/long-tail-question-mining",
        },
        {
          label: "Mapeamento de intenção de busca (quente / morna / fria)",
          description:
            "Classifique palavras-chave pela temperatura de compra antes de escrever.",
          href: "/library/keyword-research/search-intent-mapping",
        },
        {
          label: "Agrupe palavras-chave em hubs temáticos",
          description:
            "Uma página por intenção, mais a correção da canibalização de palavras-chave.",
          href: "/library/keyword-research/cluster-topical-hubs",
        },
      ],
      cta: {
        label: "Ver todas as estratégias de pesquisa de palavras-chave",
        href: "/library/keyword-research",
      },
    },
  },
  siteAudit: {
    slug: FEATURE_PAGE_SLUGS.siteAudit,
    eyebrow: "Auditoria do site",
    navDescription: "Audite os sinais de SEO de cada página.",
    title:
      "Ferramenta de auditoria de SEO para encontrar problemas técnicos rápido",
    description:
      "Rastreie um site, colete sinais técnicos de cada página e, se quiser, rode verificações do Lighthouse para problemas de desempenho, SEO, acessibilidade e boas práticas.",
    primaryKeyword: "ferramenta de auditoria de seo",
    secondaryKeywords: [
      "auditoria de seo do site",
      "ferramenta gratuita de auditoria de seo",
      "ferramentas de auditoria de seo",
    ],
    imageAlt: "Relatório de auditoria do site no RE9 SEO",
    imageSrc:
      "https://imagedelivery.net/ysLOa6bzFaM49Jxok-TAlw/53149e87-0027-4fa8-5d13-bcaab60c7100/public",
    workflows: [
      {
        title: "Rastreie o site",
        description:
          "Verifique códigos de status, títulos, meta descriptions, headings, sinais de indexação, cobertura de texto alternativo em imagens, links, tempo de resposta e, opcionalmente, os achados do Lighthouse.",
      },
      {
        title: "Priorize os problemas",
        description:
          "Revise as páginas rastreadas e os resultados opcionais do Lighthouse para a equipe focar nos problemas visíveis de página e de desempenho.",
      },
      {
        title: "Aprofunde nas URLs afetadas",
        description:
          "Vá direto às URLs com título ausente, metadados, headings e texto alternativo com problemas, erros de status, dados de tempo de resposta ou achados opcionais do Lighthouse.",
      },
    ],
    metrics: [
      { label: "URLs rastreadas", value: "Cobertura" },
      { label: "Campos da página", value: "Verificações" },
      { label: "Páginas afetadas", value: "Escopo" },
      { label: "Histórico de auditorias", value: "Progresso" },
    ],
    showMetrics: true,
    useCases: [
      "Audite um site novo antes de começar o trabalho de SEO.",
      "Encontre problemas técnicos depois de uma migração ou redesign.",
      "Exporte os dados das páginas rastreadas e os achados do Lighthouse para as equipes de desenvolvimento e conteúdo.",
    ],
    differentiators: [
      "Um rastreador prático no mesmo espaço de trabalho da pesquisa de palavras-chave e de domínios.",
      "Implementação open source para equipes que querem inspecionar ou estender o fluxo de auditoria.",
      "Relatórios simples que mostram os sinais de cada página e os achados opcionais do Lighthouse, em vez de depender só de uma nota genérica.",
    ],
    featuredLink: {
      title: "Simulador de SERP gratuito",
      description:
        "Veja como um título e uma meta description aparecem no Google, com a largura em pixels. Sem cadastro.",
      href: "/serp-simulator",
    },
    related: [
      { label: "Visão geral do domínio", href: "/features/domain-overview" },
      { label: "Backlinks", href: "/features/backlink-checker" },
      {
        label: "Pesquisa de palavras-chave",
        href: "/features/keyword-research",
      },
    ],
    faqs: [
      {
        question: "O que a auditoria do site do RE9 SEO verifica?",
        answer:
          "Códigos de status, títulos, meta descriptions, headings, sinais de indexação, cobertura de texto alternativo em imagens, links e tempo de resposta de cada página rastreada. Ative o Lighthouse e cada página também recebe problemas de desempenho, SEO, acessibilidade e boas práticas.",
      },
      {
        question: "O RE9 SEO é uma ferramenta gratuita de auditoria de SEO?",
        answer:
          "O RE9 SEO é open source e pode ser hospedado por conta própria, e aí você arca só com os seus custos de hospedagem e de dados. Para o plano hospedado, fale com a gente: trafego@re9.online.",
      },
      {
        question: "Para quem é a auditoria do site do RE9 SEO?",
        answer:
          "É útil para empreendedores, profissionais de marketing, agências e desenvolvedores que precisam de um relatório de rastreamento compartilhado e, opcionalmente, da exportação dos problemas do Lighthouse.",
      },
    ],
    guides: {
      title: "Biblioteca de estratégias de auditoria do site",
      description:
        "Estratégias práticas para transformar um rastreamento em trabalho agendado. Cada guia traz um passo a passo completo e um prompt MCP pronto para copiar.",
      items: [
        {
          label:
            "O checklist de auditoria técnica de SEO que termina em correções",
          description:
            "Reduza 1.180 achados aos 35 que impedem uma página de ser vista.",
          href: "/library/site-audit/technical-seo-audit-checklist",
        },
        {
          label:
            "Escreva um relatório de auditoria que o cliente vai colocar em prática",
          description:
            "Seis seções que ligam cada achado a uma página, a um custo e a um responsável.",
          href: "/library/site-audit/seo-audit-report-template",
        },
        {
          label: "Inchaço do índice: quando a solução é excluir páginas",
          description:
            "Confira o que o Google de fato indexou antes de remover qualquer coisa.",
          href: "/library/site-audit/index-bloat",
        },
      ],
      cta: {
        label: "Ver todas as estratégias de auditoria do site",
        href: "/library/site-audit",
      },
    },
  },
  backlinks: {
    slug: FEATURE_PAGE_SLUGS.backlinks,
    eyebrow: "Backlinks",
    navDescription: "Confira links e domínios de referência.",
    title:
      "Verificador de backlinks para entender o perfil de links de um domínio",
    description:
      "Analise backlinks, domínios de referência e páginas linkadas sem separar a pesquisa de links do restante do seu espaço de trabalho de SEO.",
    primaryKeyword: "análise de backlinks",
    secondaryKeywords: [
      "ferramenta de análise de backlinks",
      "domínios de referência",
      "perfil de links",
    ],
    imageAlt: "Relatório de backlinks do RE9 SEO",
    imageSrc:
      "https://imagedelivery.net/ysLOa6bzFaM49Jxok-TAlw/d97206ed-bd64-447c-2b9e-1b9f07c5ec00/public",
    workflows: [
      {
        title: "Confira os backlinks de um domínio",
        description:
          "Consulte backlinks e sinais de domínios de referência do seu site, de concorrentes ou de páginas que você está avaliando.",
      },
      {
        title: "Compare a qualidade dos links",
        description:
          "Use as linhas de backlinks e de domínios de referência, com sinais de rank, spam, links quebrados, perdidos e nofollow, para avaliar a qualidade dos links.",
      },
      {
        title: "Filtre e exporte os dados de links",
        description:
          "Exporte e filtre dados de backlinks, domínios de referência e páginas principais para sua prospecção, pesquisa de concorrentes ou limpeza de links.",
      },
    ],
    metrics: [
      { label: "Backlinks", value: "Links" },
      { label: "Domínios de referência", value: "Fontes" },
      { label: "URLs de destino", value: "Distribuição" },
      { label: "Sinais de rank e spam", value: "Contexto de qualidade" },
    ],
    showMetrics: true,
    useCases: [
      "Veja quem linka para um concorrente.",
      "Avalie oportunidades de links para páginas importantes.",
      "Entenda se um domínio tem autoridade real antes de investir em conteúdo.",
    ],
    differentiators: [
      "A análise de backlinks fica ao lado da pesquisa de palavras-chave, da visão geral do domínio e dos dados de auditoria.",
      "Hospede por conta própria ou adapte os relatórios de backlinks ao fluxo da sua equipe.",
      "O suporte a MCP permite que um agente de IA consulte o contexto de backlinks durante a pesquisa de SEO.",
    ],
    guides: {
      title: "Biblioteca de estratégias de link building",
      description:
        "Estratégias práticas para ler um perfil de backlinks e conquistar links que fazem diferença. Cada guia traz um passo a passo completo e um prompt MCP pronto para copiar.",
      items: [
        {
          label: "A auditoria de backlinks",
          description:
            "Ordene pela primeira detecção, separe o lixo e leia as linhas que importam.",
          href: "/library/link-building/backlink-audit",
        },
        {
          label: "Domínios de referência, não backlinks",
          description:
            "O número que vale reportar e do que é feito o topo da lista.",
          href: "/library/link-building/referring-domains",
        },
        {
          label: "Como conseguir backlinks",
          description:
            "Comece pelas páginas que já conquistam links. Quatro estratégias práticas.",
          href: "/library/link-building/how-to-get-backlinks",
        },
      ],
      cta: {
        label: "Ver todas as estratégias de link building",
        href: "/library/link-building",
      },
    },
    featuredLink: {
      title: "Verificador de backlinks gratuito",
      description:
        "Confira o resumo de backlinks de qualquer domínio e os 15 principais backlinks. Sem cadastro.",
      href: "/backlink-checker",
    },
    related: [
      {
        label: "Prospecção de links",
        href: "/docs/skills/link-prospecting",
      },
      { label: "Visão geral do domínio", href: "/features/domain-overview" },
    ],
    faqs: [
      {
        question: "Para que serve a análise de backlinks?",
        answer:
          "A análise de backlinks mostra quais sites linkam para um domínio ou página, quais links têm sinais mais fortes de rank, spam, links quebrados, perdidos ou nofollow, e onde os concorrentes estão ganhando autoridade.",
      },
      {
        question: "Posso ver os backlinks dos concorrentes no RE9 SEO?",
        answer:
          "Sim. Informe qualquer domínio, o seu ou o de um concorrente, e veja os backlinks, os domínios de referência e as páginas mais linkadas.",
      },
      {
        question:
          "Como a pesquisa de backlinks se conecta ao planejamento de SEO?",
        answer:
          "Os backlinks mostram se uma página ranqueia pelo conteúdo ou pela autoridade. Confira-os antes de mirar uma palavra-chave para avaliar se é realista superar quem já está no topo, e analise o perfil de um concorrente para achar sites que também podem linkar para você.",
      },
    ],
  },
  domainOverview: {
    slug: FEATURE_PAGE_SLUGS.domainOverview,
    eyebrow: "Visão geral do domínio",
    navDescription: "Analise a visibilidade dos concorrentes.",
    title:
      "Visão geral do domínio: tráfego, palavras-chave e páginas de qualquer site",
    description:
      "Tenha uma visão geral de qualquer site: tráfego orgânico estimado, palavras-chave ranqueadas e principais páginas orgânicas, com um clique para a pesquisa de backlinks e de palavras-chave.",
    primaryKeyword: "visão geral do domínio",
    secondaryKeywords: [
      "ferramenta de análise de domínio",
      "ferramenta de análise de palavras-chave de concorrentes",
      "verificador de tráfego de site",
    ],
    imageAlt: "Visão geral do domínio no RE9 SEO",
    imageSrc:
      "https://imagedelivery.net/ysLOa6bzFaM49Jxok-TAlw/189e22b8-fdf8-46b4-198c-e912beef2300/public",
    workflows: [
      {
        title: "Analise um domínio",
        description:
          "Comece por um domínio e veja o tráfego orgânico estimado, a quantidade de palavras-chave orgânicas, as principais palavras-chave ranqueadas e as principais páginas orgânicas.",
      },
      {
        title: "Encontre as palavras-chave dos concorrentes",
        description:
          "Veja as palavras-chave em que um concorrente já ranqueia e identifique temas que valem ser construídos ou defendidos.",
      },
      {
        title: "Avance para uma pesquisa mais profunda",
        description:
          "Use os dados do domínio para abrir a pesquisa de palavras-chave, a análise de backlinks ou o monitoramento de posições sem começar do zero.",
      },
    ],
    metrics: [
      { label: "Tráfego orgânico", value: "Visibilidade" },
      { label: "Palavras-chave orgânicas", value: "Temas" },
      { label: "Principais palavras-chave", value: "Posições" },
      { label: "Principais páginas", value: "Alcance orgânico" },
    ],
    showMetrics: true,
    useCases: [
      "Pesquise um concorrente antes de escrever um plano de conteúdo.",
      "Estime a presença orgânica de um site.",
      "Encontre lacunas de palavras-chave entre o seu site e os domínios que já ranqueiam.",
    ],
    differentiators: [
      "A pesquisa de domínios se conecta direto aos fluxos de palavras-chave, backlinks e monitoramento de posições.",
      "Focada em palavras-chave ranqueadas, tráfego estimado e principais páginas para uma pesquisa de concorrentes prática.",
      "Open source e com opção de hospedagem própria para equipes que querem controlar sua stack de SEO.",
    ],
    featuredLink: {
      title: "Verificador de tráfego de sites gratuito",
      description:
        "Estime o tráfego orgânico, as palavras-chave e as principais páginas de qualquer domínio. Sem cadastro.",
      href: "/website-traffic-checker",
    },
    related: [
      {
        label: "Análise de concorrentes",
        href: "/docs/skills/competitor-analysis",
      },
      {
        label: "Pesquisa de palavras-chave",
        href: "/features/keyword-research",
      },
      { label: "Backlinks", href: "/features/backlink-checker" },
    ],
    faqs: [
      {
        question: "O que é a visão geral do domínio?",
        answer:
          "É um retrato da presença de um site na busca orgânica: tráfego orgânico estimado, em quantas palavras-chave ele ranqueia, suas principais palavras-chave e suas principais páginas orgânicas. Costuma ser o primeiro passo da pesquisa de concorrentes, porque mostra de onde vem a visibilidade do site.",
      },
      {
        question: "Como isso se compara ao Domain Overview do Semrush?",
        answer:
          "O RE9 SEO cobre o essencial do mesmo relatório (tráfego estimado, palavras-chave orgânicas, principais palavras-chave e principais páginas). Ele é open source, então você pode hospedá-lo por conta própria ou usar o app gerenciado.",
      },
      {
        question:
          "O RE9 SEO ajuda na análise de palavras-chave dos concorrentes?",
        answer:
          "Sim. Informe o domínio de um concorrente e veja as palavras-chave em que ele ranqueia e suas principais páginas orgânicas: a matéria-prima para encontrar temas que valem ser construídos ou defendidos.",
      },
      {
        question:
          "A visão geral do domínio é o mesmo que um verificador de tráfego?",
        answer:
          "Não exatamente. Ela inclui uma métrica de tráfego estimado, mas o valor está em ver quais palavras-chave e páginas geram esse tráfego, algo que um verificador de tráfego simples não mostra.",
      },
    ],
    guides: {
      title: "Biblioteca de estratégias de análise competitiva",
      description:
        "Estratégias práticas para transformar uma visão geral do domínio em uma decisão. Cada guia traz um passo a passo completo e um prompt MCP pronto para copiar.",
      items: [
        {
          label: "Descubra quem são seus concorrentes de verdade",
          description:
            "Compare um conjunto de palavras-chave e veja os domínios que de fato aparecem nas suas SERPs.",
          href: "/library/competitive-analysis/find-your-real-competitors",
        },
        {
          label:
            "Análise de lacunas de palavras-chave: tire os termos de marca primeiro",
          description:
            "Remova a marca dos dois lados e a lacuna vira algo que dá para construir.",
          href: "/library/competitive-analysis/keyword-gap-analysis",
        },
        {
          label:
            "Quão precisas são as estimativas de tráfego dos concorrentes?",
          description:
            "Variações próximas somadas, outras linhas de negócio e como corrigir as duas coisas.",
          href: "/library/competitive-analysis/competitor-traffic-estimates",
        },
        {
          label: "Leia o perfil de links de um concorrente antes de copiá-lo",
          description:
            "Domínios de referência, spam score e os links quebrados que valem a pena buscar.",
          href: "/library/competitive-analysis/backlink-gap-analysis",
        },
      ],
      cta: {
        label: "Ver todas as estratégias de análise competitiva",
        href: "/library/competitive-analysis",
      },
    },
  },
  rankTracking: {
    slug: FEATURE_PAGE_SLUGS.rankTracking,
    eyebrow: "Monitoramento de posições",
    navDescription: "Acompanhe as posições das palavras-chave.",
    title: "Monitoramento de posições das suas palavras-chave",
    description:
      "Acompanhe as palavras-chave que importam, compare, se quiser, os resultados em Desktop e Mobile e mantenha as mudanças de posição conectadas ao seu fluxo de pesquisa.",
    primaryKeyword: "monitoramento de posições",
    secondaryKeywords: [
      "ferramenta de monitoramento de posições seo",
      "monitoramento de posições de palavras-chave",
      "monitoramento de posições no google",
    ],
    imageAlt: "Tabela de monitoramento de posições do RE9 SEO",
    imageSrc:
      "https://imagedelivery.net/ysLOa6bzFaM49Jxok-TAlw/4a0f8508-1527-46a8-c91c-086456f21c00/public",
    workflows: [
      {
        title: "Adicione domínios monitorados",
        description:
          "Crie configurações de monitoramento de posições para os domínios e localizações que importam para você.",
      },
      {
        title: "Monitore as palavras-chave importantes",
        description:
          "Adicione palavras-chave manualmente ou a partir de sugestões de ranqueamento e acompanhe as posições ao longo do tempo.",
      },
      {
        title: "Compare o contexto da SERP",
        description:
          "Revise os resultados por dispositivo configurado, as URLs que ranqueiam, as variações de posição e os sinais de recursos da SERP disponíveis.",
      },
    ],
    metrics: [
      { label: "Posição no Desktop", value: "Quando ativado" },
      { label: "Posição no Mobile", value: "Quando ativado" },
      { label: "Recursos da SERP", value: "Contexto" },
      { label: "Variação de posição", value: "Movimento" },
    ],
    showMetrics: true,
    useCases: [
      "Monitore as palavras-chave-alvo depois de publicar conteúdo.",
      "Acompanhe o impacto de lançamentos, migrações e otimizações.",
      "Mantenha a verificação de posições perto das palavras-chave que sua equipe já pesquisou.",
    ],
    differentiators: [
      "O monitoramento de posições fica no mesmo espaço de trabalho da descoberta, da auditoria e da pesquisa de concorrentes.",
      "O monitoramento opcional em Desktop e Mobile evita relatórios de posição unidimensionais.",
      "O RE9 SEO pode expor os dados de posição para agentes de IA via MCP.",
    ],
    featuredLink: {
      title: "Localizador gratuito de palavras-chave de concorrentes",
      description:
        "Descubra as palavras-chave em que um concorrente ranqueia antes de escolher o que monitorar. Sem cadastro.",
      href: "/competitor-keyword-finder",
    },
    related: [
      {
        label: "Agrupamento de palavras-chave",
        href: "/docs/skills/keyword-clustering",
      },
      {
        label: "Análise de concorrentes",
        href: "/docs/skills/competitor-analysis",
      },
      {
        label: "Pesquisa de palavras-chave",
        href: "/features/keyword-research",
      },
    ],
    faqs: [
      {
        question: "O que é monitoramento de posições?",
        answer:
          "É o acompanhamento de onde um domínio aparece para palavras-chave selecionadas ao longo do tempo, para você ver se o trabalho de SEO está melhorando a visibilidade.",
      },
      {
        question: "O RE9 SEO monitora posições no Mobile e no Desktop?",
        answer:
          "Sim: Mobile, Desktop ou os dois. Cada domínio monitorado é configurado com os dispositivos que você quiser, e ativar os dois permite compará-los lado a lado.",
      },
      {
        question: "Como escolher as palavras-chave para monitorar?",
        answer:
          "Comece pelas palavras-chave ligadas a páginas importantes, ao trabalho de conteúdo em andamento e às oportunidades de concorrentes encontradas na pesquisa de palavras-chave.",
      },
    ],
    guides: {
      title: "Biblioteca de estratégias de monitoramento de posições",
      description:
        "Estratégias práticas para monitorar o que importa e reportar de um jeito que seja lido. Cada guia traz um passo a passo completo e um prompt MCP pronto para copiar.",
      items: [
        {
          label: "Quais palavras-chave monitorar, e quantas",
          description:
            "De vinte a cinquenta termos do Search Console, com o custo avaliado antes de entrarem.",
          href: "/library/rank-tracking/which-keywords-to-track",
        },
        {
          label: "O Search Console serve para monitorar posições?",
          description:
            "O que a posição média gratuita esconde e quando ela é suficiente.",
          href: "/library/rank-tracking/search-console-vs-rank-tracker",
        },
        {
          label: "Monitoramento de posições local",
          description:
            "Por que um negócio local precisa de uma grade antes de um monitoramento.",
          href: "/library/rank-tracking/local-rank-tracking",
        },
        {
          label: "O relatório de posições que o seu CEO vai ler",
          description:
            "Comece pelo número do negócio e use as posições para explicá-lo.",
          href: "/library/rank-tracking/keyword-ranking-report",
        },
      ],
      cta: {
        label: "Ver todas as estratégias de monitoramento de posições",
        href: "/library/rank-tracking",
      },
    },
  },
  savedKeywords: {
    slug: FEATURE_PAGE_SLUGS.savedKeywords,
    eyebrow: "Palavras-chave salvas",
    navDescription: "Organize suas oportunidades de SEO.",
    title: "Palavras-chave salvas para transformar pesquisa de SEO em plano",
    description:
      "Mantenha as ideias de palavras-chave úteis organizadas para orientar o planejamento de conteúdo, as decisões de monitoramento de posições e os fluxos com agentes de IA.",
    primaryKeyword: "palavras-chave salvas",
    secondaryKeywords: [
      "lista de palavras-chave seo",
      "ferramenta de lista de palavras-chave",
      "planejamento de palavras-chave",
    ],
    imageAlt: "Lista de palavras-chave salvas no RE9 SEO",
    imageSrc:
      "https://imagedelivery.net/ysLOa6bzFaM49Jxok-TAlw/8938a529-b443-4d4f-9869-c972f3cef900/public",
    workflows: [
      {
        title: "Salve as palavras-chave promissoras",
        description:
          "Reúna as ideias úteis da pesquisa de palavras-chave em vez de perdê-las a cada busca.",
      },
      {
        title: "Organize por tema",
        description:
          "Marque as palavras-chave com tags por página, campanha, cluster de conteúdo ou prioridade para o planejamento continuar legível.",
      },
      {
        title: "Reaproveite as palavras-chave salvas em outros fluxos",
        description:
          "Use as palavras-chave salvas e as tags como referência para o monitoramento de posições, o planejamento de conteúdo ou a pesquisa via MCP.",
      },
    ],
    metrics: [
      { label: "Ideias salvas", value: "Pipeline" },
      { label: "Tags", value: "Organização" },
      { label: "Volume", value: "Demanda" },
      { label: "Dificuldade", value: "Prioridade" },
    ],
    useCases: [
      "Separe ideias de palavras-chave em grupos por tema ou página usando tags.",
      "Prepare palavras-chave candidatas para o monitoramento de posições.",
      "Mantenha a pesquisa humana e a dos agentes de IA no mesmo espaço de trabalho.",
    ],
    differentiators: [
      "As palavras-chave salvas ligam pesquisa, monitoramento e fluxos com IA.",
      "As palavras-chave salvas mantêm as métricas disponíveis, como volume, CPC, dificuldade, intenção e tags.",
      "O fluxo é simples o bastante para sessões de planejamento recorrentes.",
    ],
    related: [
      {
        label: "Pesquisa de palavras-chave",
        href: "/features/keyword-research",
      },
      { label: "Monitoramento de posições", href: "/features/rank-tracking" },
      { label: "MCP do RE9 SEO", href: "/features/mcp" },
    ],
    faqs: [
      {
        question: "Por que salvar palavras-chave em uma ferramenta de SEO?",
        answer:
          "As palavras-chave salvas mantêm a pesquisa organizada para a equipe voltar às ideias que valem ser escritas, otimizadas ou monitoradas.",
      },
      {
        question:
          "As palavras-chave salvas podem ser usadas no monitoramento de posições?",
        answer:
          "Sim. Elas são a fonte natural para decidir quais termos devem ser acompanhados ao longo do tempo.",
      },
      {
        question:
          "Como as palavras-chave salvas entram no planejamento de SEO?",
        answer:
          "A pesquisa alimenta a lista, as tags agrupam os termos por páginas e campanhas, e a lista final alimenta o monitoramento de posições. As palavras-chave salvas são a ponte entre encontrar uma oportunidade e agir sobre ela.",
      },
    ],
  },
  aiBrandVisibility: {
    slug: FEATURE_PAGE_SLUGS.aiBrandVisibility,
    eyebrow: "Visibilidade em IA",
    navDescription: "Consulte menções da marca na busca com IA.",
    title:
      "Consulta de marca para visibilidade no ChatGPT e no Google AI Overview",
    description:
      "Consulte uma marca ou domínio e veja as menções no ChatGPT e no Google AI Overview, as páginas citadas e os prompts relacionados.",
    primaryKeyword: "ferramenta de visibilidade em ia",
    secondaryKeywords: [
      "visibilidade da marca na busca com ia",
      "visibilidade na busca com ia",
      "otimização para mecanismos de resposta",
    ],
    imageAlt: "Relatório de visibilidade da marca em IA no RE9 SEO",
    imageSrc:
      "https://imagedelivery.net/ysLOa6bzFaM49Jxok-TAlw/cde3e4f8-079f-4890-cb17-371087107400/public",
    workflows: [
      {
        title: "Consulte uma marca",
        description:
          "Busque uma marca ou domínio e veja como o ChatGPT e o Google AI Overview a mencionam ou citam nos resultados disponíveis.",
      },
      {
        title: "Revise citações e plataformas",
        description:
          "Veja as URLs, os domínios e as plataformas que contribuem para as menções da marca.",
      },
      {
        title: "Encontre lacunas de visibilidade",
        description:
          "Use as páginas citadas e os prompts relacionados como pistas para investigar lacunas de conteúdo, de reputação ou de comparativos.",
      },
    ],
    metrics: [
      { label: "Menções", value: "Presença" },
      { label: "Citações", value: "Fontes" },
      { label: "Plataformas", value: "Superfícies" },
      { label: "Domínios citados", value: "Origens" },
    ],
    useCases: [
      "Veja se os dados do ChatGPT e do Google AI Overview mencionam ou citam sua marca ou domínio.",
      "Encontre as páginas e os domínios citados junto com as menções da marca.",
      "Use as fontes citadas e os prompts para planejar testes de conteúdo voltados à visibilidade em mecanismos de resposta.",
    ],
    differentiators: [
      "A visibilidade em IA fica ao lado da pesquisa de SEO clássica, sem substituí-la.",
      "O fluxo foca em fontes e menções concretas, não em promessas vagas sobre IA.",
      "O RE9 SEO ajuda equipes a ligar a pesquisa de menções e citações em IA a um planejamento de SEO concreto.",
    ],
    related: [
      {
        label: "Prompts de busca com IA",
        href: "/features/ai-search-prompts",
      },
      { label: "Visão geral do domínio", href: "/features/domain-overview" },
      { label: "MCP do RE9 SEO", href: "/features/mcp" },
    ],
    faqs: [
      {
        question: "O que é visibilidade da marca em IA?",
        answer:
          "É a frequência com que sua marca ou domínio aparece nos dados disponíveis de menções e citações do ChatGPT e do Google AI Overview.",
      },
      {
        question:
          "Qual a diferença entre visibilidade em IA e SEO tradicional?",
        answer:
          "O SEO tradicional foca em posições e páginas. O fluxo de visibilidade em IA do RE9 SEO olha para menções, páginas citadas, prompts relacionados e métricas por plataforma das fontes de busca com IA suportadas.",
      },
      {
        question:
          "A visibilidade em IA deve substituir a pesquisa de palavras-chave?",
        answer:
          "Não. Ela deve ficar ao lado dos dados de palavras-chave, domínios, backlinks e auditoria para a equipe entender tanto as posições na busca quanto a presença nas respostas.",
      },
    ],
  },
  aiSearchPrompts: {
    slug: FEATURE_PAGE_SLUGS.aiSearchPrompts,
    eyebrow: "Explorador de prompts",
    navDescription: "Compare respostas entre os modelos suportados.",
    title:
      "Explorador de prompts de busca com IA para pesquisa de visibilidade",
    description:
      "Rode o mesmo prompt em vários modelos de IA suportados, compare as respostas e revise as citações quando elas forem retornadas.",
    primaryKeyword: "visibilidade na busca com ia",
    secondaryKeywords: [
      "visibilidade na busca do chatgpt",
      "prompts de busca com ia",
      "ferramenta de otimização para mecanismos de resposta",
    ],
    imageAlt: "Explorador de prompts do RE9 SEO",
    imageSrc:
      "https://imagedelivery.net/ysLOa6bzFaM49Jxok-TAlw/9f3d38f2-aa97-417c-ca74-ae378654d700/public",
    workflows: [
      {
        title: "Teste prompts da sua categoria",
        description:
          "Compare as respostas às perguntas que seus clientes podem fazer às ferramentas de IA.",
      },
      {
        title: "Analise respostas baseadas na web",
        description:
          "Com a busca na web ativada, veja as páginas e os domínios citados nas respostas dos modelos.",
      },
      {
        title: "Verifique menções da marca",
        description:
          "Destaque uma marca e veja se cada modelo a menciona na resposta ou nas fontes citadas.",
      },
    ],
    metrics: [
      { label: "Prompts", value: "Perguntas" },
      { label: "Contexto da web", value: "Fontes" },
      { label: "País da busca na web", value: "Contexto regional" },
      { label: "Menções da marca", value: "Presença" },
    ],
    useCases: [
      "Compare como os modelos de IA suportados respondem ao mesmo prompt.",
      "Veja quais páginas e domínios aparecem nas fontes citadas.",
      "Verifique se uma marca aparece nas respostas e citações das IAs.",
    ],
    differentiators: [
      "A pesquisa de prompts fica no mesmo espaço de trabalho dos fluxos de domínio, palavras-chave e visibilidade da marca.",
      "O RE9 SEO trata a busca com IA como uma camada de pesquisa, não como substituta dos fundamentos de SEO.",
      "O MCP do RE9 SEO expõe ferramentas de palavras-chave, SERP, domínio, backlinks, palavras-chave salvas e monitoramento de posições para agentes de IA.",
    ],
    related: [
      {
        label: "Visibilidade da marca em IA",
        href: "/features/ai-brand-visibility",
      },
      {
        label: "Pesquisa de palavras-chave",
        href: "/features/keyword-research",
      },
      { label: "MCP do RE9 SEO", href: "/features/mcp" },
    ],
    faqs: [
      {
        question: "O que é um explorador de prompts de busca com IA?",
        answer:
          "É uma ferramenta que permite rodar o mesmo prompt em vários modelos de IA suportados, comparar as respostas e analisar as URLs citadas que vêm junto com as respostas dos modelos compatíveis.",
      },
      {
        question: "Por que a pesquisa de prompts importa para o SEO?",
        answer:
          "Os prompts são as novas buscas: mostram as perguntas de comparação, de problema e de compra que seus clientes agora fazem às ferramentas de IA. As fontes citadas mostram em quais páginas e domínios essas respostas se apoiam, para você ver onde falta cobertura.",
      },
      {
        question: "Isso ajuda na otimização para mecanismos de resposta?",
        answer:
          "Sim. O explorador de prompts é um ponto de partida para relacionar as respostas e as citações retornadas às páginas de origem e a possíveis ações de SEO.",
      },
    ],
  },
} satisfies Record<string, FeaturePage>;

export const featureGroups = [
  {
    label: "Fluxos de palavras-chave",
    description:
      "Encontre, organize e monitore as palavras-chave que importam.",
    pages: [
      featurePages.keywordResearch,
      featurePages.savedKeywords,
      featurePages.rankTracking,
    ],
  },
  {
    label: "Pesquisa de domínios",
    description: "Entenda concorrentes, backlinks e saúde técnica.",
    pages: [
      featurePages.domainOverview,
      featurePages.backlinks,
      featurePages.siteAudit,
    ],
  },
  {
    label: "Visibilidade em IA",
    description:
      "Pesquise prompts de busca com IA, citações e visibilidade da marca.",
    pages: [featurePages.aiBrandVisibility, featurePages.aiSearchPrompts],
  },
] as const;
