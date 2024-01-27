"use client";

import { FC } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { trpc } from "@/app/_trpc/client";

const UpgradeButton: FC = () => {
  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? "/dashboard/billing";
    },
  });

  return (
    <Button className="w-full" onClick={() => createStripeSession()}>
      Upgrade Now <ArrowRight className="ml-1.5 h-5 w-5" />
    </Button>
  );
};

export default UpgradeButton;
