import { FC } from "react";
import { notFound, redirect } from "next/navigation";
import { FileIdPageProps } from "@/interfaces/components/pages/FileIdPageProps";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";
import PdfRenderer from "@/components/pdf-render/PdfRenderer";
import ChatWrapper from "@/components/chat/ChatWrapper";

const FileIdPage: FC<FileIdPageProps> = async ({ params }) => {
  const { fileId } = params;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileId}`);

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
      <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        {/* Left side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer url={file.url} />
          </div>
        </div>

        <div className="flex-1 shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper fileId={file.id} />
        </div>
      </div>
    </div>
  );
};

export default FileIdPage;
