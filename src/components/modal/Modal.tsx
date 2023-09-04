import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ModalProps {
  text: string;
  className?: string;
  children: ReactNode;
}

const Modal = ({ text, className, children }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "group cursor-pointer overflow-hidden rounded-xl border-2 border-red bg-red py-2 text-2xl hover:border-white focus:border-white focus:outline-none",
            className,
          )}
        >
          {text}
        </button>
      </DialogTrigger>
      <DialogContent className="border-4 border-white bg-dark font-hand text-white ">
        <DialogHeader>{text}</DialogHeader>
        <DialogDescription>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
