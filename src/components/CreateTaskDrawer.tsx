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
import {
  CustomFieldDefinition,
  CustomFields,
  CustomFieldSchemaType,
  Errors,
  Priority,
  Status,
  Task,
} from "@/data/types";
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
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { z, ZodRawShape } from "zod";
import { Checkbox } from "./ui/checkbox";
import { PriorityOptions, StatusOptions } from "@/data/constants";
import AddCustomFields from "./AddCustomFields";
import { LuPencil } from "react-icons/lu";
import { toaster } from "./ui/toaster";

function tranformCustomFieldErrors(
  fieldErrors: z.ZodFormattedError<{
    title: string;
    status: Status;
    priority: Priority;
    customFields: CustomFields;
  }>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(fieldErrors.customFields ?? {}).map(([key, value]) => [
      key,
      (
        value as {
          _errors?: string[];
        }
      )._errors?.[0] ?? "",
    ])
  );
}

const createCustomFieldSchema = (
  definitions: CustomFieldDefinition[]
): CustomFieldSchemaType => {
  const schemaObject: ZodRawShape = definitions.reduce(
    (acc, { key, type, required }) => {
      let fieldSchema;
      if (required) {
        if (type === "text") {
          fieldSchema = z.string().min(1, "Required");
        } else if (type === "number") {
          fieldSchema = z.number().min(0, "Must be a positive number");
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        } else if (type === "checkbox") {
          fieldSchema = z.boolean();
        }
        if (fieldSchema) (acc as ZodRawShape)[key] = fieldSchema;
      }
      return acc;
    },
    {}
  );

  return z.object(schemaObject);
};

function createTaskSchema(customFieldSchema: CustomFieldSchemaType) {
  return z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    priority: z.nativeEnum(Priority, {
      errorMap: () => ({ message: "Invalid priority" }),
    }),
    status: z.nativeEnum(Status, {
      errorMap: () => ({ message: "Invalid status" }),
    }),
    customFields: customFieldSchema,
  });
}

export default function CreateTaskDrawer({
  openDrawer,
  setOpenDrawer,
  task: prefillValue = null,
}: {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  task?: Task | null;
}) {
  const prioritySelectOptions = createListCollection({
    items: PriorityOptions,
  });

  const statusSelectOptions = createListCollection({
    items: StatusOptions,
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const { addTask, updateTask, customFieldDefinitions } = useTaskStore();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(Priority.None);
  const [status, setStatus] = useState(Status.NotStarted);
  const [customFields, setCustomFields] = useState<CustomFields>({});
  const [errors, setErrors] = useState<Errors>({
    title: "",
    priority: "",
    status: "",
    customFields: {},
  });
  const [openFieldDrawer, setOpenFieldDrawer] = useState(false);

  useEffect(() => {
    if (prefillValue) {
      setEditMode(true);
      setTitle(prefillValue.title);
      setStatus(prefillValue.status);
      setPriority(prefillValue.priority);
      setCustomFields(prefillValue.customFields);
    } else {
      setEditMode(false);
      resetAllFields();
    }
  }, [prefillValue]);

  function resetAllFields() {
    setTitle("");
    setStatus(Status.NotStarted);
    setPriority(Priority.None);
    setCustomFields({});
  }

  const [customFieldSchema, setCustomFieldSchema] = useState(
    createCustomFieldSchema(customFieldDefinitions)
  );

  useEffect(() => {
    setCustomFieldSchema(createCustomFieldSchema(customFieldDefinitions));
  }, [customFieldDefinitions]);

  const taskSchema = createTaskSchema(customFieldSchema);

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
        customFields: tranformCustomFieldErrors(fieldErrors),
      });
      return;
    }
    if (prefillValue?.id) {
      updateTask(prefillValue.id, { title, priority, status, customFields });
    } else {
      addTask({ title, priority, status, customFields });
    }
    setOpenDrawer(false);
    resetAllFields();
    setErrors({ title: "", priority: "", status: "", customFields: {} });
    toaster.create({
      title: `Successfuly added task`,
      type: "success",
    });
  };

  const handleCustomFieldChange = (
    key: string,
    value: string | number | boolean
  ) => {
    setCustomFields((prev) => ({ ...prev, [key]: value }));
  };

  function editFields() {
    setOpenDrawer(false);
    setTimeout(() => {
      setOpenFieldDrawer(true);
    }, 200);
  }

  return (
    <>
      <DrawerRoot
        open={openDrawer}
        onOpenChange={(e) => {
          setOpenDrawer(e.open);
        }}
        size="sm"
      >
        <DrawerBackdrop />
        <DrawerContent ref={contentRef}>
          <DrawerHeader>
            <DrawerTitle>
              {editMode ? "Edit Task" : "Create New Task"}
            </DrawerTitle>
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

              {customFieldDefinitions.map(({ key, label, type, required }) => (
                <Field.Root
                  key={key}
                  invalid={!!errors.customFields[key]}
                  required={required}
                >
                  <Field.Label>
                    {label}
                    <FieldRequiredIndicator ml="1" />
                  </Field.Label>
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

              <Button variant="plain" size="sm" onClick={editFields}>
                <LuPencil />
                Add/Modify Fields
              </Button>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setOpenDrawer(false);
                  resetAllFields();
                }}
              >
                Cancel
              </Button>
            </DrawerActionTrigger>
            <Button onClick={handleSubmit}>
              {editMode ? "Update" : "Save"}
            </Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>

      <AddCustomFields
        open={openFieldDrawer}
        onClose={() => {
          setOpenFieldDrawer(false);
        }}
      />
    </>
  );
}
