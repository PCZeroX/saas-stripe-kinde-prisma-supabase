import { unstable_noStore as noStore } from "next/cache";

import { prisma } from "@/lib/prisma";

export const getUserByIdFromSubscription = async (userId: string) => {
  noStore();

  const data = await prisma.subscription.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripe_customer_id: true,
        },
      },
    },
  });

  return data;
};
