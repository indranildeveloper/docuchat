"use client";

import { FC, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

const AuthCallBackPage: FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, error } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    router.push(origin ? `/${origin}` : "/dashboard");
  }

  if (error?.data?.code === "UNAUTHORIZED") {
    router.push("/sign-in");
  }

  return (
    <Suspense>
      <div className="mt-24 flex w-full justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <h3 className="text-xl font-semibold">Setting up your account...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    </Suspense>
  );
};

export default AuthCallBackPage;
