import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import * as React from "react";
import appCss from "@/styles/app.css?url";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import type { Translations } from "fumadocs-ui/i18n";

// Textos da interface do fumadocs (docs, índice, paginação, 404) em pt-BR.
const ptBrTranslations: Partial<Translations> = {
  "Ask AI(AI chat button)": "Perguntar à IA",
  "Back to Home(404 page)": "Voltar para o início",
  "Choose a language(language switcher)": "Escolha um idioma",
  "Choose a language(language switcher)(aria-label)": "Escolha um idioma",
  "Close Banner(banner)(aria-label)": "Fechar aviso",
  "Close Search(search dialog)(aria-label)": "Fechar busca",
  "Close Sidebar(aria-label)": "Fechar barra lateral",
  "Close Sidebar(sidebar)(aria-label)": "Fechar barra lateral",
  "Collapse Sidebar(sidebar)(aria-label)": "Recolher barra lateral",
  "Copied Text(code block)(aria-label)": "Texto copiado",
  "Copy Anchor Link(heading anchor)(aria-label)": "Copiar link da seção",
  "Copy Link(accordion)(aria-label)": "Copiar link",
  "Copy Markdown(page actions)": "Copiar Markdown",
  "Copy Text(code block)(aria-label)": "Copiar texto",
  "Dark(theme switcher)(aria-label)": "Escuro",
  "Default(type table)": "Padrão",
  "Edit on GitHub(edit page)": "Editar no GitHub",
  "Hide Sidebar(sidebar)": "Ocultar barra lateral",
  "Last updated on(page footer)": "Última atualização em",
  "Layout Tab(layout tab trigger)": "Aba de layout",
  "Light(theme switcher)(aria-label)": "Claro",
  "Next Page(pagination)": "Próxima página",
  "No Headings(table of contents)": "Sem títulos",
  "No results found(search dialog)": "Nenhum resultado encontrado",
  "On this page(table of contents)": "Nesta página",
  "Open Search(search trigger)(aria-label)": "Abrir busca",
  "Open Sidebar(sidebar)(aria-label)": "Abrir barra lateral",
  "Open in ChatGPT(page actions)": "Abrir no ChatGPT",
  "Open in Claude(page actions)": "Abrir no Claude",
  "Open in Cursor(page actions)": "Abrir no Cursor",
  "Open in GitHub(page actions)": "Abrir no GitHub",
  "Open in Scira AI(page actions)": "Abrir no Scira AI",
  "Open(page actions)": "Abrir",
  "Page Not Found(404 page)": "Página não encontrada",
  "Parameters(type table)": "Parâmetros",
  "Previous Page(pagination)": "Página anterior",
  "Prop(type table)": "Propriedade",
  "Read {url}, I want to ask questions about it.(page actions)":
    "Leia {url}, quero fazer perguntas sobre esta página.",
  "Returns(type table)": "Retorno",
  "Search(search dialog)": "Buscar",
  "Search(search trigger)": "Buscar",
  "Show Sidebar(sidebar)": "Mostrar barra lateral",
  "System(theme switcher)(aria-label)": "Sistema",
  "Table of Contents(inline table of contents)": "Índice",
  "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)":
    "A página que você procura pode ter sido removida, mudado de nome ou estar temporariamente indisponível.",
  "Toggle Menu(mobile menu)(aria-label)": "Abrir ou fechar menu",
  "Toggle Theme(theme switcher)(aria-label)": "Alternar tema",
  "Type(type table)": "Tipo",
  "View as Markdown(page actions)": "Ver como Markdown",
};

const i18n = {
  locale: "pt-BR",
  translations: ptBrTranslations,
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function loadAnalytics(){if(window.__openSeoAnalyticsLoaded)return;window.__openSeoAnalyticsLoaded=true;window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)};plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init({endpoint:'/api/event'});var script=document.createElement('script');script.defer=true;script.src='/js/script.js';document.head.appendChild(script)}function schedule(){if('requestIdleCallback'in window){window.requestIdleCallback(loadAnalytics,{timeout:2000});return}window.setTimeout(loadAnalytics,2000)}if(document.readyState==='complete'){schedule();return}window.addEventListener('load',schedule,{once:true})})();",
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-fd-background text-fd-foreground">
        <RootProvider search={{ enabled: false }} i18n={i18n}>
          {children}
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
