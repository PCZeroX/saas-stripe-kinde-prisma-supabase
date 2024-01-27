import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { DashboardNav } from "@/app/dashboard/_components/dashboard-nav";

import type { Metadata } from "next";
import { getData } from "@/utils/get-data";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  await getData({
    id: user.id,
    email: user.email!,
    firstName: user.given_name,
    lastName: user.family_name,
    profileImage: user.picture,
  });

  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
