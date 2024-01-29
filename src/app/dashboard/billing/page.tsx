import { FC } from "react";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import BillingForm from "@/components/premium/BillingForm";

const BillingPage: FC = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return <BillingForm subscriptionPlan={subscriptionPlan} />;
};

export default BillingPage;
