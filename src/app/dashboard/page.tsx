import { type FC } from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";

const DashboardPage: FC = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user?.id) return redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) return redirect("/auth-callback?origin=dashboard");

  return <div>{user?.email}</div>;
};

export default DashboardPage;
