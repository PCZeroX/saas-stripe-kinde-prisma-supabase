import { unstable_noStore as noStore } from "next/cache";

import { prisma } from "@/lib/prisma";

export const getUserById = async (userId: string) => {
  noStore();

  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      color_scheme: true,
    },
  });

  return data;
};
