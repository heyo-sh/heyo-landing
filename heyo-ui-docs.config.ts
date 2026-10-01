import { heyoDocs } from "@heyo-sh/heyo-docs/config";

export default heyoDocs({
  siteUrl: "https://heyo.sh/heyo-ui",
  title: "Heyo UI",
  description:
    "Flat, dense, developer-first React components. Semantic tokens, hairline rings, no dark: variants.",
  content: "content/heyo-ui",
  theme: "heyo",
  navigation: [
    { label: "Readme", href: "https://heyo.sh" },
    { label: "npm", href: "https://www.npmjs.com/package/@heyo-sh/heyo-ui" },
    { label: "GitHub", href: "https://github.com/heyo-sh/heyo-ui" },
  ],
  groups: [
    {
      group: "Documentation",
      icon: "globe",
      sections: [
        {
          pages: [
            { page: "introduction", icon: "book" },
            { page: "installation", icon: "lightbulb" },
            { page: "theming", icon: "sun" },
            { page: "icons", icon: "star" },
          ],
        },
        {
          section: "Layout",
          icon: "cursor",
          pages: [
            "components/accordion",
            "components/card",
            "components/scroll-area",
            "components/separator",
            "components/sidebar",
          ],
        },
        {
          section: "Forms",
          icon: "code",
          pages: [
            "components/field",
            "components/label",
            "components/input",
            "components/textarea",
            "components/number-field",
            "components/otp-field",
            "components/select",
            "components/combobox",
            "components/checkbox",
            "components/radio",
            "components/switch",
            "components/slider",
            "components/toggle",
            "components/calendar",
            "components/date-picker",
            "components/file-upload",
          ],
        },
        {
          section: "Actions",
          icon: "check",
          pages: [
            "components/button",
            "components/copy-button",
            "components/dropdown",
            "components/command",
          ],
        },
        {
          section: "Navigation",
          icon: "arrowRight",
          pages: [
            "components/tabs",
            "components/breadcrumb",
            "components/pagination",
            "components/tree",
          ],
        },
        {
          section: "Data display",
          icon: "folder",
          pages: [
            "components/table",
            "components/data-table",
            "components/stat",
            "components/timeline",
            "components/avatar",
            "components/status-bar",
          ],
        },
        {
          section: "Feedback",
          icon: "information",
          pages: [
            "components/badge",
            "components/meter",
            "components/empty",
            "components/skeleton",
            "components/spinner",
            "components/toast",
          ],
        },
        {
          section: "Overlays",
          icon: "chat",
          pages: [
            "components/dialog",
            "components/sheet",
            "components/popover",
            "components/tooltip",
          ],
        },
        {
          section: "Typography",
          icon: "file",
          pages: ["components/text", "components/kbd", "components/code-block"],
        },
        {
          section: "Resources",
          icon: "book",
          pages: ["utilities", "design-rules"],
        },
      ],
    },
  ],
  footer: {
    github: "https://github.com/heyo-sh/heyo-ui",
    website: "https://www.npmjs.com/package/@heyo-sh/heyo-ui",
  },
  branding: { name: "Heyo UI", logo: "/logo.svg" },
});
