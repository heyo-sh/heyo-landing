import { useState, type ReactNode } from "react";
import {
  Accordion,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Code,
  CodeBlock,
  Collapsible,
  Combobox,
  Command,
  CommandShortcut,
  CopyButton,
  DataTable,
  DatePicker,
  Dialog,
  Dropdown,
  Empty,
  Field,
  FieldDescription,
  FieldErrorMessage,
  FileUpload,
  Heading,
  Input,
  Kbd,
  KbdGroup,
  Label,
  Meter,
  NumberField,
  OtpField,
  Pagination,
  Popover,
  Radio,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Sheet,
  Sidebar,
  Skeleton,
  Slider,
  Spinner,
  Stat,
  StatGroup,
  StatusBar,
  StatusDot,
  Switch,
  Table,
  Tabs,
  Text,
  Textarea,
  Timeline,
  Toaster,
  Toggle,
  ToggleGroup,
  Tooltip,
  Tree,
  toast,
} from "@heyo-sh/heyo-ui";
import type { MdxComponents } from "@heyo-sh/heyo-docs/types";

import * as icons from "./heyo-ui-icons";

/**
 * Local state for an MDX preview.
 *
 * A controlled component — `Pagination`, `Calendar`, a selectable `Tree` —
 * cannot demonstrate itself inside a static document, and MDX has nowhere to
 * put a `useState`. This render prop supplies one without turning every such
 * example into a bespoke component.
 *
 * ```mdx
 * <HeyoUiState initial={1}>
 *   {(page, setPage) => <HeyoUiPagination page={page} onPageChange={setPage} />}
 * </HeyoUiState>
 * ```
 */
function HeyoUiState<Value>({
  initial,
  children,
}: {
  initial: Value;
  children: (value: Value, setValue: (value: Value) => void) => ReactNode;
}) {
  const [value, setValue] = useState(initial);
  return <>{children(value, setValue)}</>;
}

/**
 * `toast()` is a function call, not a component, so a documented example needs
 * a button to fire it and a `Toaster` to receive it. Both live here rather than
 * in the MDX, which keeps the published snippet identical to what an
 * application would actually write.
 */
function HeyoUiToastDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toaster />
      <Button onClick={() => toast("Settings saved")}>Default</Button>
      <Button
        onClick={() =>
          toast.success("Deployed", { description: "acme-api is live" })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.error("Deploy failed", {
            description: "Build step exited with code 1.",
            timeout: 0,
          })
        }
      >
        Error
      </Button>
      <Button
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1800)), {
            loading: "Deploying…",
            success: "Deployed",
            error: "Deploy failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  );
}

/**
 * Every heyo-ui export rendered by the component documentation, namespaced
 * with a `HeyoUi` prefix.
 *
 * The documentation theme already injects components of its own — `Button`,
 * `Badge`, `CodeBlock`, `Accordion`, `Tabs`, `Tree` among them — and an MDX
 * component map is flat, so an unprefixed registration would silently replace
 * the one the surrounding page relies on. The prefix only exists in this file
 * and in the preview markup; every snippet shown to a reader uses the real
 * name, exactly as it is imported from `@heyo-sh/heyo-ui`.
 */
export const heyoUiMdxComponents = {
  ...icons,
  HeyoUiState,
  HeyoUiToastDemo,
  HeyoUiAccordion: Accordion,
  HeyoUiAvatar: Avatar,
  HeyoUiAvatarGroup: AvatarGroup,
  HeyoUiBadge: Badge,
  HeyoUiBreadcrumb: Breadcrumb,
  HeyoUiButton: Button,
  HeyoUiButtonGroup: ButtonGroup,
  HeyoUiCalendar: Calendar,
  HeyoUiCard: Card,
  HeyoUiCardBody: CardBody,
  HeyoUiCardDescription: CardDescription,
  HeyoUiCardFooter: CardFooter,
  HeyoUiCardHeader: CardHeader,
  HeyoUiCardTitle: CardTitle,
  HeyoUiCheckbox: Checkbox,
  HeyoUiCode: Code,
  HeyoUiCodeBlock: CodeBlock,
  HeyoUiCollapsible: Collapsible,
  HeyoUiCombobox: Combobox,
  HeyoUiCommand: Command,
  HeyoUiCommandShortcut: CommandShortcut,
  HeyoUiCopyButton: CopyButton,
  HeyoUiDataTable: DataTable,
  HeyoUiDatePicker: DatePicker,
  HeyoUiDialog: Dialog,
  HeyoUiDropdown: Dropdown,
  HeyoUiEmpty: Empty,
  HeyoUiField: Field,
  HeyoUiFieldDescription: FieldDescription,
  HeyoUiFieldErrorMessage: FieldErrorMessage,
  HeyoUiFileUpload: FileUpload,
  HeyoUiHeading: Heading,
  HeyoUiInput: Input,
  HeyoUiKbd: Kbd,
  HeyoUiKbdGroup: KbdGroup,
  HeyoUiLabel: Label,
  HeyoUiMeter: Meter,
  HeyoUiNumberField: NumberField,
  HeyoUiOtpField: OtpField,
  HeyoUiPagination: Pagination,
  HeyoUiPopover: Popover,
  HeyoUiRadio: Radio,
  HeyoUiRadioGroup: RadioGroup,
  HeyoUiScrollArea: ScrollArea,
  HeyoUiSelect: Select,
  HeyoUiSeparator: Separator,
  HeyoUiSheet: Sheet,
  HeyoUiSidebar: Sidebar,
  HeyoUiSkeleton: Skeleton,
  HeyoUiSlider: Slider,
  HeyoUiSpinner: Spinner,
  HeyoUiStat: Stat,
  HeyoUiStatGroup: StatGroup,
  HeyoUiStatusBar: StatusBar,
  HeyoUiStatusDot: StatusDot,
  HeyoUiSwitch: Switch,
  HeyoUiTable: Table,
  HeyoUiTabs: Tabs,
  HeyoUiText: Text,
  HeyoUiTextarea: Textarea,
  HeyoUiTimeline: Timeline,
  HeyoUiToaster: Toaster,
  HeyoUiToggle: Toggle,
  HeyoUiToggleGroup: ToggleGroup,
  HeyoUiTooltip: Tooltip,
  HeyoUiTree: Tree,
} satisfies MdxComponents;
