"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

export default function LogoutPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex justify-center my-12">
      <Button onClick={() => handleSignOut()}>Logout</Button>
    </div>
  );
}
