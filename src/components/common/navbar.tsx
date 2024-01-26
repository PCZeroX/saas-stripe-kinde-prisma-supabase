import Link from "next/link";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="border-b bg-background">
      <div className="container flex items-center justify-between py-3">
        <Link href="/">
          <h1 className="font-bold text-3xl">
            PCZeroX<span className="text-primary">SaaS</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          <div className="flex items-center gap-x-5">
            <Button>Sign In</Button>
            <Button variant={"secondary"}>Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
