import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router";

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 transition-transform group-open:rotate-180"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Brand() {
  return (
    <a
      aria-label="Heyo"
      className="ml-2 flex items-center gap-2 text-xl font-semibold tracking-tight lg:ml-0"
      href="/"
    >
      <img alt="" className="h-7 w-auto dark:invert" src="/logo.svg" />
    </a>
  );
}

const navigationLink =
  "flex w-full rounded-full px-3 text-sm leading-7 text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary lg:px-4";

function NavigationLink({
  activePath,
  children,
  end,
  onNavigate,
  to,
}: {
  activePath?: string;
  children: ReactNode;
  end?: boolean;
  onNavigate?: () => void;
  to: string;
}) {
  const { pathname } = useLocation();

  return (
    <NavLink
      className={({ isActive }) => {
        const active =
          isActive ||
          (activePath !== undefined &&
            (pathname === activePath || pathname.startsWith(`${activePath}/`)));
        return `${navigationLink}${active ? " text-primary" : ""}`;
      }}
      end={end}
      onClick={onNavigate}
      to={to}
    >
      {children}
    </NavLink>
  );
}

export function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Primary navigation" className="mt-4">
      <ul className="space-y-1">
        <li>
          <NavigationLink end onNavigate={onNavigate} to="/">
            Readme
          </NavigationLink>
        </li>
        <li>
          <details className="group" open>
            <summary
              className={`${navigationLink} cursor-pointer list-none items-center justify-between`}
            >
              Products <Chevron />
            </summary>
            <ul className="mt-1 ml-3 border-l border-border pl-3">
              <li>
                <NavigationLink
                  activePath="/heyo-docs"
                  onNavigate={onNavigate}
                  to="/heyo-docs/introduction"
                >
                  heyo-docs
                </NavigationLink>
              </li>
              <li>
                <NavigationLink onNavigate={onNavigate} to="/heyo-code-audit/introduction">
                  heyo-code-audit
                </NavigationLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
}
