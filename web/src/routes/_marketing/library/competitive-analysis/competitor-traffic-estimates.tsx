import { createFileRoute } from "@tanstack/react-router";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Content, {
  frontmatter,
} from "../../../../../content/marketing/library/competitor-traffic-estimates.mdx";
import { LibrarySpokePage } from "@/components/library-page";
import { buildPageSeo } from "@/lib/seo";
import { COMPETITIVE_ANALYSIS_LIBRARY } from "@/lib/strategy-libraries";

const PATH = "/library/competitive-analysis/competitor-traffic-estimates";

export const Route = createFileRoute(
  "/_marketing/library/competitive-analysis/competitor-traffic-estimates",
)({
  head: () =>
    buildPageSeo({
      title: "Quão precisas são as estimativas de tráfego dos concorrentes?",
      description: frontmatter.description,
      path: PATH,
      titleSuffix: "Biblioteca RE9 SEO",
      ogType: "article",
    }),
  component: () => (
    <LibrarySpokePage
      title={frontmatter.title}
      description={frontmatter.description}
      crumb="Quão precisas são as estimativas de tráfego dos concorrentes?"
      path={PATH}
      library={COMPETITIVE_ANALYSIS_LIBRARY}
    >
      <Content components={{ ...defaultMdxComponents }} />
    </LibrarySpokePage>
  ),
});
