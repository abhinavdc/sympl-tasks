import { tasks } from "@/data/mock";
import DataTable, { ColumnDef } from "./DataTable";
import { Task } from "@/data/types";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

const columns: ColumnDef<(typeof tasks)[number]>[] = [
  {
    accessor: "title",
    title: "Task",
  },
  {
    accessor: "priority",
    title: "Priority",
    render: (item: Task) => {
      return <PriorityBadge priority={item.priority} />;
    },
  },
  {
    accessor: "status",
    title: "Status",
    render: (item: Task) => {
      return <StatusBadge status={item.status} />;
    },
  },
  {
    accessor: "title",
    title: "Task",
  },
];

export default function TaskTable() {
  return (
    <>
      <DataTable columns={columns} items={tasks} />
    </>
  );
}
