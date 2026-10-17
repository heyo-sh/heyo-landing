import { RiArrowRightLine } from "@remixicon/react";
import { Keyboard, Rebuild, Riffle } from "@lucasmarkes/hairline/react";
import { useState } from "react";

import { Button } from "~/components/ui/button";

type Project = {
  title: string;
  description: string;
  href: string;
  cta: string;
  illustration: "docs" | "audit" | "ui";
};

const projects: Project[] = [
  {
    title: "heyo docs",
    description:
      "A themeable documentation toolkit for React Router, Next.js, and Astro — with MDX, search, OpenAPI, and SEO built in.",
    href: "https://heyo.sh",
    cta: "Explore docs",
    illustration: "docs",
  },
  {
    title: "heyo code audit",
    description:
      "Provider-agnostic AI code auditing for GitHub pull requests, with every finding verified in a separate Pi session.",
    href: "https://github.com/heyo-sh/heyo-code-audit",
    cta: "View on GitHub",
    illustration: "audit",
  },
  {
    title: "heyo ui",
    description:
      "Flat, dense React components for the interfaces developers live in — Base UI behaviour, semantic tokens, and no dark: variants.",
    href: "https://heyo.sh/heyo-ui/introduction",
    cta: "Browse components",
    illustration: "ui",
  },
];

function ProjectIllustration({ illustration }: Pick<Project, "illustration">) {
  if (illustration === "docs") {
    return (
      <Riffle
        aria-label="File cards in a tray, representing documentation"
        intensity={0.65}
      />
    );
  }
  if (illustration === "audit") {
    return (
      <Rebuild
        aria-label="A dependency tree responding to changes in code"
        intensity={0.65}
      />
    );
  }
  return (
    <Keyboard
      aria-label="Interactive keyboard for a component library"
      intensity={0.65}
    />
  );
}

function ShippedProject({
  project,
  index,
  active,
  faded,
  onHoverStart,
  onHoverEnd,
}: {
  project: Project;
  index: number;
  active: boolean;
  faded: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const isDocs = project.illustration === "docs";

  return (
    <li
      className={`shipped-project flex flex-col items-stretch gap-4 transition-opacity duration-500 sm:grid sm:grid-cols-2 lg:grid lg:gap-x-4 ${isDocs ? "lg:col-span-2 lg:grid-cols-8" : "lg:col-span-1 lg:grid-cols-2"} ${faded ? "opacity-50" : ""}`}
      data-active={active ? "true" : "false"}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onHoverStart();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") onHoverEnd();
      }}
    >
      <div
        className={`hairline-tinted flex aspect-[3/2] w-full items-center justify-center overflow-hidden bg-input/30 p-4 sm:aspect-[9/6] sm:p-5 lg:order-none lg:p-6 ${isDocs ? "sm:order-2 lg:col-span-4 lg:aspect-[7/3]" : "sm:order-1 lg:col-span-1 lg:aspect-[9/8]"}`}
      >
        <div className="w-full max-w-[420px]">
          <ProjectIllustration illustration={project.illustration} />
        </div>
      </div>

      <article
        className={`flex min-w-0 flex-col items-start justify-between gap-3 self-stretch text-sm sm:gap-0 lg:order-none ${isDocs ? "sm:order-1 lg:col-span-2 lg:pr-px" : "sm:order-2 lg:col-span-1"}`}
      >
        <span className="text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex w-full flex-col items-start">
          <div className="flex flex-col items-start gap-1">
            <h3 className="font-medium">{project.title}</h3>
            <p className="leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
          <div
            className={`grid w-full transition-[grid-template-rows] duration-300 ease-out [grid-template-rows:1fr] sm:[grid-template-rows:0fr] ${active ? "sm:[grid-template-rows:1fr]" : ""}`}
          >
            <div className="-mx-2 overflow-hidden px-2">
              <div
                className={`pt-4 pb-2 transition-opacity duration-300 ease-out sm:opacity-0 ${active ? "sm:opacity-100" : ""}`}
              >
                <Button
                  render={
                    <a href={project.href} rel="noreferrer" target="_blank" />
                  }
                  size="sm"
                  variant="secondary"
                >
                  {project.cta} <RiArrowRightLine />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export function ShippedProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="shipped-title"
      className="mt-10 px-6 py-12 sm:px-10 lg:px-16 lg:py-20"
      id="shipped"
    >
      <h2
        className="text-3xl leading-none tracking-tight sm:text-4xl"
        id="shipped-title"
      >
        <span className="text-primary">Built for teams,</span> <br />
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          shipped by
          <span
            aria-label="heyo"
            className="shipped-heyo-logo translate-y-0.5"
            role="img"
          />
        </span>
      </h2>
      <ol className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-12">
        {projects.map((project, index) => (
          <ShippedProject
            active={hoveredIndex === index}
            faded={hoveredIndex !== null && hoveredIndex !== index}
            index={index}
            key={project.title}
            onHoverEnd={() => setHoveredIndex(null)}
            onHoverStart={() => setHoveredIndex(index)}
            project={project}
          />
        ))}
      </ol>
    </section>
  );
}
