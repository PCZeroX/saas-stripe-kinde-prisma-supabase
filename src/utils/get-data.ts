import { unstable_noStore as noStore } from "next/cache";

import { prisma } from "@/lib/prisma";

export const getData = async ({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
}) => {
  noStore();

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      stripe_customer_id: true,
    },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;

    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
      },
    });
  }
};
