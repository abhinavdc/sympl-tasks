import { Button, Text } from "@chakra-ui/react";
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

export default function DeleteConfirmation({
  open,
  onClose,
  onConfirm,
  itemId,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
  itemId: number | null;
}) {
  return (
    <DialogRoot
      size="xs"
      lazyMount
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>Are you sure you want to delete?</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={() => {
              if (itemId) onConfirm(itemId);
            }}
          >
            Save
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
