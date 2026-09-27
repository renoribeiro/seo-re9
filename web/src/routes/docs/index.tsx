import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { ContentIndex } from "@/components/content-index";
import { baseOptions } from "@/lib/layout.shared";
import { getDocsPageTree, getDocsPosts } from "@/lib/content.functions";
import { buildPageSeo } from "@/lib/seo";

const docsDescription =
  "Documentação de configuração e referência do RE9 SEO: MCP, clientes de IA e fluxos de trabalho.";

export const Route = createFileRoute("/docs/")({
  head: () =>
    buildPageSeo({
      title: "Documentação do RE9 SEO",
      description: docsDescription,
      path: "/docs",
    }),
  component: DocsIndex,
  loader: async () => ({
    pages: await getDocsPosts(),
    pageTree: await getDocsPageTree(),
  }),
});

function DocsIndex() {
  const { pages, pageTree } = Route.useLoaderData();

  return (
    <DocsLayout tree={pageTree} {...baseOptions()}>
      <ContentIndex
        eyebrow="Documentação"
        title="Documentação do RE9 SEO"
        description={docsDescription}
        emptyLabel="Ainda não há documentação. Volte em breve."
        items={pages}
        route="/docs/$"
      />
    </DocsLayout>
  );
}
