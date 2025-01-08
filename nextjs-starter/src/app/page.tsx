"use client";
import { decodeToken, getToken } from "@/lib/auth";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const { toast } = useToast();

  function getUser() {
    const token = getToken();
    if (token) {
      return decodeToken(token);
    }
    return null;
  }

  function checkVerified(user: any) {
    if (user && !user.isVerified) {
      toast({
        title: "Your account is unverified",
        description: "Go to your profile to verify your account",
      });
    }
  }

  useEffect(() => {
    const user = getUser();
    if (user) {
      setIsVerified(user.isVerified);
      checkVerified(user);
    }
  }, []);

  return (
    <div>
      <Header />
      <h1>Page</h1>
    </div>
  );
}
