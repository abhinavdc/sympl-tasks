import {
  Box,
  Button,
  createListCollection,
  Field,
  HStack,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "./ui/dialog";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { LuPlus, LuTrash } from "react-icons/lu";
import { useTaskStore } from "@/data/store";
import { Checkbox } from "./ui/checkbox";
import { CustomFieldDefinition } from "@/data/types";
import { generateUniqueId } from "@/helpers/stringHelper";

// Predefined field types
const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "checkbox", label: "Checkbox" },
];

// Non-removable default fields
const DEFAULT_FIELDS = ["title", "priority", "status"];

export default function AddCustomFields({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { customFieldDefinitions, setCustomFieldDefinitions } = useTaskStore();
  const contentRef = useRef<HTMLDivElement>(null);

  const [customFields, setCustomFields] = useState(customFieldDefinitions);

  useEffect(() => {
    setCustomFields(customFieldDefinitions);
  }, [customFieldDefinitions]);

  const FIELD_TYPES_OPTIONS = useMemo(
    () =>
      createListCollection({
        items: FIELD_TYPES,
      }),
    []
  );

  // Add a new custom field
  const handleAddField = () => {
    const newField: CustomFieldDefinition = {
      label: `Field ${String(customFields.length + 1)}`,
      type: "text",
      required: false,
      key: generateUniqueId(),
    };
    setCustomFields([...customFields, newField]);
  };

  // Remove a custom field
  const handleRemoveField = (indexToRemove: number) => {
    setCustomFields(customFields.filter((_, index) => index !== indexToRemove));
  };

  // Update field name or type
  const handleFieldChange = (
    index: number,
    key: string,
    value: string | boolean
  ) => {
    const updatedFields = [...customFields];
    updatedFields[index] = {
      ...updatedFields[index],
      [key]: value,
    };
    setCustomFields(updatedFields);
  };

  // Save changes and close modal
  const handleSave = () => {
    setCustomFieldDefinitions(customFields);
    onClose();
  };

  return (
    <DialogRoot
      size="lg"
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
    >
      <DialogContent ref={contentRef}>
        <DialogHeader>
          <DialogTitle>Add/Modify Custom Fields</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4} align="stretch">
            {customFields.map((field, index) => (
              // eslint-disable-next-line react-x/no-array-index-key
              <HStack key={index} gap={3}>
                <Field.Root flex={1} h="66px" alignItems="center">
                  <Field.Label>Required</Field.Label>

                  <Checkbox
                    checked={field.required}
                    onCheckedChange={(e) => {
                      handleFieldChange(index, "required", e.checked);
                    }}
                    flex={1}
                    size="lg"
                  />
                </Field.Root>
                <Field.Root flex={4}>
                  <Field.Label>Field Name</Field.Label>
                  <Input
                    value={field.label}
                    onChange={(e) => {
                      handleFieldChange(index, "label", e.target.value);
                    }}
                    placeholder="Enter field name"
                  />
                </Field.Root>

                <Field.Root flex={2}>
                  <Field.Label>Field Type</Field.Label>
                  <SelectRoot
                    collection={FIELD_TYPES_OPTIONS}
                    value={[field.type]}
                    onValueChange={(data) => {
                      handleFieldChange(index, "type", data.value[0]);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select type" />
                    </SelectTrigger>

                    <SelectContent
                      portalRef={contentRef as React.RefObject<HTMLElement>}
                    >
                      {FIELD_TYPES_OPTIONS.items.map((type) => (
                        <SelectItem item={type} key={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field.Root>

                <IconButton
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => {
                    handleRemoveField(index);
                  }}
                  disabled={DEFAULT_FIELDS.includes(field.label)}
                  aria-label="Remove field"
                  mt={6}
                >
                  <LuTrash />
                </IconButton>
              </HStack>
            ))}
          </VStack>
          <Box mt={4} ml={2}>
            <Button
              onClick={handleAddField}
              colorScheme="green"
              variant="outline"
            >
              <LuPlus />
              Add Custom Field
            </Button>
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
