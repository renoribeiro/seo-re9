import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { BacklinksErrorState } from "./BacklinksPageStates";

describe("BacklinksErrorState", () => {
  it("renders a visible retry state", () => {
    const markup = renderToStaticMarkup(
      createElement(BacklinksErrorState, {
        errorMessage: "Não foi possível carregar os dados de backlinks.",
        onRetry: vi.fn(),
      }),
    );

    expect(markup).toContain("Não foi possível carregar os backlinks");
    expect(markup).toContain(
      "Não foi possível carregar os dados de backlinks.",
    );
    expect(markup).toContain("Tentar novamente");
  });
});
