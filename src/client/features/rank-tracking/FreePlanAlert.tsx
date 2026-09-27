import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { SUBSCRIBE_ROUTE } from "@/shared/billing";

export function FreePlanAlert({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="alert alert-warning text-sm py-2">
      <AlertTriangle className="size-4" />
      <span>
        Só começamos a monitorar as posições das palavras-chave depois que você{" "}
        <Link
          to={SUBSCRIBE_ROUTE}
          search={{ upgrade: true }}
          className="link font-medium"
        >
          fizer upgrade para o plano pago
        </Link>
        .
      </span>
    </div>
  );
}
