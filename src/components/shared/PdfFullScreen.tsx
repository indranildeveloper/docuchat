"use client";

import { FC, useState } from "react";
import SimpleBar from "simplebar-react";
import { Document, Page } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import { Expand, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { useToast } from "@/hooks/useToast";
import { PdfFullScreenProps } from "@/interfaces/components/shared/PdfFullScreenProps";

const PdfFullScreen: FC<PdfFullScreenProps> = ({ fileUrl }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number | undefined>(undefined);

  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button aria-label="full screen" variant="ghost" className="gap-1.5">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-7xl">
        <SimpleBar autoHide={false} className="mt-6 max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={() => {
                toast({
                  title: "Error Loading PDF",
                  description: "Please try again later",
                  variant: "destructive",
                });
              }}
              file={fileUrl}
              className="max-h-full"
            >
              {new Array(numPages).fill(0).map((_, idx) => (
                <Page key={idx} pageNumber={idx + 1} width={width ?? 1} />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullScreen;
