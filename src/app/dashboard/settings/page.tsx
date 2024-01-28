import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getUserById } from "@/utils/get-user-by-id";

import { postData } from "@/actions/post-data";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SubmitButton } from "@/components/buttons/submit-button";

const SettingsPage = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const data = await getUserById(user?.id!);

  const onSubmit = async (formData: FormData) => {
    "use server";
    await postData(formData, user!);
  };

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h2 className="text-3xl md:text-4xl">Settings</h2>
          <p className="text-lg text-muted-foreground">Your profile settings</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself. Please don't
              forget to save
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Your name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  defaultValue={data?.name!}
                />
              </div>
              <div className="space-y-1">
                <Label>Your email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="john.doe@gmail.com"
                  disabled
                  defaultValue={data?.email!}
                />
              </div>

              <div className="space-y-1">
                <Label>Color Scheme</Label>
                <Select name="color_scheme" defaultValue={data?.color_scheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SettingsPage;
