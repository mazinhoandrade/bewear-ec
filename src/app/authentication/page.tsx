import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
const Authentication = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return redirect("/");
  }
  return (
    <>
      <div className="flex w-full max-w-md flex-col gap-6 p-5 m-auto ">
        <Tabs defaultValue="sign-in">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar Conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignIn />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Authentication;
