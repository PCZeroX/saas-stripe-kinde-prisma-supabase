import { unstable_noStore as noStore } from "next/cache";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

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

  if (!user?.stripe_customer_id) {
    const data = await stripe.customers.create({
      email: email,
    });

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        stripe_customer_id: data.id,
      },
    });
  }
};
