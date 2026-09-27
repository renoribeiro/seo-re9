import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/positioning-to-demand.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";

const PATH = "/library/keyword-research/positioning-to-demand";

const faqs = [
  {
    question: "Devo inventar um nome para a minha categoria?",
    answer:
      "Só se houver um plano para a falta de demanda. Um termo inventado não tem nenhuma busca no primeiro dia e talvez nunca tenha, então tudo o que um desconhecido precisa encontrar tem que ser encontrável pelo vocabulário que já existe. Guarde o termo inventado para a apresentação, quando você já tem a atenção da pessoa.",
  },
  {
    question: "E se a minha palavra-chave não tiver volume de busca?",
    answer:
      "Trate isso como um sinal sobre o mercado, não como uma limitação da ferramenta. Volume zero para um termo de categoria geralmente significa que as pessoas descrevem o problema de outro jeito, e os termos relacionados que têm volume vão mostrar como. Volume baixo é diferente de zero e pode valer a pena quando a intenção é forte.",
  },
  {
    question: "Como descobrir as palavras que meus clientes usam?",
    answer:
      "Ligações de vendas, tickets de suporte e entrevistas gravadas, que são a mesma fonte das boas palavras-chave semente. As pessoas descrevem problemas com uma linguagem que nenhuma base de palavras-chave cria, porque a base só conhece o que já foi digitado vezes suficientes para ser registrado.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const Route = createFileRoute(
  "/_marketing/library/keyword-research/positioning-to-demand",
)({
  head: () =>
    buildPageSeo({
      title: "O seu posicionamento tem demanda de busca por trás?",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <>
      <LibrarySpokePage
        title={frontmatter.title}
        description={frontmatter.description}
        crumb="Ligue o posicionamento à demanda real"
        path={PATH}
      >
        <Content components={{ ...defaultMdxComponents }} />
      </LibrarySpokePage>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  ),
});
