import { BrandLogo } from "@/components/brand-logo";
import { Link } from "@tanstack/react-router";
import { featureGroups } from "@/lib/feature-pages";
import { freeToolList } from "@/lib/free-tools/tool-pages";

const GITHUB_URL = "https://github.com/renoribeiro/seo-re9";
// Crédito ao projeto original, recomendado pela licença MIT do OpenSEO.
const UPSTREAM_URL = "https://github.com/every-app/open-seo";

const featureLinks = featureGroups.flatMap((group) =>
  group.pages.map((page) => ({
    label: page.eyebrow,
    href: `/features/${page.slug}`,
  })),
);

export function SiteFooter({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Link to="/" className="text-sm text-neutral-900" aria-label="RE9 SEO">
        <BrandLogo />
      </Link>

      <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]">
        <div>
          <p className="font-semibold text-neutral-900">Funcionalidades</p>
          <div className="mt-2 flex flex-col gap-1.5">
            {featureLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <Link to="/features">Todas as funcionalidades</Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral-900">Agentes de IA</p>
          <div className="mt-2 flex flex-col gap-1.5">
            <Link to="/features/mcp">RE9 SEO MCP</Link>
            <Link to="/google-search-console-mcp">
              Google Search Console MCP
            </Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral-900">Materiais</p>
          <div className="mt-2 flex flex-col gap-1.5">
            <a href="/docs/mcp">MCP</a>
            <a href="/docs/skills">Skills</a>
            <Link to="/library">Biblioteca de estratégias</Link>
            <Link to="/open-source-seo">Por que código aberto?</Link>
            <a href="/docs">Documentação</a>
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral-900">
            Ferramentas gratuitas
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {freeToolList.map((tool) => (
              <a key={tool.slug} href={tool.path}>
                {tool.name}
              </a>
            ))}
            <Link to="/google-search-console-mcp">
              Google Search Console MCP
            </Link>
            <Link to="/tools">Todas as ferramentas gratuitas</Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral-900">Empresa</p>
          <div className="mt-2 flex flex-col gap-1.5">
            <Link to="/why-openseo">Por que o RE9 SEO</Link>
            <Link to="/support">Suporte</Link>
            <Link to="/roadmap">Roadmap</Link>
            <Link to="/pricing">Contato</Link>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <Link to="/privacy">Privacidade</Link>
            <Link to="/terms-and-conditions">Termos de uso</Link>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-neutral-500">
        Baseado no{" "}
        <a href={UPSTREAM_URL} target="_blank" rel="noopener noreferrer">
          OpenSEO
        </a>{" "}
        (licença MIT).
      </p>
    </div>
  );
}
