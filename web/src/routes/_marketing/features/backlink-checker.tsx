import { createFileRoute } from "@tanstack/react-router";
import { FeaturePageTemplate } from "@/components/feature-page";
import { featurePages } from "@/lib/feature-pages";
import { buildPageSeo } from "@/lib/seo";

const page = featurePages.backlinks;

export const Route = createFileRoute("/_marketing/features/backlink-checker")({
  head: () =>
    buildPageSeo({
      title: "Verificador de backlinks",
      description: page.description,
      path: "/features/backlink-checker",
      titleSuffix: "RE9 SEO",
      imageAlt: page.imageAlt,
    }),
  component: () => <FeaturePageTemplate page={page} />,
});
