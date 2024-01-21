"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type props = {
  href: string;
};
const RouteButton = ({ href }: props) => {
  const router = useRouter();
  const { userId } = useAuth();
  const handleRoute = () => {
    router.push(href);
  };

  return (
    <Button size={"lg"} className="text-lg">
      {userId ? (
        <span onClick={handleRoute}>"✏️ Create Application"</span>
      ) : (
        <SignInButton> 👤 Sign in to continue</SignInButton>
      )}
    </Button>
  );
};

export default RouteButton;
