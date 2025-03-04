import DataTable, { ColumnDef } from "./DataTable";
import { Task } from "@/data/types";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import CreateTaskDrawer from "./CreateTaskDrawer";
import {
  ActionBar,
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
  Button,
  HStack,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { useTaskStore } from "@/data/store";
import { LuPencil, LuPlus, LuTrash } from "react-icons/lu";
import DeleteConfirmation from "./DeleteConfirmation";
import { useState } from "react";
import { toaster } from "./ui/toaster";
import { PriorityOptions, StatusOptions } from "@/data/constants";
import EmptyState from "./EmptyState";

export default function TaskTable() {
  const { tasks, deleteTask, customFieldDefinitions } = useTaskStore();
  const [openTaskDrawer, setOpenTaskDrawer] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [markedDeleteItem, setMarkedDeleteItem] = useState<number[] | null>(
    null
  );
  const [markedEditItem, setMarkedEditItem] = useState<Task | null>(null);
  const [selection, setSelection] = useState<number[]>([]);

  const columns: ColumnDef<Task>[] = [
    {
      accessor: "title",
      title: "Task",
      width: "30%",
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
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: StatusOptions,
    },
    ...createCustomFieldColumns(),
    {
      title: "Actions",
      render: (item: Task) => (
        <HStack>
          <IconButton
            variant="ghost"
            aria-label={`Edit Task: ${item.title}`}
            size="xs"
            onClick={() => {
              handleEdit(item);
            }}
          >
            <LuPencil />
          </IconButton>
          <IconButton
            variant="ghost"
            aria-label={`Delete Task: ${item.title}`}
            size="xs"
            colorScheme="red"
            onClick={() => {
              handleDelete([item.id]);
            }}
          >
            <LuTrash />
          </IconButton>
        </HStack>
      ),
      width: "10%",
    },
  ];

  function createCustomFieldColumns(): ColumnDef<Task>[] {
    const columns: ColumnDef<Task>[] = customFieldDefinitions.map((x) => {
      return {
        accessor: `customFields.${x.key}`,
        title: x.label,
        sortable: true,
        filterable: true,
      };
    });
    return columns;
  }

  function deleteItem(itemIds: number[]): void {
    itemIds.forEach((itemId) => {
      deleteTask(itemId);
    });
    if (itemIds.length) setSelection([]);
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

  function handleDelete(itemId: number[]): void {
    setMarkedDeleteItem(itemId);
    setOpenConfirmation(true);
  }

  function handleEdit(item: Task): void {
    setMarkedEditItem(item);
    setOpenTaskDrawer(true);
  }

  function handleCreate(): void {
    setMarkedEditItem(null);
    setOpenTaskDrawer(true);
  }

  function handleBulkDelete() {
    handleDelete(selection);
  }

  return (
    <>
      {tasks.length ? (
        <DataTable
          columns={columns}
          items={tasks}
          selection={selection}
          setSelection={setSelection}
        >
          <Button variant="outline" size="sm" onClick={handleCreate}  aria-label="create a new task">
            Create Task
          </Button>
        </DataTable>
      ) : (
        <EmptyState>
          <Button variant="subtle" size="sm" onClick={handleCreate} aria-label="create a new task">
            <LuPlus />
            Get started by creating a task
          </Button>
        </EmptyState>
      )}

      <CreateTaskDrawer
        openDrawer={openTaskDrawer}
        setOpenDrawer={setOpenTaskDrawer}
        task={markedEditItem}
      />
      <DeleteConfirmation
        open={openConfirmation}
        onClose={cancelDelete}
        itemId={markedDeleteItem}
        onConfirm={deleteItem}
      />

      <ActionBarRoot open={selection.length > 0}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBarContent>
              <ActionBarSelectionTrigger>
                {selection.length} selected
              </ActionBarSelectionTrigger>
              <ActionBarSeparator />
              <Button variant="outline" size="sm" onClick={handleBulkDelete}>
                Delete
              </Button>
            </ActionBarContent>
          </ActionBar.Positioner>
        </Portal>
      </ActionBarRoot>
    </>
  );
}
