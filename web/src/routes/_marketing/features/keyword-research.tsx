import { createFileRoute } from "@tanstack/react-router";
import { FeaturePageTemplate } from "@/components/feature-page";
import { featurePages } from "@/lib/feature-pages";
import { buildPageSeo } from "@/lib/seo";

const page = featurePages.keywordResearch;

export const Route = createFileRoute("/_marketing/features/keyword-research")({
  head: () =>
    buildPageSeo({
      title: "Ferramenta de pesquisa de palavras-chave",
      description: page.description,
      path: "/features/keyword-research",
      titleSuffix: "RE9 SEO",
      imageAlt: page.imageAlt,
    }),
  component: () => <FeaturePageTemplate page={page} />,
});
