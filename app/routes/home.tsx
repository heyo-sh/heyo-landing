import {
  RiArrowRightLine,
  RiCloseLine,
  RiGithubLine,
  RiMenuLine,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react";
import { useState } from "react";
import type { MetaFunction } from "react-router";

import { Footer } from "~/components/footer";
import { Brand, Navigation } from "~/components/navigation";
import { useDocsTheme } from "@heyo-sh/heyo-docs/theme/provider";
import { Button } from "~/components/ui/button";
import { ShippedProjects } from "~/components/shipped-projects";

export const meta: MetaFunction = () => [
  { title: "Heyo — developer tools for teams" },
  {
    name: "description",
    content:
      "Heyo gives software teams the tools and context to ship their best work.",
  },
];

type OpenSourceDiagramKind =
  "inspect" | "fork" | "collaborate" | "portable" | "standards" | "community";

const communityGridRows = 11;

const communityGridCells = Array.from(
  { length: 53 * communityGridRows },
  (_, index) => {
    const column = Math.floor(index / communityGridRows);
    const row = index % communityGridRows;
    const seed = (column * 17 + row * 31 + column * row * 7) % 13;
    const idleOpacity = [0.12, 0.18, 0.28, 0.4][seed % 4];

    return {
      begin: `${((column * 0.67 + row * 1.17) % 16).toFixed(2)}s`,
      duration: `${(8 + (seed % 4)).toFixed(1)}s`,
      flickers: (column * 13 + row * 7) % 7 === 0,
      idleOpacity,
      x: column * 20 + 6,
      y: 1 + row * 17,
    };
  },
);

function CommunityGrid() {
  return (
    <svg
      aria-hidden="true"
      className="block size-full text-foreground"
      fill="none"
      preserveAspectRatio="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 1056 180"
    >
      {communityGridCells.map((cell, index) => (
        <rect
          fill="var(--background)"
          height="8"
          key={index}
          opacity={cell.idleOpacity}
          rx="0.5"
          stroke="currentColor"
          strokeWidth="0.8"
          width="8"
          x={cell.x}
          y={cell.y}
        >
          {cell.flickers ? (
            <animate
              attributeName="opacity"
              begin={cell.begin}
              dur={cell.duration}
              keyTimes="0;0.22;0.4;0.6;1"
              repeatCount="indefinite"
              values={`${cell.idleOpacity};${cell.idleOpacity};1;${cell.idleOpacity};${cell.idleOpacity}`}
            />
          ) : null}
        </rect>
      ))}
    </svg>
  );
}

function OpenSourceDiagram({ kind }: { kind: OpenSourceDiagramKind }) {
  const line = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 0.65,
  };

  return (
    <svg
      aria-hidden="true"
      className="open-source-diagram size-full"
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 96 96"
    >
      {kind === "inspect" ? (
        <>
          <path
            {...line}
            strokeDasharray="4 4"
            d="M14 22h68M14 48h42M14 74h68"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="8"
            width="8"
            x="10"
            y="18"
          />
          <rect
            {...line}
            fill="currentColor"
            height="8"
            width="8"
            x="10"
            y="44"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="8"
            width="8"
            x="10"
            y="70"
          />
          <circle {...line} cx="64" cy="52" r="15" />
          <circle fill="currentColor" cx="64" cy="52" r="3" />
          <path {...line} d="m75 63 10 10" />
        </>
      ) : null}
      {kind === "fork" ? (
        <>
          <path
            {...line}
            strokeDasharray="4 4"
            d="M24 18v60M24 48h48V30M24 48h48v18"
          />
          <circle {...line} fill="var(--background)" cx="24" cy="18" r="6" />
          <circle fill="currentColor" cx="24" cy="48" r="4" />
          <rect
            {...line}
            fill="var(--background)"
            height="12"
            width="12"
            x="66"
            y="24"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="12"
            width="12"
            x="66"
            y="60"
          />
          <circle fill="currentColor" cx="24" cy="78" r="4" />
        </>
      ) : null}
      {kind === "collaborate" ? (
        <>
          <path {...line} strokeDasharray="4 4" d="M21 68 48 26l27 42" />
          <circle {...line} fill="var(--background)" cx="21" cy="68" r="11" />
          <circle {...line} fill="var(--background)" cx="48" cy="26" r="11" />
          <circle {...line} fill="var(--background)" cx="75" cy="68" r="11" />
          <circle fill="currentColor" cx="21" cy="68" r="3" />
          <circle fill="currentColor" cx="48" cy="26" r="3" />
          <circle fill="currentColor" cx="75" cy="68" r="3" />
        </>
      ) : null}
      {kind === "portable" ? (
        <>
          <path
            {...line}
            strokeDasharray="4 4"
            d="M23 24h25v15M73 24H48v15M23 72h25V57M73 72H48V57"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="10"
            width="10"
            x="18"
            y="19"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="10"
            width="10"
            x="68"
            y="19"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="10"
            width="10"
            x="18"
            y="67"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="10"
            width="10"
            x="68"
            y="67"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="18"
            width="20"
            x="38"
            y="39"
          />
          <path {...line} d="M44 45h8M44 51h5" />
          <rect fill="currentColor" height="4" width="4" x="45" y="45" />
        </>
      ) : null}
      {kind === "standards" ? (
        <>
          <path
            {...line}
            strokeDasharray="4 4"
            d="M18 26h60M18 48h60M18 70h60"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="12"
            width="12"
            x="12"
            y="20"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="12"
            width="12"
            x="72"
            y="42"
          />
          <rect
            {...line}
            fill="currentColor"
            height="12"
            width="12"
            x="12"
            y="64"
          />
          <circle {...line} fill="var(--background)" cx="48" cy="48" r="12" />
          <path {...line} d="m42 48 4 4 8-9" />
        </>
      ) : null}
      {kind === "community" ? (
        <>
          <path
            {...line}
            strokeDasharray="4 4"
            d="M48 48 20 25M48 48 76 25M48 48 20 71M48 48 76 71"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="10"
            width="10"
            x="15"
            y="20"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="10"
            width="10"
            x="71"
            y="20"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="10"
            width="10"
            x="15"
            y="66"
          />
          <rect
            {...line}
            fill="var(--background)"
            height="10"
            width="10"
            x="71"
            y="66"
          />
          <circle {...line} fill="var(--background)" cx="48" cy="48" r="13" />
          <circle fill="currentColor" cx="48" cy="48" r="4" />
        </>
      ) : null}
    </svg>
  );
}

function OpenSourceSignal({ mobile = false }: { mobile?: boolean }) {
  const paths = mobile
    ? [
        "M174 270C132 220 96 170 48 150",
        "M306 270C348 220 384 170 432 150",
        "M105 300C80 300 58 310 20 330",
        "M375 300C400 300 422 310 460 330",
        "M174 350C130 420 94 470 50 500",
        "M306 350C350 420 386 470 430 500",
      ]
    : [
        "M404 172C330 118 250 88 132 104",
        "M556 172C630 118 710 88 828 104",
        "M390 220C288 206 208 224 84 248",
        "M570 220C672 206 752 224 876 248",
        "M404 268C326 326 250 352 146 340",
        "M556 268C634 326 710 352 814 340",
      ];
  const markers: Array<[number, number, "circle" | "square"]> = mobile
    ? [
        [48, 150, "square"],
        [432, 150, "circle"],
        [20, 330, "circle"],
        [460, 330, "square"],
        [50, 500, "square"],
        [430, 500, "circle"],
      ]
    : [
        [132, 104, "square"],
        [828, 104, "circle"],
        [84, 248, "circle"],
        [876, 248, "square"],
        [146, 340, "square"],
        [814, 340, "circle"],
      ];

  return (
    <svg
      aria-hidden="true"
      className="open-source-signal absolute inset-0 size-full text-foreground"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      viewBox={mobile ? "0 0 480 640" : "0 0 960 440"}
    >
      <g data-source-paths="" stroke="currentColor" strokeWidth="1">
        {paths.map((path) => (
          <path d={path} key={path} />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="1">
        {markers.map(([x, y, shape], index) =>
          shape === "square" ? (
            <rect
              className="source-network-marker"
              fill={index % 3 === 0 ? "currentColor" : "var(--background)"}
              height="8"
              key={`${x}-${y}`}
              width="8"
              x={x - 4}
              y={y - 4}
            />
          ) : (
            <circle
              className="source-network-marker"
              cx={x}
              cy={y}
              fill={index % 3 === 0 ? "currentColor" : "var(--background)"}
              key={`${x}-${y}`}
              r="4"
            />
          ),
        )}
      </g>
      {paths.map((path, index) => (
        <circle
          className="source-network-particle"
          fill="var(--background)"
          key={path}
          opacity="0"
          r="3"
          stroke="currentColor"
          strokeWidth="1"
        >
          <animate
            attributeName="opacity"
            begin={`${index * 0.9}s`}
            dur="5.4s"
            keyTimes="0;0.08;0.84;1"
            repeatCount="indefinite"
            values="0;1;1;0"
          />
          <animateMotion
            begin={`${index * 0.9}s`}
            dur="5.4s"
            path={path}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

function OpenSourcePromise() {
  return (
    <section
      aria-label="Open source, always. Fork it. Make it yours."
      className="w-full px-6 py-10 sm:px-10 lg:px-16 lg:py-20"
      id="your-work"
    >
      <div className="relative hidden w-full aspect-[11/5] lg:block">
        <OpenSourceSignal />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <OpenSourceHeading />
        </div>
        <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <OpenSourceCallToAction />
        </div>
      </div>

      <div className="mx-auto max-w-[480px] lg:hidden">
        <div className="relative w-full aspect-[3/4]">
          <OpenSourceSignal mobile />
          <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <OpenSourceHeading />
          </div>
          <div className="absolute top-[61%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <OpenSourceCallToAction />
          </div>
        </div>
      </div>
    </section>
  );
}

function OpenSourceHeading() {
  return (
    <h2 className="-space-y-1 flex flex-col gap-0 bg-background p-3 text-center">
      <span className="text-nowrap text-xl leading-tight tracking-tight text-foreground sm:text-3xl lg:text-5xl">
        Open source, always.
      </span>
      <span className="text-nowrap text-xl leading-tight tracking-tight text-muted-foreground sm:text-3xl lg:text-5xl">
        Fork it. Make it yours.
      </span>
    </h2>
  );
}

function OpenSourceCallToAction() {
  return (
    <Button
      render={
        <a href="https://github.com/heyo-sh" rel="noreferrer" target="_blank" />
      }
    >
      Browse the source <RiGithubLine />
    </Button>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center">
      <a
        aria-label="GitHub"
        className="inline-flex size-7 items-center justify-center rounded-md text-foreground/60 transition-colors hover:text-foreground"
        href="https://github.com/heyo-sh"
        rel="noreferrer"
        target="_blank"
      >
        <RiGithubLine aria-hidden="true" className="size-3.5" />
      </a>
      <a
        aria-label="X (Twitter)"
        className="inline-flex size-7 items-center justify-center rounded-md text-foreground/60 transition-colors hover:text-foreground"
        href="https://x.com/Heyodotsh"
        rel="noreferrer"
        target="_blank"
      >
        <svg
          aria-hidden="true"
          className="size-2.5"
          fill="none"
          viewBox="0 0 1200 1227"
        >
          <path
            className="fill-current"
            d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
          />
        </svg>
      </a>
    </div>
  );
}

function OpenSourceCard({
  title,
  description,
  diagram,
  className = "",
}: {
  title: string;
  description: string;
  diagram: OpenSourceDiagramKind;
  className?: string;
}) {
  return (
    <article
      className={`flex min-h-48 flex-col items-start gap-4 border-t border-border pt-4 sm:min-h-52 lg:col-span-1 lg:min-h-60 lg:gap-6 lg:pt-6 ${className}`}
    >
      <div className="space-y-1">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="mt-6 size-20 text-foreground sm:size-24 lg:size-27">
        <OpenSourceDiagram kind={diagram} />
      </div>
    </article>
  );
}

export default function HomeRoute() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { mounted, resolvedTheme, toggleTheme } = useDocsTheme();
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <main className="min-h-svh bg-background text-foreground lg:flex">
      <aside className="sticky top-0 hidden h-svh w-52 shrink-0 flex-col bg-background lg:flex">
        <div className="flex h-14 shrink-0 items-center px-4">
          <Brand />
        </div>
        <Navigation />
        <div className="mt-auto flex h-12 items-center justify-between px-4">
          <SocialLinks />
          <button
            aria-label={isDark ? "Use light theme" : "Use dark theme"}
            className="inline-flex size-8 items-center justify-center rounded-md text-foreground/60 transition-colors hover:text-foreground"
            onClick={toggleTheme}
            type="button"
          >
            {isDark ? (
              <RiSunLine aria-hidden="true" className="size-3" />
            ) : (
              <RiMoonLine aria-hidden="true" className="size-3" />
            )}
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-background px-5 lg:hidden">
        <Brand />
        <Button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          size="icon-sm"
          variant="ghost"
        >
          {menuOpen ? (
            <RiCloseLine aria-hidden="true" />
          ) : (
            <RiMenuLine aria-hidden="true" />
          )}
        </Button>
      </header>

      {menuOpen ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-20 flex flex-col bg-background p-5 lg:hidden">
          <Navigation onNavigate={() => setMenuOpen(false)} />
          <div className="mt-auto">
            <SocialLinks />
          </div>
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-16 z-0 h-18 bg-linear-to-b from-background to-background/0 lg:top-0 lg:left-52 lg:z-30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-18 bg-linear-to-t from-background to-background/0 lg:left-52 lg:z-30"
        />

        <section
          className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16"
          id="introduction"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
            <h1 className="text-4xl sm:text-5xl">
              Open-Source Software
              <br />
              for Developers
            </h1>
            <div className="max-w-md space-y-4">
              <p className="text-sm max-w-sm">
                Explore open-source tools built to help developers write,
                review, and ship better software.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  render={
                    <a
                      href="https://github.com/orgs/heyo-sh/repositories"
                      rel="noreferrer"
                      target="_blank"
                    />
                  }
                >
                  Check on Github <RiGithubLine />
                </Button>
                <Button render={<a href="#your-work" />} variant="outline">
                  Discover Heyo <RiArrowRightLine />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 h-72 overflow-hidden bg-input/30 text-foreground sm:mt-16 sm:h-80 lg:h-96">
            <svg
              aria-label="Animated abstract folded lattice"
              className="size-full"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              viewBox="0 0 1120 520"
            >
              <title>Abstract folded lattice</title>

              <g stroke="currentColor" strokeDasharray="6 6" strokeWidth="1.25">
                <path d="M94 136H298L534 260" />
                <path d="M94 384H298L534 260" />
                <path d="M1026 136H822L586 260" />
                <path d="M1026 384H822L586 260" />
                <path d="M358 116 534 260 358 404" opacity="0.45" />
                <path d="M762 116 586 260 762 404" opacity="0.45" />
              </g>

              <g fill="var(--input)" fillOpacity="0.3" stroke="currentColor">
                <rect height="12" width="12" x="88" y="130" />
                <rect height="12" width="12" x="88" y="378" />
                <rect height="12" width="12" x="1020" y="130" />
                <rect height="12" width="12" x="1020" y="378" />
                <rect height="12" width="12" x="352" y="110" />
                <rect height="12" width="12" x="352" y="398" />
                <rect height="12" width="12" x="756" y="110" />
                <rect height="12" width="12" x="756" y="398" />
              </g>

              <g transform="translate(560 260)">
                <rect
                  fill="var(--background)"
                  height="52"
                  stroke="currentColor"
                  width="52"
                  x="-26"
                  y="-26"
                >
                  <animateTransform
                    additive="sum"
                    attributeName="transform"
                    dur="4s"
                    repeatCount="indefinite"
                    type="scale"
                    values="0.96;1;0.96"
                  />
                </rect>
                <rect
                  fill="var(--input)"
                  fillOpacity="0.3"
                  height="12"
                  stroke="currentColor"
                  width="12"
                  x="-6"
                  y="-6"
                >
                  <animate
                    attributeName="opacity"
                    dur="2.4s"
                    repeatCount="indefinite"
                    values="1;0.3;1"
                  />
                </rect>
              </g>

              <rect
                fill="var(--background)"
                height="9"
                stroke="currentColor"
                width="9"
                x="-4.5"
                y="-4.5"
              >
                <animate
                  attributeName="opacity"
                  begin="0s"
                  dur="6.4s"
                  keyTimes="0;0.08;0.76;0.86;1"
                  repeatCount="indefinite"
                  values="0;1;1;0;0"
                />
                <animateMotion
                  begin="0s"
                  dur="6.4s"
                  path="M94 136H298L534 260"
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                fill="var(--background)"
                height="9"
                stroke="currentColor"
                width="9"
                x="-4.5"
                y="-4.5"
              >
                <animate
                  attributeName="opacity"
                  begin="1.3s"
                  dur="7.2s"
                  keyTimes="0;0.08;0.76;0.86;1"
                  repeatCount="indefinite"
                  values="0;1;1;0;0"
                />
                <animateMotion
                  begin="1.3s"
                  dur="7.2s"
                  path="M94 384H298L534 260"
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                fill="var(--background)"
                height="9"
                stroke="currentColor"
                width="9"
                x="-4.5"
                y="-4.5"
              >
                <animate
                  attributeName="opacity"
                  begin="0.7s"
                  dur="6.8s"
                  keyTimes="0;0.08;0.76;0.86;1"
                  repeatCount="indefinite"
                  values="0;1;1;0;0"
                />
                <animateMotion
                  begin="0.7s"
                  dur="6.8s"
                  path="M1026 136H822L586 260"
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                fill="var(--background)"
                height="9"
                stroke="currentColor"
                width="9"
                x="-4.5"
                y="-4.5"
              >
                <animate
                  attributeName="opacity"
                  begin="2s"
                  dur="7.6s"
                  keyTimes="0;0.08;0.76;0.86;1"
                  repeatCount="indefinite"
                  values="0;1;1;0;0"
                />
                <animateMotion
                  begin="2s"
                  dur="7.6s"
                  path="M1026 384H822L586 260"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          </div>
        </section>

        <ShippedProjects />

        <section
          aria-labelledby="open-source-title"
          className="grid grid-cols-1 gap-x-4 gap-y-12 px-6 py-12 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:gap-y-12 lg:px-16 lg:py-20 mt-10"
          id="open-source"
        >
          <header className="sm:col-span-2 lg:col-span-4 lg:mb-8">
            <h2
              className="text-3xl leading-none tracking-tight sm:text-4xl"
              id="open-source-title"
            >
              Open source,
            </h2>
            <p className="mt-1 text-3xl leading-none tracking-tight text-muted-foreground sm:text-4xl">
              by default
            </p>
          </header>

          <OpenSourceCard
            className="lg:col-start-2"
            description="Every line of code is public on GitHub. Read it, run it, and change it."
            diagram="inspect"
            title="The code is the product"
          />
          <OpenSourceCard
            description="Use Heyo at work, in production, or as a starting point for your own tool."
            diagram="standards"
            title="MIT licensed"
          />
          <OpenSourceCard
            description="Keep configuration next to code, versioned and reviewable."
            diagram="portable"
            title="Your repo, your rules"
          />
          <OpenSourceCard
            description="Use the infrastructure and workflow your team already has."
            diagram="community"
            title="Deploy anywhere"
          />
          <OpenSourceCard
            description="Fork it. Add what you need. Remove what you don't."
            diagram="fork"
            title="Built to be extended"
          />
          <OpenSourceCard
            description="Issues and pull requests are part of how Heyo improves."
            diagram="collaborate"
            title="Built in the open"
          />
        </section>

        <section
          aria-labelledby="community-title"
          className="px-6 py-12 sm:px-10 lg:px-16 lg:py-20"
          id="community"
        >
          <h2
            className="text-3xl leading-none tracking-tight sm:text-4xl"
            id="community-title"
          >
            <span className="text-primary">Driven by</span>
            <br />
            <span className="text-muted-foreground">community</span>
          </h2>
          <div className="mt-12 aspect-[88/15] min-h-18 w-full overflow-hidden lg:mt-16">
            <CommunityGrid />
          </div>
        </section>

        <OpenSourcePromise />

        <Footer />
      </div>
    </main>
  );
}
