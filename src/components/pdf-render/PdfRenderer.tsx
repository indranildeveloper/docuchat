"use client";

import { FC, useState } from "react";
import { z } from "zod";
import { Document, Page, pdfjs } from "react-pdf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
  X,
} from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import PdfFullScreen from "./PdfFullScreen";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { PdfRendererProps } from "@/interfaces/components/pdf-render/PdfRendererProps";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const PdfRenderer: FC<PdfRendererProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number | undefined>(undefined);
  const [currPage, setCurrPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== scale;

  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  const CustomPageValidator = z.object({
    page: z
      .string()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const handlePageSubmit = ({ page }: TCustomPageValidator): void => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };

  return (
    <div className="flex w-full flex-col items-center rounded-md bg-white shadow">
      <div className="flex h-14 w-full items-center justify-between border-b border-b-zinc-200 px-2">
        <div className="flex items-center gap-1.5">
          <Button
            aria-label="previous page"
            variant="ghost"
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("page", String(currPage - 1));
            }}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
              className={cn(
                "h-8 w-12",
                errors.page && "focus-visible:ring-red-500",
              )}
            />
            <p className="flex items-center space-x-1 text-sm text-zinc-700">
              <span>/</span>
              <span>{numPages ?? <X className="h-4 w-4" />}</span>
            </p>
          </div>

          <Button
            aria-label="next page"
            variant="ghost"
            disabled={numPages === undefined || currPage === numPages}
            onClick={() => {
              setCurrPage((prev) =>
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                prev + 1 > numPages! ? numPages! : prev + 1,
              );
              setValue("page", String(currPage + 1));
            }}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="zoom" variant="ghost" className="gap-1.5">
                <Search className="h-4 w-4" />
                {scale * 100}%<ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            aria-label="rotate 90 degrees"
            variant="ghost"
            onClick={() => setRotation((prev) => prev + 90)}
          >
            <RotateCw className="h-4 w-4" />
          </Button>

          <PdfFullScreen fileUrl={url} />
        </div>
      </div>

      <div className="max-h-screen w-full flex-1">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
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
              file={url}
              className="max-h-full"
            >
              {isLoading && renderedScale ? (
                <Page
                  key={"@" + renderedScale}
                  pageNumber={currPage}
                  width={width ?? 1}
                  scale={scale}
                  rotate={rotation}
                />
              ) : null}
              <Page
                key={"@" + scale}
                className={cn(isLoading ? "hidden" : "")}
                pageNumber={currPage}
                width={width ?? 1}
                scale={scale}
                rotate={rotation}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;
