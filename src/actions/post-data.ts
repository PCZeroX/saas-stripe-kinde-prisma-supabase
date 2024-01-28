"use server";

import { revalidatePath } from "next/cache";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

import { prisma } from "@/lib/prisma";

export const postData = async (formData: FormData, user: KindeUser) => {
  const name = formData.get("name") as string;
  const colorScheme = formData.get("color_scheme") as string;

  await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      name: name,
      color_scheme: colorScheme,
    },
  });

  revalidatePath("/", "layout");
};
