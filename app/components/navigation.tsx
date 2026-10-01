import {
  type RemixiconComponentType,
  RiArrowRightSLine,
  RiBookOpenLine,
  RiCodeBoxLine,
  RiCpuLine,
  RiGitRepositoryLine,
  RiGlobalLine,
} from "@remixicon/react";
import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router";

/**
 * The home page wears the same chrome as the documentation sites it links to,
 * so moving between them never moves the furniture. These are the Heyo theme's
 * sidebar measurements — a 32px row, a 10px gutter, a translucent tint for
 * hover and current page — minus the hairlines: the landing deliberately has
 * no seams between its regions.
 */
const row =
  "group/row flex min-h-8 w-full min-w-0 items-center gap-2 rounded-lg px-2.5 text-left text-sm transition-[background-color,color] duration-100 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring";

const subRow =
  "group/row flex min-h-7 w-full min-w-0 items-center gap-2 rounded-md px-2.5 text-left text-sm transition-[background-color,color] duration-100 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring";

const idleRow =
  "text-foreground/80 hover:bg-foreground/[0.055] hover:text-foreground";

const idleSubRow =
  "text-muted-foreground hover:bg-foreground/[0.055] hover:text-foreground";

const activeRow = "bg-foreground/[0.06] font-medium text-foreground";

/**
 * The rail that ties a section's pages back to its heading. It starts under the
 * heading's icon, so the tree reads as one line rather than as indentation you
 * have to measure.
 */
const rail =
  "relative mt-px ml-[1.3125rem] pl-2.5 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-border";

export function Brand() {
  return (
    <a aria-label="Heyo" className="flex items-center gap-2" href="/">
      {/*
        A fixed height rather than the theme's `max-h-6`: the mark is drawn at
        100% × 100% with only a viewBox, so it has no intrinsic size to cap —
        and as a flex item with nothing to measure it collapses to nothing.
        24px is what `max-h-6` resolves to there, so the two still line up.
      */}
      <img alt="" className="h-6 w-auto shrink-0 dark:invert" src="/logo.svg" />
    </a>
  );
}

function NavigationLink({
  activePath,
  children,
  end,
  icon: Icon,
  nested,
  onNavigate,
  to,
}: {
  activePath?: string;
  children: ReactNode;
  end?: boolean;
  icon: RemixiconComponentType;
  nested?: boolean;
  onNavigate?: () => void;
  to: string;
}) {
  const { pathname } = useLocation();

  return (
    <li className="min-w-0">
      <NavLink
        className={({ isActive }) => {
          const active =
            isActive ||
            (activePath !== undefined &&
              (pathname === activePath ||
                pathname.startsWith(`${activePath}/`)));
          return [
            nested ? subRow : row,
            active ? activeRow : nested ? idleSubRow : idleRow,
          ].join(" ");
        }}
        end={end}
        onClick={onNavigate}
        to={to}
      >
        {({ isActive }) => (
          <>
            <Icon
              aria-hidden
              className={`shrink-0 text-muted-foreground transition-colors group-hover/row:text-foreground ${
                nested ? "size-3.5" : "size-4"
              } ${isActive ? "text-foreground" : ""}`}
            />
            <span className="min-w-0 flex-1 truncate">{children}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}

const products = [
  {
    activePath: "/heyo-docs",
    icon: RiBookOpenLine,
    label: "heyo-docs",
    to: "/heyo-docs/introduction",
  },
  {
    activePath: "/heyo-code-audit",
    icon: RiGitRepositoryLine,
    label: "heyo-code-audit",
    to: "/heyo-code-audit/introduction",
  },
  {
    activePath: "/heyo-ui",
    icon: RiCodeBoxLine,
    label: "heyo-ui",
    to: "/heyo-ui/introduction",
  },
];

export function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav
      aria-label="Primary navigation"
      className="flex min-w-0 flex-col gap-2 p-2"
    >
      <section className="flex min-w-0 flex-col gap-0.5">
        <ul className="flex min-w-0 flex-col gap-px">
          <NavigationLink
            end
            icon={RiGlobalLine}
            onNavigate={onNavigate}
            to="/"
          >
            Readme
          </NavigationLink>
        </ul>
      </section>

      <section className="flex min-w-0 flex-col gap-0.5">
        <details className="group/section min-w-0" open>
          <summary
            className={`${row} cursor-pointer list-none font-medium text-foreground/90 hover:bg-foreground/[0.055] hover:text-foreground`}
          >
            <RiCpuLine
              aria-hidden
              className="size-4 shrink-0 text-muted-foreground"
            />
            <span className="min-w-0 flex-1 truncate">Products</span>
            <span className="inline-flex h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-sm border border-dashed border-border px-1 text-[0.6875rem] font-normal text-muted-foreground tabular-nums">
              {products.length}
            </span>
            <RiArrowRightSLine
              aria-hidden
              className="size-3.5 shrink-0 text-muted-foreground opacity-60 transition-[rotate,opacity] duration-200 group-hover/section:opacity-100 group-open/section:rotate-90 motion-reduce:transition-none"
            />
          </summary>
          <div className={rail}>
            <ul className="flex min-w-0 flex-col gap-px">
              {products.map((product) => (
                <NavigationLink
                  activePath={product.activePath}
                  icon={product.icon}
                  key={product.to}
                  nested
                  onNavigate={onNavigate}
                  to={product.to}
                >
                  {product.label}
                </NavigationLink>
              ))}
            </ul>
          </div>
        </details>
      </section>
    </nav>
  );
}
