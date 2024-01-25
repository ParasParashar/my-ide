"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

type props = {
  href: string;
};
const RouteButton = ({ href }: props) => {
  const { userId } = useAuth();
  if (userId) {
    redirect("/code");
  } else {
    return (
      <Button size={"lg"} className="text-lg">
        <SignInButton> 👤 Sign in to continue</SignInButton>
      </Button>
    );
  }
};

export default RouteButton;
