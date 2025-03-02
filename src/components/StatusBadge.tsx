import { Status } from "@/data/types";
import { toHumanReadable } from "@/helpers/stringHelper";
import { Badge } from "@chakra-ui/react";

const STATUS_COLORS: Record<Status, string> = {
  [Status.Completed]: "green",
  [Status.InProgress]: "yellow",
  [Status.NotStarted]: "gray",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant="subtle" colorPalette={STATUS_COLORS[status]}>
      {toHumanReadable(status)}
    </Badge>
  );
}
