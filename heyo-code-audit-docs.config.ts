import { heyoDocs } from "@heyo-sh/heyo-docs/config";

export default heyoDocs({
  siteUrl: "https://heyo.sh/heyo-code-audit",
  title: "Heyo Code Audit",
  description: "Verified AI code reviews for GitHub pull requests.",
  content: "content/heyo-code-audit",
  theme: "grain",
  navigation: [
    { label: "Readme", href: "https://heyo.sh" },
    {
      label: "Marketplace",
      href: "https://github.com/marketplace/actions/heyo-code-audit",
    },
    { label: "GitHub", href: "https://github.com/heyo-sh/heyo-code-audit" },
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
          ],
        },
        {
          section: "Providers",
          icon: "code",
          pages: [
            "supported-providers",
            "providers/api-keys",
            "providers/github-copilot",
            "providers/openai-codex",
            "providers/amazon-bedrock",
          ],
        },
        {
          section: "Configuration",
          icon: "cursor",
          pages: ["configuration/inputs", "configuration/reporting"],
        },
        {
          section: "How it works",
          icon: "lightbulb",
          pages: [
            "how-it-works/audit-lifecycle",
            "how-it-works/incremental-audits",
            "how-it-works/safety",
          ],
        },
        {
          section: "Resources",
          icon: "book",
          pages: ["resources/troubleshooting"],
        },
      ],
    },
  ],
  footer: {
    github: "https://github.com/heyo-sh/heyo-code-audit",
    website: "https://github.com/marketplace/actions/heyo-code-audit",
  },
  branding: { name: "Heyo Code Audit", logo: "/logo.svg" },
});
