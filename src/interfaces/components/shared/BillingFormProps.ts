import { getUserSubscriptionPlan } from "@/lib/stripe";

export interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}
