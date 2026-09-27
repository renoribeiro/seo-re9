import { BrandLogo } from "@/components/brand-logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <BrandLogo />,
    },
    searchToggle: {
      enabled: false,
    },
    links: [
      {
        text: "Materiais",
        url: "/library",
        items: [
          {
            text: "Biblioteca de estratégias",
            description: "Estratégias práticas de SEO organizadas por tema.",
            url: "/library",
          },
          {
            text: "MCP",
            description: "Conecte o RE9 SEO a clientes de IA.",
            url: "/docs/mcp",
          },
          {
            text: "Skills",
            description: "Fluxos de trabalho prontos do RE9 SEO.",
            url: "/docs/skills",
          },
        ],
      },
      {
        text: "GitHub",
        url: "https://github.com/renoribeiro/seo-re9",
        external: true,
      },
    ],
  };
}
