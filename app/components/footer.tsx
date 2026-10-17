const footerGroups = [
  {
    heading: "Product",
    links: [
      ["heyo-docs", "/heyo-docs/introduction"],
      ["heyo-code-audit", "/heyo-code-audit/introduction"],
      ["heyo-status", "/heyo-status/introduction"],
      ["heyo-ui", "/heyo-ui/introduction"],
    ],
  },
  {
    heading: "Resources",
    links: [
      ["Readme", "/"],
      ["Github", "https://github.com/heyo-sh"],
    ],
  },
] as const;

const navigationLink =
  "flex w-fit max-w-full rounded-full px-3 text-xs leading-7 text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground";

export function Footer() {
  return (
    <footer className="px-6 pt-12 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-10 sm:pt-16 sm:pb-8 lg:px-16">
      <div className="grid grid-cols-1 gap-y-8 min-[26rem]:grid-cols-2 min-[26rem]:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
        {footerGroups.map((group) => (
          <section className="min-w-0" key={group.heading}>
            <h2 className="px-3 text-xs text-primary">{group.heading}</h2>
            <ul className="mt-1">
              {group.links.map(([label, href]) => (
                <li key={label}>
                  <a className={navigationLink} href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-16 text-xs text-muted-foreground">
        © 2026 heyo <span aria-hidden="true">·</span> MIT Licensed
      </p>
    </footer>
  );
}
