import { Status, Priority, CustomFields } from "@/data/types";
import {
  VStack,
  Field,
  Input,
  Button,
  createListCollection,
} from "@chakra-ui/react";
import { Checkbox } from "./ui/checkbox";
import {
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "./ui/select";
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
} from "./ui/drawer";
import { useRef, useState } from "react";
import { PriorityOptions, StatusOptions } from "@/data/constants";
import { useTaskStore } from "@/data/store";
import { prefixObjectKeys } from "@/helpers/objectHelper";

export interface TaskFilter {
  title?: string;
  priority?: Priority | null;
  status?: Status | null;
  [key: string]: string | number | boolean | Priority | Status | null | undefined;
}

export default function TableFilterDrawer({
  openDrawer,
  setOpenDrawer,
  onApplyFilters,
}: {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  onApplyFilters: (filters: TaskFilter) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { customFieldDefinitions } = useTaskStore();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [customFields, setCustomFields] = useState<CustomFields>({});

  function resetAllFields() {
    setTitle("");
    setStatus(null);
    setPriority(null);
    setCustomFields({});
    onApplyFilters({});
    setOpenDrawer(false);
  }

  const handleCustomFieldChange = (
    key: string,
    value: string | number | boolean
  ) => {
    setCustomFields((prev) => ({ ...prev, [key]: value }));
  };

  const prioritySelectOptions = createListCollection({
    items: PriorityOptions,
  });

  const statusSelectOptions = createListCollection({
    items: StatusOptions,
  });

  const handleApplyFilters = () => {
    onApplyFilters({
      title,
      priority,
      status,
      ...prefixObjectKeys(customFields, "customFields.")
    });
    setOpenDrawer(false);
  };

  return (
    <DrawerRoot
      open={openDrawer}
      onOpenChange={(e) => {
        setOpenDrawer(e.open);
      }}
    >
      <DrawerBackdrop />
      <DrawerContent ref={contentRef}>
        <DrawerHeader>
          <DrawerTitle>Filter Tasks</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <VStack gap="4">
            <Field.Root>
              <Field.Label>Title</Field.Label>
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
                value={status ? [status] : []}
                onValueChange={(e) => {
                  setStatus(e.value[0] as Status);
                }}
                variant="outline"
              >
                <SelectLabel>Status</SelectLabel>
                <SelectTrigger clearable>
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
                value={priority ? [priority] : []}
                onValueChange={(e) => {
                  setPriority(e.value[0] as Priority);
                }}
                variant="outline"
              >
                <SelectLabel>Priority</SelectLabel>
                <SelectTrigger clearable>
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

            {customFieldDefinitions.map(({ key, label, type }) => (
              <Field.Root key={key}>
                <Field.Label>{label}</Field.Label>
                {type === "text" && (
                  <Input
                    value={(customFields[key] as string | number) || ""}
                    onChange={(e) => {
                      handleCustomFieldChange(key, e.target.value);
                    }}
                  />
                )}
                {type === "number" && (
                  <Input
                    type="number"
                    value={(customFields[key] as string | number) || ""}
                    onChange={(e) => {
                      handleCustomFieldChange(key, Number(e.target.value));
                    }}
                  />
                )}
                {type === "checkbox" && (
                  <Checkbox
                    checked={(customFields[key] as boolean) || false}
                    onCheckedChange={(e) => {
                      handleCustomFieldChange(key, e.checked);
                    }}
                  />
                )}
              </Field.Root>
            ))}
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                resetAllFields();
                setOpenDrawer(false);
              }}
            >
              Clear Filter
            </Button>
          </DrawerActionTrigger>
          <Button onClick={handleApplyFilters}>Apply Filter</Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
