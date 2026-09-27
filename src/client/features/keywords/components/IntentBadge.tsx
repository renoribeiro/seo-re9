import { createPortal } from "react-dom";
import type { KeywordIntent } from "@/types/keywords";
import { FloatingTooltip, useFloatingTooltip } from "./FloatingTooltip";

const COLORS: Record<KeywordIntent, string> = {
  informational: "border-info/30 bg-info/15 text-info",
  commercial: "border-warning/35 bg-warning/20 text-warning",
  transactional: "border-success/30 bg-success/15 text-success",
  navigational: "border-primary/30 bg-primary/15 text-primary",
  unknown: "border-base-300 bg-base-200 text-base-content/60",
};

const SHORT_LABELS: Record<KeywordIntent, string> = {
  informational: "Info",
  commercial: "Com",
  transactional: "Trans",
  navigational: "Nav",
  unknown: "?",
};

/** Full intent labels, shared with the keyword filters so both stay in sync. */
export const INTENT_LABELS: Record<KeywordIntent, string> = {
  informational: "Informacional",
  commercial: "Comercial",
  transactional: "Transacional",
  navigational: "Navegacional",
  unknown: "Desconhecida",
};

const DESCRIPTIONS: Record<
  KeywordIntent,
  { label: string; description: string }
> = {
  informational: {
    label: INTENT_LABELS.informational,
    description:
      "Quem busca quer informações ou respostas. Use para conteúdo educativo, guias e explicações com pouca comparação.",
  },
  commercial: {
    label: INTENT_LABELS.commercial,
    description:
      "Quem busca está pesquisando opções antes de comprar. Trate como intenção de compra para comparativos, alternativas e páginas de produto.",
  },
  transactional: {
    label: INTENT_LABELS.transactional,
    description:
      "Quem busca está pronto para concluir uma ação, geralmente uma compra. Priorize ofertas claras, preços, testes grátis ou caminhos de conversão.",
  },
  navigational: {
    label: INTENT_LABELS.navigational,
    description:
      "Quem busca procura um site, marca ou página específica. Essas buscas costumam favorecer quem corresponde ao destino esperado.",
  },
  unknown: {
    label: INTENT_LABELS.unknown,
    description:
      "A intenção não está disponível para esta palavra-chave. Evite decidir a estratégia de conteúdo só com base neste selo.",
  },
};

export function IntentBadge({ intent }: { intent: KeywordIntent }) {
  const tooltip = useFloatingTooltip<HTMLSpanElement>({ delayMs: 0 });
  const details = DESCRIPTIONS[intent];

  return (
    <span
      ref={tooltip.triggerRef}
      className={`inline-flex h-6 min-w-11 cursor-help items-center justify-center rounded-full border px-2 text-xs font-semibold leading-none ${COLORS[intent]}`}
      tabIndex={0}
      aria-label={`Intenção de busca: ${details.label}`}
      aria-describedby={tooltip.isOpen ? tooltip.tooltipId : undefined}
      onMouseEnter={tooltip.open}
      onMouseLeave={tooltip.close}
      onFocus={tooltip.open}
      onBlur={tooltip.close}
      onKeyDown={(e) => {
        if (e.key === "Escape") tooltip.close();
      }}
    >
      {SHORT_LABELS[intent]}
      {tooltip.isOpen && typeof document !== "undefined"
        ? createPortal(
            <FloatingTooltip id={tooltip.tooltipId} position={tooltip.position}>
              <span className="block font-semibold">{details.label}</span>
              <span className="mt-1 block">{details.description}</span>
            </FloatingTooltip>,
            document.body,
          )
        : null}
    </span>
  );
}
