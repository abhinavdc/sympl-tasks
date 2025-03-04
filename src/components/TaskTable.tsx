import DataTable, { ColumnDef } from "./DataTable";
import { Task } from "@/data/types";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import CreateTaskDrawer from "./CreateTaskDrawer";
import { Button, HStack, IconButton } from "@chakra-ui/react";
import { useTaskStore } from "@/data/store";
import { LuPencil, LuTrash } from "react-icons/lu";
import DeleteConfirmation from "./DeleteConfirmation";
import { useState } from "react";
import { toaster } from "./ui/toaster";
import { PriorityOptions, StatusOptions } from "@/data/constants";

export default function TaskTable() {
  const { tasks, deleteTask } = useTaskStore();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [markedDeleteItem, setMarkedDeleteItem] = useState<number | null>(null);
  const [markedEditItem, setMarkedEditItem] = useState<Task | null>(null);

  const columns: ColumnDef<Task>[] = [
    {
      accessor: "title",
      title: "Task",
      width: "50%",
      sortable: true,
      filterable: true,
      filterType: "text",
    },
    {
      accessor: "priority",
      title: "Priority",
      render: (item: Task) => {
        return <PriorityBadge priority={item.priority} />;
      },
      width: "20%",
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: PriorityOptions,
    },
    {
      accessor: "status",
      title: "Status",
      render: (item: Task) => {
        return <StatusBadge status={item.status} />;
      },
      width: "20%",
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: StatusOptions,
    },
    {
      title: "Actions",
      render: (item: Task) => (
        <HStack>
          <IconButton
            variant="ghost"
            aria-label="Edit Task"
            size="xs"
            onClick={() => {
              handleEdit(item);
            }}
          >
            <LuPencil />
          </IconButton>
          <IconButton
            variant="ghost"
            aria-label="Delete Task"
            size="xs"
            colorScheme="red"
            onClick={() => {
              handleDelete(item.id);
            }}
          >
            <LuTrash />
          </IconButton>
        </HStack>
      ),
      width: "10%",
    },
  ];

  function deleteItem(itemId: number): void {
    deleteTask(itemId);
    setOpenConfirmation(false);
    toaster.create({
      title: `Successfuly remove task`,
      type: "success",
    });
  }

  function cancelDelete(): void {
    setMarkedDeleteItem(null);
    setOpenConfirmation(false);
  }

  function handleDelete(itemId: number): void {
    setMarkedDeleteItem(itemId);
    setOpenConfirmation(true);
  }

  function handleEdit(item: Task): void {
    setMarkedEditItem(item);
    setOpenDrawer(true);
  }

  function handleCreate(): void {
    setMarkedEditItem(null);
    setOpenDrawer(true);
  }

  return (
    <>
      <DataTable columns={columns} items={tasks}>
        <Button variant="outline" size="sm" onClick={handleCreate}>
          Create Task
        </Button>
      </DataTable>

      <CreateTaskDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        task={markedEditItem}
      />
      <DeleteConfirmation
        open={openConfirmation}
        onClose={cancelDelete}
        itemId={markedDeleteItem}
        onConfirm={deleteItem}
      />
    </>
  );
}
