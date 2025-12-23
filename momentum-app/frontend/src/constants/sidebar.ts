import { CheckSquare, FileText, Inbox, Tags } from "lucide-react";

export const SIDEBAR_ITEMS = [
  { id: "notes", label: "Notes", icon: FileText },
  { id: "tags", label: "Tags", icon: Tags },
  // { id: "tasks", label: "Tasks", icon: CheckSquare },
  // { id: "inbox", label: "Inbox", icon: Inbox },
];

export const TIME_DATA = [
  { label: "never", value: "never" },
  { label: "1 hour", value: "1hour" },
  { label: "3 days", value: "3days" },
  { label: "7 days", value: "7days" },
] as const


