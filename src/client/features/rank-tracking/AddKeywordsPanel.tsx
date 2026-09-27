import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { addTrackingKeywords } from "@/serverFunctions/rank-tracking";
import { MAX_TRACKED_KEYWORD_LENGTH } from "@/shared/rank-tracking";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { Loader2 } from "lucide-react";

export function AddKeywordsPanel({
  configId,
  projectId,
  onSuccess,
  onCancel,
}: {
  configId: string;
  projectId: string;
  onSuccess: (result: { added: number; checkTriggered: boolean }) => void;
  onCancel: () => void;
}) {
  const [keywordInput, setKeywordInput] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const mutation = useMutation({
    mutationFn: (kws: string[]) =>
      addTrackingKeywords({
        data: { projectId, configId, keywords: kws, matchCase },
      }),
    onSuccess: (result) => {
      setKeywordInput("");
      onSuccess(result);
    },
    onError: (error) => {
      toast.error(
        getStandardErrorMessage(
          error,
          "Não foi possível adicionar as palavras-chave",
        ),
      );
    },
  });
  const isPending = mutation.isPending;
  return (
    <div className="flex gap-2 items-end">
      <div className="flex flex-col gap-1 flex-1">
        <textarea
          className="textarea textarea-bordered textarea-sm w-full"
          rows={3}
          placeholder="Digite as palavras-chave, uma por linha"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
        />
        <label
          className="flex items-center gap-2 text-xs cursor-pointer w-fit"
          title="Monitora estas palavras-chave exatamente como digitadas, sem converter para minúsculas. O Google pode retornar resultados diferentes para um nome de marca com maiúsculas."
        >
          <input
            type="checkbox"
            className="checkbox checkbox-xs [--radius-selector:0.25rem]"
            checked={matchCase}
            onChange={(e) => setMatchCase(e.target.checked)}
          />
          Diferenciar maiúsculas
        </label>
      </div>
      <div className="flex flex-col gap-1">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            const lines = keywordInput
              .split("\n")
              .map((l) => l.trim())
              .filter(Boolean);
            if (lines.some((l) => l.length > MAX_TRACKED_KEYWORD_LENGTH)) {
              toast.error(
                `As palavras-chave devem ter no máximo ${MAX_TRACKED_KEYWORD_LENGTH} caracteres.`,
              );
              return;
            }
            if (lines.length > 0) mutation.mutate(lines);
          }}
          disabled={isPending || !keywordInput.trim()}
        >
          {isPending && <Loader2 className="size-3 animate-spin" />}
          Adicionar
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
