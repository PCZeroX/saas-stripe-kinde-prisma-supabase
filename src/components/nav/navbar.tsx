import Link from "next/link";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "@/components/nav/user-nav";

export const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isAuth = await isAuthenticated();
  const user = await getUser();

  return (
    <nav className="bg-background">
      <div className="container flex items-center justify-between h-[10vh] border-b">
        <Link href="/">
          <h1 className="font-bold text-3xl">
            PCZeroX<span className="text-primary">SaaS</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />
          {isAuth ? (
            <UserNav
              name={user?.given_name!}
              email={user?.email!}
              image={user?.picture!}
            />
          ) : (
            <>
              <LoginLink>
                <Button>Sign In</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary">Sign Up</Button>
              </RegisterLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
