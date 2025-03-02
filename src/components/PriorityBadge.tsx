import { Priority } from "@/data/types";
import { toHumanReadable } from "@/helpers/stringHelper";
import { Badge } from "@chakra-ui/react";

const STATUS_COLORS: Record<Priority, string> = {
  [Priority.Urgent]: "red",
  [Priority.High]: "red",
  [Priority.Medium]: "yellow",
  [Priority.None]: "gray",
  [Priority.Low]: "gray",
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge variant="surface" colorPalette={STATUS_COLORS[priority]}>
      {toHumanReadable(priority)}
    </Badge>
  );
}
