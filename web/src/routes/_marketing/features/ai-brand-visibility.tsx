import { createFileRoute } from "@tanstack/react-router";
import { FeaturePageTemplate } from "@/components/feature-page";
import { featurePages } from "@/lib/feature-pages";
import { buildPageSeo } from "@/lib/seo";

const page = featurePages.aiBrandVisibility;

export const Route = createFileRoute(
  "/_marketing/features/ai-brand-visibility",
)({
  head: () =>
    buildPageSeo({
      title: "Ferramenta de visibilidade da marca em IA",
      description: page.description,
      path: "/features/ai-brand-visibility",
      titleSuffix: "RE9 SEO",
      imageAlt: page.imageAlt,
    }),
  component: () => <FeaturePageTemplate page={page} />,
});
