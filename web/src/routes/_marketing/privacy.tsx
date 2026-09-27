import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalPageInProgress } from "@/components/legal-page";
import { buildPageSeo } from "@/lib/seo";

const title = "Política de Privacidade — em elaboração";

export const Route = createFileRoute("/_marketing/privacy")({
  head: () =>
    buildPageSeo({
      title,
      description:
        "Estamos preparando a Política de Privacidade do RE9 SEO. Em caso de dúvidas, fale com trafego@re9.online.",
      path: "/privacy",
      titleSuffix: "RE9 SEO",
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage title={title}>
      <LegalPageInProgress />
    </LegalPage>
  );
}
