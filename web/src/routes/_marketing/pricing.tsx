import { createFileRoute } from "@tanstack/react-router";
import { buildPageSeo } from "@/lib/seo";

const CONTACT_EMAIL = "trafego@re9.online";
const SIGNUP_URL = "https://seo.agenciare9.com.br/sign-up";

export const Route = createFileRoute("/_marketing/pricing")({
  head: () =>
    buildPageSeo({
      title: "Planos e contato",
      description:
        "Os planos do RE9 SEO são personalizados. Fale com a gente pelo e-mail trafego@re9.online ou crie sua conta.",
      path: "/pricing",
      titleSuffix: "RE9 SEO",
    }),
  component: Pricing,
});

function Pricing() {
  return (
    <article className="mx-auto max-w-3xl">
      <header>
        <p className="text-sm font-medium text-[var(--color-brand-accent)]">
          Contato
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
          Planos e contato
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-brand-muted)]">
          Os planos do RE9 SEO são personalizados para o tamanho e as
          necessidades do seu negócio. Fale com a gente pelo e-mail{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-neutral-950 underline decoration-[var(--color-brand-accent)] underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          e montamos a melhor opção para você.
        </p>
      </header>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href={SIGNUP_URL}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-neutral-950 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Criar conta
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-[var(--color-border-subtle)] bg-white px-5 text-sm font-medium text-neutral-950 transition-colors hover:border-neutral-950"
        >
          Enviar e-mail
        </a>
      </div>
    </article>
  );
}
