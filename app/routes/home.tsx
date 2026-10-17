import {
  RiArrowRightLine,
  RiCloseLine,
  RiGithubLine,
  RiMenuLine,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react";
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { MetaFunction } from "react-router";

import { useDocsTheme } from "@heyo-sh/heyo-docs/theme/provider";
import { CommunityGrid } from "~/components/community-grid";
import { Footer } from "~/components/footer";
import {
  HeroFigure,
  OpenSourceFigure,
  type OpenSourceDiagramKind,
} from "~/components/home-figures";
import { Brand, Navigation } from "~/components/navigation";
import { PromiseFigures } from "~/components/promise-figures";
import { ShippedProjects } from "~/components/shipped-projects";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => [
  { title: "Heyo — developer tools for teams" },
  {
    name: "description",
    content:
      "Heyo gives software teams the tools and context to ship their best work.",
  },
];

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

function OpenSourcePromise({ theme }: { theme: "dark" | "light" }) {
  return (
    <section
      aria-label="Open source, always. Fork it. Make it yours."
      className="w-full px-6 py-10 sm:px-10 lg:px-16 lg:py-20"
      id="your-work"
    >
      <div className="border-b border-border/50 py-6">
        <div className="relative mx-auto grid w-full max-w-[480px] grid-cols-2 items-center gap-4 xl:block xl:aspect-[11/5] xl:max-w-none">
          <PromiseFigures theme={theme} />
          <div className="col-span-2 justify-self-center xl:pointer-events-none xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
            <OpenSourceHeading />
          </div>
          <div className="col-span-2 justify-self-center xl:absolute xl:top-[70%] xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
            <OpenSourceCallToAction />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center">
      <a
        aria-label="GitHub"
        className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.055] hover:text-foreground focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring"
        href="https://github.com/heyo-sh"
        rel="noreferrer"
        target="_blank"
      >
        <RiGithubLine aria-hidden="true" className="size-4" />
      </a>
      <a
        aria-label="X (Twitter)"
        className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.055] hover:text-foreground focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring"
        href="https://x.com/Heyodotsh"
        rel="noreferrer"
        target="_blank"
      >
        <svg
          aria-hidden="true"
          className="size-3"
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
      <div className="mt-3 w-32 sm:w-36 lg:mt-1 lg:w-full lg:max-w-44">
        <OpenSourceFigure kind={diagram} />
      </div>
    </article>
  );
}

export default function HomeRoute() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const { mounted, resolvedTheme, toggleTheme } = useDocsTheme();
  const isDark = mounted ? resolvedTheme === "dark" : true;

  // Treat the whole hero panel as the figure's hit area. Once the pointer is
  // over the SVG itself Hairline receives the real pointer, unchanged.
  const moveHero = (event: ReactPointerEvent<HTMLDivElement>) => {
    const stage = heroStageRef.current;
    if (
      event.pointerType === "touch" ||
      !event.nativeEvent.isTrusted ||
      !stage ||
      stage.contains(event.target as Node)
    )
      return;
    const rect = stage.getBoundingClientRect();
    stage.dispatchEvent(
      new PointerEvent("pointermove", {
        pointerType: event.pointerType,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
      }),
    );
  };

  return (
    <main className="home-hairline min-h-svh bg-background text-foreground lg:flex">
      {/* The documentation shell's brand row and navigation column. */}
      <aside className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col bg-background lg:flex xl:w-64">
        <div className="flex h-12 shrink-0 items-center px-3 sm:px-4">
          <Brand />
        </div>
        <Navigation />
        <div className="mt-auto flex h-11 shrink-0 items-center justify-between px-2">
          <SocialLinks />
          <button
            aria-label={isDark ? "Use light theme" : "Use dark theme"}
            className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.055] hover:text-foreground focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring"
            onClick={toggleTheme}
            type="button"
          >
            {isDark ? (
              <RiSunLine aria-hidden="true" className="size-4" />
            ) : (
              <RiMoonLine aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-10 flex h-12 items-center justify-between bg-background px-3 sm:px-4 lg:hidden">
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
        <div className="fixed inset-x-0 top-12 bottom-0 z-20 flex flex-col bg-background px-1 py-2 lg:hidden">
          <Navigation onNavigate={() => setMenuOpen(false)} />
          <div className="mt-auto px-2">
            <SocialLinks />
          </div>
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-12 z-0 h-18 bg-linear-to-b from-background to-background/0 lg:top-0 lg:left-60 lg:z-30 xl:left-64"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-18 bg-linear-to-t from-background to-background/0 lg:left-60 lg:z-30 xl:left-64"
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
          <div
            className="hairline-tinted mt-12 flex h-62 items-center justify-center overflow-hidden bg-input/30 sm:mt-16 sm:h-70 lg:h-86"
            onPointerEnter={moveHero}
            onPointerMove={moveHero}
            onPointerLeave={(event) => {
              heroStageRef.current?.dispatchEvent(
                new PointerEvent("pointerleave", {
                  pointerType: event.pointerType,
                }),
              );
            }}
          >
            <div className="h-full aspect-[5/4] max-w-full">
              <HeroFigure stageRef={heroStageRef} />
            </div>
          </div>
        </section>

        <ShippedProjects />

        <section
          aria-labelledby="open-source-title"
          className="grid grid-cols-1 gap-x-4 gap-y-12 px-6 py-12 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:gap-y-12 lg:px-16 lg:py-20 mt-10"
          id="open-source"
        >
          <header className="sm:col-span-2 lg:col-span-3 lg:mb-8">
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
            className="lg:col-start-1"
            description="Fork it. Add what you need. Remove what you don't."
            diagram="fork"
            title="Built to be extended"
          />
          <OpenSourceCard
            className="lg:col-start-2"
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
          <div className="mt-6 w-full rounded-md border border-border p-2 sm:p-4 lg:mt-10">
            <div className="aspect-[8/3] min-h-24 w-full overflow-hidden sm:aspect-[88/15] sm:min-h-18">
              <CommunityGrid />
            </div>
          </div>
        </section>

        <OpenSourcePromise theme={isDark ? "dark" : "light"} />
        <Footer />
      </div>
    </main>
  );
}
