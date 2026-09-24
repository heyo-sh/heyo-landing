function Arrow() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
      <path
        d="M2.5 8h10M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

const footerGroups = [
  {
    heading: "Product",
    links: [
      ["heyo-docs", "/heyo-docs/introduction"],
      ["heyo-code-audit", "/heyo-code-audit/introduction"],
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
  "flex rounded-full px-3 text-xs leading-7 text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground";

export function Footer() {
  return (
    <footer className="px-6 pt-16 pb-8 sm:px-10 lg:px-16">
      <div className="grid grid-cols-4 gap-x-8 gap-y-10">
        {footerGroups.map((group) => (
          <section
            className="col-span-1 mt-2.5"
            key={group.heading}
          >
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
        © 2026 heyo <span aria-hidden="true">·</span> Always open source
      </p>
    </footer>
  );
}
