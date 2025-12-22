import { CheckSquare, FileText, Inbox, Tags } from "lucide-react";

export const SIDEBAR_ITEMS = [
  { id: "notes", label: "Notes", icon: FileText },
  { id: "tags", label: "Tags", icon: Tags },
  // { id: "tasks", label: "Tasks", icon: CheckSquare },
  // { id: "inbox", label: "Inbox", icon: Inbox },
];

export const TIME_DATA = [
  { label: "Never", value: "never" },
  { label: "1 gün", value: "oneDay" },
  { label: "3 gün", value: "three days" },
  { label: "1 həftə", value: "oneWeek" },
];
