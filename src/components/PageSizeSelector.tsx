import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";

const pageSizes = createListCollection({
  items: [
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "50", value: "50" },
    { label: "500", value: "500" },
  ],
});

export default function PageSizeSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
console.log("value", value)
  return (
    <SelectRoot
      collection={pageSizes}
      w="100px"
      position="absolute"
      left="30px"
      value={[String(value)]}
      onValueChange={(data) => {
        onChange(+data.value[0]);
      }}
    >
      <SelectTrigger>
        <SelectValueText />
      </SelectTrigger>
      <SelectContent>
        {pageSizes.items.map((size) => (
          <SelectItem item={size} key={size.value}>
            {size.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
