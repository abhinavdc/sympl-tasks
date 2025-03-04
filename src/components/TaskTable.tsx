import DataTable, { ColumnDef } from "./DataTable";
import { Task } from "@/data/types";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import Toolbar from "./Toolbar";
import CreateTaskDrawer from "./CreateTaskDrawer";
import { Flex } from "@chakra-ui/react";
import { useTaskStore } from "@/data/store";

const columns: ColumnDef<Task>[] = [
  {
    accessor: "title",
    title: "Task",
    width: "50%",
  },
  {
    accessor: "priority",
    title: "Priority",
    render: (item: Task) => {
      return <PriorityBadge priority={item.priority} />;
    },
    width: "25%",
  },
  {
    accessor: "status",
    title: "Status",
    render: (item: Task) => {
      return <StatusBadge status={item.status} />;
    },
    width: "25%",
  },
];

export default function TaskTable() {
  const { tasks } = useTaskStore();
  return (
    <>
      <Flex justifyContent="space-between" w="100%" py="2">
        <Toolbar />
        <CreateTaskDrawer />
      </Flex>
      <DataTable columns={columns} items={tasks} />
    </>
  );
}
