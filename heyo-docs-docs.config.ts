import { heyoDocs } from "@heyo-sh/heyo-docs/config";

export default heyoDocs({
  siteUrl: "https://heyo.sh/heyo-docs",
  title: "Heyo Docs example",
  description: "The thin React Router shell around the Heyo Docs runtime.",
  content: "content/heyo-docs",
  theme: "grain",
  navigation: [
    { label: "Readme", href: "https://heyo.sh" },
    { label: "GitHub", href: "https://github.com/heyo-sh/heyo-docs" },
  ],
  ai: {
    chat: {
      provider: "openai",
      model: "gpt-5-nano",
    },
  },
  groups: [
    {
      group: "Documentation",
      icon: "globe",
      sections: [
        {
          pages: [
            {
              icon: "book",
              page: "introduction",
            },
            {
              page: "quickstart",
              icon: "lightbulb",
            },
          ],
        },
        {
          section: "Basic Styling",
          icon: "lightbulb",
          pages: [
            "basic-styling/text",
            "basic-styling/code",
            "basic-styling/lists",
            "basic-styling/tables",
          ],
        },
        {
          section: "Components",
          icon: "code",
          pages: [
            "components/accordion",
            "components/badge",
            "components/button",
            "components/callout",
            "components/code-block",
            "components/code-block-group",
            "components/code-snippet",
            "components/columns",
            "components/custom-components",
            "components/github",
            "components/hover-card",
            "components/mermaid",
            "components/properties",
            "components/related-topics",
            "components/tabs",
            "components/tree",
          ],
        },
        {
          section: "Media",
          icon: "folder",
          pages: ["media/images", "media/video", "media/files"],
        },
        {
          section: "Themes",
          icon: "sun",
          pages: ["themes/grain", "themes/shade", "themes/moss"],
        },
        {
          section: "Manage Website",
          icon: "cursor",
          pages: [
            "manage-website/configuration",
            "manage-website/content",
            "manage-website/navigation",
            "manage-website/site-identity",
            "manage-website/appearance",
            "manage-website/header-and-footer",
            "manage-website/fonts",
            "manage-website/icons",
            "manage-website/integrations",
            "manage-website/search",
            "manage-website/openapi",
            "manage-website/ai-chat",
          ],
        },
        {
          section: "Framework",
          icon: "gitRepository",
          pages: [
            "framework/react-router",
            "framework/astro",
            "framework/nextjs",
          ],
        },
        {
          section: "Deploying",
          icon: "globe",
          pages: ["deploying/cloudflare", "deploying/vercel"],
        },
        {
          section: "Tutorials",
          icon: "book",
          pages: [
            "tutorials/robots-txt",
            "tutorials/sitemap-xml",
            "tutorials/json-ld",
            "tutorials/rss-xml",
            "tutorials/llms-txt",
            "tutorials/llms-full-txt",
            "tutorials/markdown-endpoints",
          ],
        },
      ],
    },
    {
      group: "Changelog (Demo)",
      description:
        "A rich product-update timeline with releases, improvements, migrations, and fixes.",
      icon: "changelog",
      type: "changelog",
      updates: ["changelog"],
    },
    {
      group: "OpenAPI (Demo)",
      icon: "code",
      sections: [
        {
          pages: [
            { page: "api-demo/overview", icon: "globe" },
            { page: "api-demo/quickstart", icon: "lightbulb" },
          ],
        },
        { schema: "./openapi-demo.json" },
      ],
    },
  ],
  footer: {
    github: "https://github.com/heyo-sh/heyo-docs",
    website: "https://heyo.sh",
  },
  branding: { name: "Heyo Docs", logo: "/logo.svg" },
});
