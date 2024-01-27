import { redirect } from "next/navigation";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Button } from "@/components/ui/button";

const HomePage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (isAuth) {
    return redirect("/dashboard");
  }

  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <div className="space-y-8">
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">
                Sort your notes easily
              </span>
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight lg:text-6xl">
              Create Notes with ease
            </h1>

            <p className="max-w-xl mx-auto text-base lg:text-xl text-secondary-foreground">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et d
            </p>
          </div>

          <div className="flex justify-center max-w-sm mx-auto">
            <RegisterLink>
              <Button size="lg">Sign Up for free</Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
