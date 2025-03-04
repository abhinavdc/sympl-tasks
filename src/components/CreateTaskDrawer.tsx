import { useEffect, useRef, useState } from "react";
import {
  Button,
  createListCollection,
  Field,
  FieldRequiredIndicator,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useTaskStore } from "../data/store";
import { CustomFieldDefinition, Errors, Priority, Status } from "@/data/types";
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
import { z, ZodRawShape } from "zod";
import { Checkbox } from "./ui/checkbox";

const createCustomFieldSchema = (definitions: CustomFieldDefinition[]) => {
  const schemaObject: ZodRawShape = definitions.reduce((acc, { key, type }) => {
    let fieldSchema;
    if (type === "text") {
      fieldSchema = z.string().min(1, "Required");
    } else if (type === "number") {
      fieldSchema = z.number().min(0, "Must be a positive number");
    } else {
      fieldSchema = z.boolean();
    }
    (acc as ZodRawShape)[key] = fieldSchema;
    return acc;
  }, {});

  return z.object(schemaObject);
};

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
  const { addTask, customFieldDefinitions } = useTaskStore();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(Priority.None);
  const [status, setStatus] = useState(Status.NotStarted);
  const [customFields, setCustomFields] = useState<
    Record<string, string | number | boolean>
  >({});
  const [errors, setErrors] = useState<Errors>({
    title: "",
    priority: "",
    status: "",
    customFields: {},
  });

  const customFieldSchema = createCustomFieldSchema(customFieldDefinitions);

  const taskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    priority: z.nativeEnum(Priority, {
      errorMap: () => ({ message: "Invalid priority" }),
    }),
    status: z.nativeEnum(Status, {
      errorMap: () => ({ message: "Invalid status" }),
    }),
    customFields: customFieldSchema,
  });

  const handleSubmit = () => {
    const result = taskSchema.safeParse({
      title,
      priority,
      status,
      customFields,
    });
    if (!result.success) {
      const fieldErrors = result.error.format();

      setErrors({
        title: fieldErrors.title?._errors[0] ?? "",
        priority: fieldErrors.priority?._errors[0] ?? "",
        status: fieldErrors.status?._errors[0] ?? "",
        customFields: Object.fromEntries(
          Object.entries(fieldErrors.customFields ?? {}).map(([key, value]) => [
            key,
            (
              value as {
                _errors?: string[];
              }
            )._errors?.[0] ?? "",
          ])
        ),
      });
      return;
    }
    addTask({ title, priority, status });
    setOpen(false);
    setTitle("");
    setPriority(Priority.None);
    setStatus(Status.NotStarted);
    setErrors({ title: "", priority: "", status: "", customFields: {} });
  };

  const contentRef = useRef<HTMLDivElement>(null);

  const handleCustomFieldChange = (
    key: string,
    value: string | number | boolean
  ) => {
    setCustomFields((prev) => ({ ...prev, [key]: value }));
  };

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
              <Field.Root required invalid={!!errors.title}>
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
                <Field.ErrorText>{errors.title}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.status}>
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
                <Field.ErrorText>{errors.status}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.priority}>
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
                <Field.ErrorText>{errors.priority}</Field.ErrorText>
              </Field.Root>

              {customFieldDefinitions.map(({ key, label, type }) => (
                <Field.Root key={key} invalid={!!errors.customFields[key]}>
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
                  <Field.ErrorText>{errors.customFields[key]}</Field.ErrorText>
                </Field.Root>
              ))}
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
