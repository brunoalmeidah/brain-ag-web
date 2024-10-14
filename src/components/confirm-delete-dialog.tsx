import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface IProps {
  children: React.ReactNode;
  onConfirmDialog: () => void;
}
export function ConfirmDeleteDialog({ children, onConfirmDialog }: IProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir</DialogTitle>
        </DialogHeader>
        <p>Deseja realmente excluir?</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          </DialogClose>
          <Button onClick={onConfirmDialog}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
