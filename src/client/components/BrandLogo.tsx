// Both variants are rendered; app.css shows the one matching the active
// data-theme so the logo follows the theme without a React re-render.
export function BrandLogo({ className = "h-7" }: { className?: string }) {
  return (
    <>
      <img
        src="/logo-re9.png"
        alt="RE9 Online"
        className={`brand-logo-light w-auto ${className}`}
      />
      <img
        src="/logo-re9-clara.png"
        alt="RE9 Online"
        className={`brand-logo-dark w-auto ${className}`}
      />
    </>
  );
}

export function BrandWordmark({ logoClassName }: { logoClassName?: string }) {
  return (
    <span className="flex items-center gap-2">
      <BrandLogo className={logoClassName} />
      <span className="font-semibold text-base-content">SEO</span>
    </span>
  );
}
