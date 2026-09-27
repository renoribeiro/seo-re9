import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ApiKeySettings } from "@/client/features/settings/ApiKeySettings";
import { type ThemePreference, useThemePreference } from "@/client/lib/theme";
import { authClient, useSession } from "@/lib/auth-client";
import { isHostedClientAuthMode } from "@/lib/auth-mode";
import { version } from "../../../../package.json";

export const Route = createFileRoute("/_app/settings/")({
  component: PersonalSettings,
});

const THEME_OPTIONS: {
  value: ThemePreference;
  label: string;
  icon: typeof Sun;
}[] = [
  { value: "system", label: "Sistema", icon: Monitor },
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Escuro", icon: Moon },
];

function PersonalSettings() {
  const isHosted = isHostedClientAuthMode();
  const { themePreference, setThemePreference } = useThemePreference();
  const { data: session, isPending: isSessionPending } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const analyticsEnabled = session?.user?.analyticsOptedOut !== true;

  async function updateAnalyticsPreference(enabled: boolean) {
    setIsSaving(true);
    try {
      const result = await authClient.updateUser({
        analyticsOptedOut: !enabled,
      });
      if (result.error) {
        toast.error(
          "Não foi possível atualizar sua preferência de análise de uso.",
        );
      } else {
        toast.success(
          enabled ? "Análise de uso ativada" : "Análise de uso desativada",
        );
      }
    } catch {
      toast.error(
        "Não foi possível atualizar sua preferência de análise de uso.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-base-content/50">Aparência</h2>
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm">Tema</span>
          <div
            role="radiogroup"
            aria-label="Preferência de tema"
            className="flex gap-0.5 rounded-lg bg-base-200 p-0.5"
          >
            {THEME_OPTIONS.map((option) => {
              const isActive = option.value === themePreference;
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  aria-label={option.label}
                  className={`flex cursor-pointer items-center justify-center rounded-md px-3 py-1.5 transition-colors ${
                    isActive
                      ? "bg-base-100 text-base-content shadow-sm"
                      : "text-base-content/50 hover:text-base-content/80"
                  }`}
                  onClick={() => setThemePreference(option.value)}
                >
                  <Icon className="size-4" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {isHosted ? (
        <>
          <ApiKeySettings />

          <section className="space-y-3">
            <h2 className="text-sm font-medium text-base-content/50">
              Análise de uso
            </h2>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm">Ajude a melhorar o RE9 SEO</p>
                <p className="mt-1 text-sm text-base-content/60">
                  Compartilhe dados de análise e de uso.
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={analyticsEnabled}
                disabled={isSessionPending || isSaving || !session?.user}
                onChange={(event) => {
                  void updateAnalyticsPreference(event.currentTarget.checked);
                }}
                aria-label="Ativar análise de uso do produto"
              />
            </div>
          </section>
        </>
      ) : (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-base-content/50">Sobre</h2>
          <div className="flex items-center justify-between gap-6">
            <span className="text-sm">Versão</span>
            <span className="font-mono text-sm text-base-content/60">
              v{version}
            </span>
          </div>
        </section>
      )}
    </div>
  );
}
