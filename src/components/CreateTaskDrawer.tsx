import { useRef, useState } from "react";
import {
  Button,
  createListCollection,
  Field,
  FieldRequiredIndicator,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useTaskStore } from "../data/store";
import { Priority, Status } from "@/data/types";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { toHumanReadable } from "@/helpers/stringHelper";

export default function CreateTaskDrawer() {
  const prioritySelectOptions = createListCollection({
    items: Object.values(Priority).map((option) => {
      return { label: toHumanReadable(option), value: option };
    }),
  });

  const statusSelectOptions = createListCollection({
    items: Object.values(Status).map((option) => {
      return { label: toHumanReadable(option), value: option };
    }),
  });

  const [open, setOpen] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(Priority.None);
  const [status, setStatus] = useState(Status.NotStarted);

  const handleSubmit = () => {
    if (!title.trim()) return;
    addTask({ title, priority, status });
    setOpen(false);
    setTitle("");
    setPriority(Priority.None);
    setStatus(Status.NotStarted);
  };

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <DrawerRoot
        open={open}
        onOpenChange={(e) => {
          setOpen(e.open);
        }}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            Create Task
          </Button>
        </DrawerTrigger>
        <DrawerContent ref={contentRef}>
          <DrawerHeader>
            <DrawerTitle>Create New Task</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <VStack gap="4">
              <Field.Root required>
                <Field.Label>
                  Title
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Field.Root>

              <Field.Root>
                <SelectRoot
                  collection={statusSelectOptions}
                  value={[status]}
                  onValueChange={(e) => {
                    setStatus(e.value[0] as Status);
                  }}
                  variant="outline"
                >
                  <SelectLabel>
                    Status
                    <FieldRequiredIndicator ml="1" />
                  </SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent
                    portalRef={contentRef as React.RefObject<HTMLElement>}
                  >
                    {statusSelectOptions.items.map((option) => (
                      <SelectItem item={option} key={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field.Root>

              <Field.Root>
                <SelectRoot
                  collection={prioritySelectOptions}
                  value={[priority]}
                  onValueChange={(e) => {
                    setPriority(e.value[0] as Priority);
                  }}
                  variant="outline"
                >
                  <SelectLabel>
                    Priority
                    <FieldRequiredIndicator ml="1" />
                  </SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent
                    portalRef={contentRef as React.RefObject<HTMLElement>}
                  >
                    {prioritySelectOptions.items.map((option) => (
                      <SelectItem item={option} key={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field.Root>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </DrawerActionTrigger>
            <Button onClick={handleSubmit}>Save</Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}
