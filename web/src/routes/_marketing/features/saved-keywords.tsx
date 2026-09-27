import { createFileRoute } from "@tanstack/react-router";
import { FeaturePageTemplate } from "@/components/feature-page";
import { featurePages } from "@/lib/feature-pages";
import { buildPageSeo } from "@/lib/seo";

const page = featurePages.savedKeywords;

export const Route = createFileRoute("/_marketing/features/saved-keywords")({
  head: () =>
    buildPageSeo({
      title: "Listas de palavras-chave salvas",
      description: page.description,
      path: "/features/saved-keywords",
      titleSuffix: "RE9 SEO",
      imageAlt: page.imageAlt,
    }),
  component: () => <FeaturePageTemplate page={page} />,
});
