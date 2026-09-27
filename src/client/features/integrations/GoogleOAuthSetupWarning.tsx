import { AlertTriangle } from "lucide-react";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";

export function GoogleOAuthSetupWarning({
  integrationName,
  docsUrl,
}: {
  integrationName: string;
  docsUrl: string;
}) {
  return (
    <div className="alert alert-warning items-start text-sm">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-1">
        <p className="font-medium">Cliente OAuth do Google não configurado</p>
        <p className="text-base-content/70">
          Adicione o client ID e o secret do Google a esta instalação do RE9 SEO
          antes de conectar o {integrationName}.
        </p>
        <SafeExternalLink
          url={docsUrl}
          label="Abrir guia de configuração"
          className="inline-flex items-center gap-1 font-medium underline underline-offset-2"
        />
      </div>
    </div>
  );
}
