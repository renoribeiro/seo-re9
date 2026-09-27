/**
 * Registry of site-audit issue types.
 *
 * Shared between the server (issue engine, MCP tools) and the client
 * (issues UI, CSV export). Each issue row in `audit_issues` references one
 * of these types by id.
 */

export type IssueSeverity = "critical" | "warning" | "info";

interface AuditIssueDescriptor {
  severity: IssueSeverity;
  title: string;
  explanation: string;
  howToFix: string;
}

export const AUDIT_ISSUE_TYPES = {
  "blocked-page": {
    severity: "critical",
    title: "O rastreador foi bloqueado",
    explanation:
      "O site devolveu um desafio contra bots ou uma negação de acesso (por exemplo, um desafio do Cloudflare ou um 403) em vez da página. Informamos isso com transparência em vez de fingir que a página está quebrada — mas significa que esta página não pôde ser auditada, e outros rastreadores, como os de buscadores, podem enfrentar a mesma barreira.",
    howToFix:
      'Se o site é seu, libere o user agent "OpenSEO-Audit" nas configurações de WAF/proteção contra bots (no Cloudflare: uma regra personalizada de WAF que ignora a proteção contra bots quando o user agent contém "OpenSEO-Audit"; em alguns planos gratuitos pode ser preciso relaxar a proteção contra bots). Depois, rode a auditoria novamente.',
  },
  "rate-limited-page": {
    severity: "warning",
    title: "Limite de requisições atingido (429)",
    explanation:
      "O servidor respondeu 429 Too Many Requests, então esta página não pôde ser auditada. O rastreador espera antes de tentar de novo quando o tempo de espera do site cabe no limite de tempo da auditoria.",
    howToFix:
      'Aumente o limite de requisições para rastreadores ou libere o user agent "OpenSEO-Audit" nas suas regras de limitação (no Cloudflare: uma exceção na regra de rate limiting para esse user agent). Depois, rode a auditoria novamente. Rodar com menos páginas também ajuda se o limite for rígido.',
  },
  "crawl-rate-limited": {
    severity: "warning",
    title: "Rastreamento interrompido: limite de requisições",
    explanation:
      "O site pediu ao rastreador para esperar mais do que o limite de tempo da auditoria permite. Paramos de solicitar páginas. Este relatório está incompleto; as URLs que não buscamos não são registradas como quebradas nem como limitadas.",
    howToFix:
      "Rode a auditoria novamente depois que o limite de requisições do site for reiniciado ou peça ao responsável pelo site para liberar o rastreador OpenSEO-Audit.",
  },
  "server-error": {
    severity: "critical",
    title: "Erro de servidor (5xx)",
    explanation:
      "A página retornou um erro de servidor 5xx. Buscadores que encontram erros de servidor com frequência passam a rastrear menos o site e podem tirar a página do índice.",
    howToFix:
      "Confira os logs do servidor para esta URL e corrija a causa do erro. Se a página não existe mais, retorne 404/410 ou redirecione para uma página relevante em vez de exibir erro.",
  },
  "broken-internal-link": {
    severity: "critical",
    title: "Link interno quebrado",
    explanation:
      "Esta página aponta para uma URL interna que retorna status de erro (4xx/5xx). Links quebrados desperdiçam orçamento de rastreamento, perdem autoridade de link e frustram os usuários — estão entre os problemas de SEO técnico mais comuns e mais prejudiciais.",
    howToFix:
      "Atualize o link para a URL correta e ativa ou remova-o. Se o destino mudou de lugar, prefira apontar direto para a nova URL em vez de depender de um redirecionamento.",
  },
  "missing-title": {
    severity: "critical",
    title: "Tag title ausente",
    explanation:
      "A página não tem <title>. O título é o sinal de relevância mais forte da página e o texto principal exibido nos resultados de busca; sem ele, os buscadores criam um por conta própria, geralmente ruim.",
    howToFix:
      "Adicione um <title> único e descritivo, com cerca de 50 a 60 caracteres, que inclua o assunto principal da página.",
  },
  "broken-page": {
    severity: "warning",
    title: "Página retorna erro (4xx)",
    explanation:
      "Esta URL rastreada retornou um erro de cliente (por exemplo, 404). Se ela aparece no sitemap ou em outras páginas, os rastreadores continuam desperdiçando requisições com ela.",
    howToFix:
      "Se a página deveria existir, restaure-a. Se ela foi removida de propósito, tire-a do sitemap e dos links internos e considere um redirecionamento 301 para a página ativa mais próxima.",
  },
  "duplicate-title": {
    severity: "warning",
    title: "Título duplicado",
    explanation:
      "Várias páginas usam a mesma tag title. Os buscadores usam os títulos para diferenciar páginas; duplicatas fazem as páginas competirem entre si e reduzem a taxa de cliques.",
    howToFix:
      "Escreva um título único para cada página, descrevendo o conteúdo específico dela. Em páginas geradas por modelo, inclua no modelo o atributo que as diferencia (nome, categoria, localização).",
  },
  "duplicate-meta-description": {
    severity: "warning",
    title: "Meta description duplicada",
    explanation:
      "Várias páginas usam a mesma meta description, então os resultados de busca mostram trechos idênticos e as pessoas não conseguem distinguir as páginas.",
    howToFix:
      "Escreva uma meta description única para cada página ou remova a duplicada — os buscadores vão gerar um trecho a partir do conteúdo da página, o que é melhor do que uma duplicata errada.",
  },
  "duplicate-content": {
    severity: "warning",
    title: "Conteúdo de página duplicado",
    explanation:
      "Duas ou mais URLs exibem exatamente o mesmo texto visível. Os buscadores escolhem uma versão para indexar e ignoram as demais, e os sinais de ranqueamento se dividem entre as duplicatas.",
    howToFix:
      "Consolide as duplicatas: escolha a URL canônica, adicione rel=canonical nas outras e faça redirecionamento 301 das URLs duplicadas quando possível (causas comuns: variações com barra no final, parâmetros de URL, variações http/https ou com www).",
  },
  "missing-meta-description": {
    severity: "warning",
    title: "Meta description ausente",
    explanation:
      "A página não tem meta description. Os buscadores vão montar um trecho a partir do texto da página, que costuma ser menos atraente e prejudica a taxa de cliques.",
    howToFix:
      "Adicione uma meta description com cerca de 70 a 160 caracteres que resuma a página e dê um motivo para clicar.",
  },
  "missing-h1": {
    severity: "warning",
    title: "Título H1 ausente",
    explanation:
      "A página não tem H1. O H1 diz às pessoas e aos buscadores do que a página trata; páginas sem ele costumam ter um assunto menos claro.",
    howToFix:
      "Adicione um único H1 que declare o assunto principal da página, coerente com a tag title.",
  },
  "multiple-h1": {
    severity: "warning",
    title: "Vários títulos H1",
    explanation:
      "A página tem mais de um H1, o que dilui o sinal do assunto principal e geralmente indica um erro no modelo (por exemplo, um logo e um título marcados como H1).",
    howToFix:
      "Mantenha um H1 para o título principal da página e rebaixe os outros para H2/H3 (ou para elementos sem estilo de título, no caso de itens como logos).",
  },
  "redirect-chain": {
    severity: "warning",
    title: "Cadeia de redirecionamentos",
    explanation:
      "Chegar à página final exige dois ou mais redirecionamentos seguidos. Cada salto adiciona latência, perde autoridade de link e consome orçamento de rastreamento; cadeias longas podem nem ser seguidas.",
    howToFix:
      "Aponte a primeira URL (e os links internos) direto para o destino final, para que haja no máximo um redirecionamento.",
  },
  "redirect-loop": {
    severity: "warning",
    title: "Loop de redirecionamento",
    explanation:
      "Este redirecionamento acaba apontando de volta para si mesmo, então a URL nunca carrega. Navegadores e rastreadores desistem com um erro.",
    howToFix:
      "Revise as regras de redirecionamento desta URL e quebre o ciclo para que a cadeia termine em uma página real com status 200.",
  },
  "canonical-conflict": {
    severity: "warning",
    title: "Sinais de canonical conflitantes",
    explanation:
      "A página declara URLs canônicas diferentes no HTML (<link rel=canonical>) e no cabeçalho HTTP Link. Quando os sinais se contradizem, os buscadores ignoram ambos e escolhem a canônica por conta própria.",
    howToFix:
      "Escolha uma URL canônica e declare-a em um único lugar (o head do HTML é o mais comum); remova ou alinhe a outra declaração.",
  },
  "thin-content": {
    severity: "warning",
    title: "Conteúdo raso",
    explanation:
      "A página tem muito pouco texto visível. Páginas rasas raramente ranqueiam, podem prejudicar a avaliação de qualidade do site inteiro e (se o site renderiza no navegador) podem indicar conteúdo invisível para rastreadores que leem só HTML.",
    howToFix:
      "Amplie a página com conteúdo realmente útil, aplique noindex ou incorpore-a a uma página mais forte. Se o conteúdo existe mas é renderizado por JavaScript, garanta que ele seja renderizado no servidor ou pré-renderizado.",
  },
  "images-missing-alt": {
    severity: "warning",
    title: "Imagens sem texto alternativo (alt)",
    explanation:
      "Uma ou mais imagens da página não têm atributo alt. O texto alternativo é um requisito de acessibilidade e a principal forma de os buscadores entenderem imagens.",
    howToFix:
      'Adicione texto alternativo descritivo às imagens relevantes; use alt vazio (alt="") só nas puramente decorativas.',
  },
  "orphan-page": {
    severity: "warning",
    title: "Página órfã",
    explanation:
      "Nenhuma página rastreada aponta para esta URL — ela só foi encontrada pelo sitemap. Páginas sem links internos recebem pouca atenção dos rastreadores e nenhuma autoridade de link interna, e as pessoas não conseguem encontrá-las navegando.",
    howToFix:
      "Adicione links para esta página a partir de páginas relevantes (navegação, conteúdo relacionado, páginas centrais) ou remova-a do sitemap se ela não deve ser indexada.",
  },
  "no-outgoing-links": {
    severity: "warning",
    title: "Página sem links de saída",
    explanation:
      "A página não tem nenhum link — é um beco sem saída. A autoridade de link que chega até ela para ali, os rastreadores não têm para onde seguir e as pessoas precisam usar o botão voltar.",
    howToFix:
      "Adicione links para páginas relacionadas, para a categoria principal ou para a página inicial. Se a navegação da página é renderizada por JavaScript, garanta que ela também exista no HTML renderizado pelo servidor.",
  },
  "title-too-long": {
    severity: "info",
    title: "Título longo demais",
    explanation:
      "O título passa de ~60 caracteres, então os resultados de busca vão cortá-lo e o final pode sumir no meio da frase.",
    howToFix:
      "Encurte o título para cerca de 50 a 60 caracteres, colocando as palavras mais importantes no início.",
  },
  "title-too-short": {
    severity: "info",
    title: "Título curto demais",
    explanation:
      "O título tem menos de ~10 caracteres, o que geralmente é genérico demais para descrever a página ou atrair cliques.",
    howToFix:
      "Transforme o título em uma frase descritiva (cerca de 30 a 60 caracteres) que diga o que a página oferece.",
  },
  "meta-description-too-long": {
    severity: "info",
    title: "Meta description longa demais",
    explanation:
      "A meta description passa de ~160 caracteres, então os buscadores vão cortar o trecho.",
    howToFix:
      "Reduza a descrição para cerca de 70 a 160 caracteres, mantendo a mensagem principal e a chamada para ação.",
  },
  "meta-description-too-short": {
    severity: "info",
    title: "Meta description curta demais",
    explanation:
      "A meta description tem menos de ~70 caracteres. Descrições curtas desperdiçam o espaço de trecho que os resultados de busca oferecem, e os buscadores muitas vezes as ignoram e usam texto tirado da página.",
    howToFix:
      "Amplie a descrição para cerca de 70 a 160 caracteres que resumam a página e deem um motivo para clicar.",
  },
  "heading-order-skip": {
    severity: "info",
    title: "Níveis de título pulados",
    explanation:
      "A hierarquia de títulos pula níveis (por exemplo, um H4 logo depois de um H2). Isso enfraquece a estrutura do documento para ferramentas de acessibilidade e para a leitura do conteúdo.",
    howToFix:
      "Ajuste os níveis de título para que desçam um nível por vez (H1 → H2 → H3), sem pular.",
  },
  "slow-response": {
    severity: "info",
    title: "Resposta lenta do servidor",
    explanation:
      "A resposta HTML levou mais de 1,5 segundo. Um tempo até o primeiro byte lento piora todas as métricas de desempenho seguintes e reduz a taxa de rastreamento em sites grandes.",
    howToFix:
      "Investigue o tempo de servidor/banco de dados e o cache desta rota; servir HTML em cache ou gerado estaticamente costuma resolver.",
  },
  "noindex-page": {
    severity: "info",
    title: "Página com noindex",
    explanation:
      "A página pede aos buscadores que não a indexem (pela meta tag robots ou pelo cabeçalho X-Robots-Tag). Muitas vezes isso é intencional — é um aviso, não um erro.",
    howToFix:
      "Se esta página deve ranquear, remova a diretiva noindex. Se for intencional (páginas de administração, de agradecimento ou de filtros), nada precisa ser feito.",
  },
  "canonicalized-page": {
    severity: "info",
    title: "Canônica aponta para outra URL",
    explanation:
      "A página declara outra URL como canônica, dizendo aos buscadores para indexar aquela URL no lugar dela. Tudo bem se for intencional (páginas com parâmetros, conteúdo sindicado) — é um problema se esta página deveria ranquear.",
    howToFix:
      "Se esta página deve ranquear por conta própria, defina a canônica dela como ela mesma. Caso contrário, nada precisa ser feito.",
  },
  "deep-page": {
    severity: "info",
    title: "Página muito profunda na estrutura do site",
    explanation:
      "A página está a 5 ou mais cliques da página inicial. Páginas profundas são rastreadas com menos frequência e recebem menos autoridade de link.",
    howToFix:
      "Adicione links a partir de páginas de nível mais alto (páginas centrais, de categoria, navegação) para encurtar o caminho até esta página.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;

export type AuditIssueType = keyof typeof AUDIT_ISSUE_TYPES;

export const ISSUE_SEVERITY_ORDER: Record<IssueSeverity, number> = {
  critical: 0,
  warning: 1,
  info: 2,
};

const issueRegistry: Record<string, AuditIssueDescriptor> = AUDIT_ISSUE_TYPES;

export function getIssueDescriptor(
  issueType: string,
): AuditIssueDescriptor | null {
  return issueRegistry[issueType] ?? null;
}
