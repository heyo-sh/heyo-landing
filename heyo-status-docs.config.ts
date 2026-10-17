import { heyoDocs } from "@heyo-sh/heyo-docs/config";

import { docsAi } from "./docs-ai.config.ts";

export default heyoDocs({
  siteUrl: "https://heyo.sh/heyo-status",
  title: "Heyo Status",
  description:
    "A themeable, TypeScript-first status page for React Router, Next.js and Astro.",
  content: "content/heyo-status",
  theme: "heyo",
  ai: docsAi,
  navigation: [
    { label: "Readme", href: "https://heyo.sh" },
    { label: "GitHub", href: "https://github.com/heyo-sh/heyo-status" },
  ],
  groups: [
    {
      group: "Documentation",
      icon: "globe",
      sections: [
        {
          pages: [
            { page: "introduction", icon: "book" },
            { page: "quickstart", icon: "lightbulb" },
            { page: "cli", icon: "check" },
          ],
        },
        {
          section: "Manage Status Page",
          icon: "cursor",
          pages: [
            "manage-status-page/configuration",
            "manage-status-page/identity",
            "manage-status-page/branding",
            "manage-status-page/themes",
            "manage-status-page/monitors",
            "manage-status-page/checks",
            "manage-status-page/metrics",
            "manage-status-page/incidents",
            "manage-status-page/maintenance",
            "manage-status-page/notifications",
            "manage-status-page/subscribers",
          ],
        },
        {
          section: "Frameworks",
          icon: "gitRepository",
          pages: [
            "frameworks/react-router",
            "frameworks/nextjs",
            "frameworks/astro",
          ],
        },
        {
          section: "Databases",
          icon: "folder",
          pages: [
            "databases/sqlite",
            "databases/d1",
            "databases/postgres",
            "databases/schema-and-migrations",
          ],
        },
        {
          section: "Deploying",
          icon: "globe",
          pages: [
            "deploying/cloudflare",
            "deploying/vercel",
            "deploying/self-hosting",
          ],
        },
        {
          section: "HTTP API",
          icon: "code",
          pages: [
            "http-api/overview",
            "http-api/status",
            "http-api/incidents",
            "http-api/maintenance",
            "http-api/subscribers",
            "http-api/badges-feeds-metrics",
            "http-api/admin",
          ],
        },
        {
          section: "How it works",
          icon: "lightbulb",
          pages: [
            "how-it-works/check-run",
            "how-it-works/uptime-and-history",
            "how-it-works/automatic-incidents",
            "how-it-works/notification-delivery",
            "how-it-works/public-subscriptions",
          ],
        },
      ],
    },
  ],
  footer: {
    github: "https://github.com/heyo-sh/heyo-status",
    website: "https://www.npmjs.com/package/@heyo-sh/heyo-status",
  },
  branding: { name: "Heyo Status", logo: "/logo.svg" },
});
