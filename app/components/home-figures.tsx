import type { Ref } from "react";

import {
  Branches,
  Drawer,
  Hub,
  Loupe,
  Padlock,
  Router,
  Settle,
} from "@lucasmarkes/hairline/react";

export type OpenSourceDiagramKind =
  "inspect" | "fork" | "collaborate" | "portable" | "standards" | "community";

export function OpenSourceFigure({ kind }: { kind: OpenSourceDiagramKind }) {
  switch (kind) {
    case "inspect":
      return (
        <Loupe
          aria-label="A magnifying glass inspecting a sheet"
          intensity={0.7}
        />
      );
    case "fork":
      return (
        <Branches aria-label="Branches that fork and merge" intensity={0.7} />
      );
    case "collaborate":
      return (
        <Hub aria-label="Connected parts of an open project" intensity={0.7} />
      );
    case "portable":
      return (
        <Drawer
          aria-label="Open drawers for your configuration"
          intensity={0.7}
        />
      );
    case "standards":
      return (
        <Padlock
          aria-label="An openable lock for the MIT license"
          intensity={0.7}
        />
      );
    case "community":
      return (
        <Router
          aria-label="A router that can connect to any infrastructure"
          intensity={0.7}
        />
      );
  }
}

export function HeroFigure({ stageRef }: { stageRef: Ref<HTMLDivElement> }) {
  return (
    <Settle
      aria-label="Tiles gathering into a shared tree"
      intensity={0.75}
      ref={stageRef}
    />
  );
}
