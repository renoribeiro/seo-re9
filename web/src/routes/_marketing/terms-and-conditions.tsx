import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalPageInProgress } from "@/components/legal-page";
import { buildPageSeo } from "@/lib/seo";

const title = "Termos de Uso — em elaboração";

export const Route = createFileRoute("/_marketing/terms-and-conditions")({
  head: () =>
    buildPageSeo({
      title,
      description:
        "Estamos preparando os Termos de Uso do RE9 SEO. Em caso de dúvidas, fale com trafego@re9.online.",
      path: "/terms-and-conditions",
      titleSuffix: "RE9 SEO",
    }),
  component: TermsAndConditions,
});

function TermsAndConditions() {
  return (
    <LegalPage title={title}>
      <LegalPageInProgress />
    </LegalPage>
  );
}
