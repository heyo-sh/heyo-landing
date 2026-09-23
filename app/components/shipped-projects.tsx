import { RiArrowRightLine } from "@remixicon/react";
import { useState } from "react";

import { Button } from "~/components/ui/button";

type Project = {
  title: string;
  description: string;
  href: string;
  cta: string;
  illustration: "docs" | "audit";
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
];

function Cursor() {
  return (
    <g className="shipped-docs-cursor">
      <path
        d="m0 0 4 14 3.75-5.5 5.5 5.5 2.25-2.25-5.5-5.5 5.5-3.75z"
        fill="currentColor"
      />
      <circle
        className="shipped-cursor-ripple"
        cx="6.5"
        cy="6.5"
        fill="none"
        r="10"
        stroke="currentColor"
        strokeWidth="0.6"
      />
    </g>
  );
}

function DocsIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="size-full max-h-full max-w-full"
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 280 190"
    >
      <rect fill="var(--background)" height="112" width="174" x="68" y="58" />
      <rect
        fill="var(--input)"
        fillOpacity="0.35"
        height="118"
        rx="2"
        width="180"
        x="28"
        y="30"
      />
      <rect
        fill="currentColor"
        height="3"
        opacity="0.72"
        width="48"
        x="43"
        y="48"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.32"
        width="118"
        x="43"
        y="64"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.32"
        width="92"
        x="43"
        y="74"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.32"
        width="108"
        x="43"
        y="84"
      />
      <rect
        fill="var(--background)"
        height="29"
        opacity="0.9"
        width="126"
        x="43"
        y="99"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.6"
        width="42"
        x="55"
        y="110"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.25"
        width="76"
        x="55"
        y="118"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.2"
        width="128"
        x="43"
        y="135"
      />
      <rect
        className="shipped-docs-progress"
        fill="currentColor"
        height="2"
        opacity="0.82"
        width="128"
        x="43"
        y="135"
      />
      <g transform="translate(145 101)">
        <Cursor />
      </g>
    </svg>
  );
}

function AuditCard({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect
        fill="var(--input)"
        fillOpacity="0.45"
        height="62"
        rx="2"
        width="136"
        y="70"
      />
      <rect
        fill="currentColor"
        height="27"
        opacity="0.13"
        width="32"
        x="10"
        y="80"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.72"
        width="50"
        x="53"
        y="82"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.28"
        width="62"
        x="53"
        y="91"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.28"
        width="44"
        x="53"
        y="100"
      />
      <circle cx="116" cy="116" fill="currentColor" opacity="0.65" r="5" />
    </g>
  );
}

function AuditIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="size-full max-h-full max-w-full"
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 280 190"
    >
      <defs>
        <clipPath id="shipped-audit-carousel-clip">
          <rect height="62" width="160" x="40" y="70" />
        </clipPath>
      </defs>
      <rect fill="var(--background)" height="140" width="200" x="40" y="25" />
      <rect
        fill="currentColor"
        height="12"
        opacity="0.18"
        width="12"
        x="52"
        y="39"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.7"
        width="46"
        x="72"
        y="42"
      />
      <rect
        fill="currentColor"
        height="1"
        opacity="0.16"
        width="176"
        x="52"
        y="60"
      />
      <g clipPath="url(#shipped-audit-carousel-clip)">
        <g transform="translate(40 0)">
          <g className="shipped-audit-carousel">
            <AuditCard x={0} />
            <AuditCard x={148} />
            <AuditCard x={296} />
            <AuditCard x={444} />
          </g>
        </g>
      </g>
      <circle
        className="shipped-audit-dot shipped-audit-dot-first"
        cx="109"
        cy="145"
        fill="currentColor"
        r="2"
      />
      <circle
        className="shipped-audit-dot shipped-audit-dot-second"
        cx="118"
        cy="145"
        fill="currentColor"
        opacity="0.25"
        r="2"
      />
      <circle
        className="shipped-audit-dot shipped-audit-dot-third"
        cx="127"
        cy="145"
        fill="currentColor"
        opacity="0.25"
        r="2"
      />
    </svg>
  );
}

function ProjectIllustration({ illustration }: Pick<Project, "illustration">) {
  return illustration === "docs" ? <DocsIllustration /> : <AuditIllustration />;
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
        className={`flex aspect-[3/2] w-full items-center justify-center overflow-hidden bg-input/30 p-4 sm:aspect-[9/6] sm:p-5 lg:order-none lg:p-6 ${isDocs ? "sm:order-2 lg:col-span-4 lg:aspect-[7/3]" : "sm:order-1 lg:col-span-1 lg:aspect-[9/8]"}`}
      >
        <ProjectIllustration illustration={project.illustration} />
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
