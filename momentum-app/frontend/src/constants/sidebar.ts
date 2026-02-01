import { CheckSquare, FileText, Inbox, Tags } from "lucide-react";

export const SIDEBAR_ITEMS = [
  { id: "notes", label: "Notes", icon: FileText },
  { id: "tags", label: "Tags", icon: Tags },
  // { id: "tasks", label: "Tasks", icon: CheckSquare },
  // { id: "inbox", label: "Inbox", icon: Inbox },
];

export const TIME_DATA = [
  { label: "Never", value: "never" },
  { label: "7 Minutes(for test)", value: "420000" },
  { label: "1 Hour", value: "3600000" },
  { label: "6 Hours", value: "21600000" },
  { label: "24 Hours", value: "86400000" },
  { label: "7 Days", value: "604800000" },
  { label: "30 Days", value: "2592000000" },
];
