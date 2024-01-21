"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Dropzone from "react-dropzone";
import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "../ui/Progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/useToast";
import { trpc } from "@/app/_trpc/client";

const UploadDropzone: FC = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { toast } = useToast();

  const { startUpload } = useUploadThing("pdfUploader");

  const { mutate: strartPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        } else {
          return prevProgress + 5;
        }
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onDrop={async (acceptedFiles) => {
        setIsUploading(true);
        const progressInterval = startSimulatedProgress();

        // handle the file uploading
        const res = await startUpload(acceptedFiles);

        if (!res) {
          return toast({
            title: "Something went wrong!",
            description: "Please try again later.",
            variant: "destructive",
          });
        }

        const [fileResponse] = res;
        const key = fileResponse?.key;

        if (!key) {
          return toast({
            title: "Something went wrong!",
            description: "Please try again later.",
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);
        strartPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="m-4 h-64 rounded-lg border border-dashed border-gray-300"
        >
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex  h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-zinc-500">PDF (upto 4MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-1 outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <File className="h-4 w-4 text-primary" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    value={uploadProgress}
                    indicatorColor={
                      uploadProgress === 100 ? "bg-emerald-600" : ""
                    }
                    className="h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                      <Loader2 className="h-3 w-3 animate-spin" />{" "}
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton: FC = () => {
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
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
