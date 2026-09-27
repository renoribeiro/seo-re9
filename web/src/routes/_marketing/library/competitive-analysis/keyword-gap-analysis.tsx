import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/keyword-gap-analysis.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { COMPETITIVE_ANALYSIS_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/competitive-analysis/keyword-gap-analysis";

export const Route = createFileRoute(
  "/_marketing/library/competitive-analysis/keyword-gap-analysis",
)({
  head: () =>
    buildPageSeo({
      title:
        "Análise de lacunas de palavras-chave: como fazer uma que funcione",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Análise de lacunas de palavras-chave: tire os termos de marca primeiro"
      path={PATH}
      library={COMPETITIVE_ANALYSIS_LIBRARY}
    >
      <Content components={{ ...defaultMdxComponents }} />
    </LibrarySpokePage>
  ),
});
