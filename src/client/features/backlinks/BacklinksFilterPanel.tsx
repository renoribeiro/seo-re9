import { DomainFilterPanel } from "@/client/features/domain/components/DomainFilterPanel";
import type { BacklinksTab } from "@/types/schemas/backlinks";
import {
  BACKLINKS_FILTER_FIELDS,
  REFERRING_DOMAINS_FILTER_FIELDS,
  TOP_PAGES_FILTER_FIELDS,
  countFilterConditions,
  type BacklinksTabFilterValues,
} from "./backlinksFilterTypes";
import type { BacklinksFiltersState } from "./useBacklinksFilters";

/**
 * Filters are applied explicitly (not per keystroke) because every change
 * triggers a billed DataForSEO request. Each include/exclude term and each
 * set field costs one DataForSEO filter condition, capped per request —
 * DomainFilterPanel surfaces the count and gates Apply.
 */
export function BacklinksFilterPanel({
  activeTab,
  filters,
  onApplied,
  maxConditions,
}: {
  activeTab: BacklinksTab;
  filters: BacklinksFiltersState;
  onApplied: () => void;
  /** Scope filters can consume part of the DataForSEO condition budget. */
  maxConditions?: number;
}) {
  if (activeTab === "backlinks") {
    const state = filters.backlinks;
    return (
      <DomainFilterPanel
        key="backlinks"
        debugName="BacklinksFilterPanel"
        appliedFilters={state.values}
        fields={BACKLINKS_FILTER_FIELDS}
        activeFilterCount={state.activeFilterCount}
        countConditions={countFilterConditions}
        maxConditions={maxConditions}
        textFields={[
          {
            key: "include",
            label: "URL de origem contém",
            placeholder: "example.com, blog",
          },
          {
            key: "exclude",
            label: "URL de origem não contém",
            placeholder: "spam, fórum",
          },
        ]}
        rangeFields={[
          {
            title: "Autoridade do domínio",
            minKey: "minDomainRank",
            maxKey: "maxDomainRank",
          },
          {
            title: "Autoridade do link",
            minKey: "minLinkAuthority",
            maxKey: "maxLinkAuthority",
          },
          {
            title: "Pontuação de spam",
            minKey: "minSpamScore",
            maxKey: "maxSpamScore",
            step: "0.1",
          },
        ]}
        onApply={(values) => {
          state.apply(values);
          onApplied();
        }}
        onClear={() => {
          state.reset();
          onApplied();
        }}
        renderExtra={(draft, setValue) => (
          <BacklinksToggleControls draft={draft} setValue={setValue} />
        )}
      />
    );
  }

  if (activeTab === "domains") {
    const state = filters.domains;
    return (
      <DomainFilterPanel
        key="domains"
        debugName="ReferringDomainsFilterPanel"
        appliedFilters={state.values}
        fields={REFERRING_DOMAINS_FILTER_FIELDS}
        activeFilterCount={state.activeFilterCount}
        countConditions={countFilterConditions}
        maxConditions={maxConditions}
        textFields={[
          {
            key: "include",
            label: "Domínio contém",
            placeholder: "example.com, blog",
          },
          {
            key: "exclude",
            label: "Domínio não contém",
            placeholder: "spam, fórum",
          },
        ]}
        rangeFields={[
          {
            title: "Backlinks",
            minKey: "minBacklinks",
            maxKey: "maxBacklinks",
          },
          { title: "Autoridade", minKey: "minRank", maxKey: "maxRank" },
          {
            title: "Pontuação de spam",
            minKey: "minSpamScore",
            maxKey: "maxSpamScore",
            step: "0.1",
          },
        ]}
        onApply={(values) => {
          state.apply(values);
          onApplied();
        }}
        onClear={() => {
          state.reset();
          onApplied();
        }}
      />
    );
  }

  const state = filters.pages;
  return (
    <DomainFilterPanel
      key="pages"
      debugName="TopPagesFilterPanel"
      appliedFilters={state.values}
      fields={TOP_PAGES_FILTER_FIELDS}
      activeFilterCount={state.activeFilterCount}
      countConditions={countFilterConditions}
      maxConditions={maxConditions}
      textFields={[
        {
          key: "include",
          label: "URL da página contém",
          placeholder: "/blog, /products",
        },
        {
          key: "exclude",
          label: "URL da página não contém",
          placeholder: "/tag, /author",
        },
      ]}
      rangeFields={[
        { title: "Backlinks", minKey: "minBacklinks", maxKey: "maxBacklinks" },
        {
          title: "Domínios de referência",
          minKey: "minReferringDomains",
          maxKey: "maxReferringDomains",
        },
        { title: "Autoridade", minKey: "minRank", maxKey: "maxRank" },
      ]}
      onApply={(values) => {
        state.apply(values);
        onApplied();
      }}
      onClear={() => {
        state.reset();
        onApplied();
      }}
    />
  );
}

function BacklinksToggleControls({
  draft,
  setValue,
}: {
  draft: BacklinksTabFilterValues;
  setValue: (key: keyof BacklinksTabFilterValues, value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-base-content/60">
          Tipo de link
        </p>
        <div className="flex items-center gap-1">
          {(["", "dofollow", "nofollow"] as const).map((value) => (
            <button
              key={value || "all"}
              type="button"
              className={`btn btn-xs ${draft.linkType === value ? "btn-soft" : "btn-ghost"}`}
              onClick={() => setValue("linkType", value)}
            >
              {value === ""
                ? "Todos"
                : value === "dofollow"
                  ? "Dofollow"
                  : "Nofollow"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-base-content/60">
          Visibilidade
        </p>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-xs"
              checked={draft.hideLost === "true"}
              onChange={(event) =>
                setValue("hideLost", event.target.checked ? "true" : "")
              }
            />
            <span className="text-xs">Ocultar perdidos</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-xs"
              checked={draft.hideBroken === "true"}
              onChange={(event) =>
                setValue("hideBroken", event.target.checked ? "true" : "")
              }
            />
            <span className="text-xs">Ocultar quebrados</span>
          </label>
        </div>
      </div>
    </div>
  );
}
