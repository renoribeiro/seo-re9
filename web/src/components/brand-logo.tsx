// Both variants are rendered; app.css shows the one that contrasts with the
// active theme (docs pages can switch to dark via fumadocs' `.dark` class).
export function BrandLogo({ className = "h-6" }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <img
        src="/logo-re9.png"
        alt="RE9 Online"
        className={`re9-logo-light w-auto ${className}`}
      />
      <img
        src="/logo-re9-clara.png"
        alt="RE9 Online"
        className={`re9-logo-dark w-auto ${className}`}
      />
      <span className="font-semibold">SEO</span>
    </span>
  );
}
