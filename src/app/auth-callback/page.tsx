"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { trpc } from "../_trpc/client";

const AuthCallBackPage: FC = () => {
  const router = useRouter();

  const { data, error } = trpc.authCallback.useQuery();

  if (data?.success) {
    router.push("/dashboard");
  }

  if (error?.data?.code === "UNAUTHORIZED") {
    router.push("/api/auth/login");
  }

  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="text-xl font-semibold">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default AuthCallBackPage;
