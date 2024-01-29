"use client";

import { FC, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";
import { Button } from "../ui/Button";
import UploadDropzone from "./UploadDropzone";
import { UploadButtonProps } from "@/interfaces/components/file-upload/UploadButtonProps";

const UploadButton: FC<UploadButtonProps> = ({ isSubscribed }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone isSubscribed={false} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
