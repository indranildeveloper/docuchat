import { getUserSubscriptionPlan } from "@/lib/stripe";

export interface DashboardProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}
