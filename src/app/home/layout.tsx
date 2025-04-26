import authOptions from "@app/api/auth/[...nextauth]/options";
import { ThemedLayoutV2 } from "@components/layout";
import { AppLayout } from "@components/layout/AppLayout";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.session?.user) {
    return redirect("/login");
  }

  return <AppLayout>{children}</AppLayout>;
}

async function getData() {
  const session = await getServerSession(authOptions);
  return {
    session,
  };
}
