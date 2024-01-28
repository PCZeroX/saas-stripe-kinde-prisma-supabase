import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export const getColor = async (userId: string) => {
  noStore();

  if (userId) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        color_scheme: true,
      },
    });

    return data;
  }
};
