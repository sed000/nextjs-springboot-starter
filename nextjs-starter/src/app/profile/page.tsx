"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { decodeToken, getToken, logout, verify } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function MyProfile() {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const router = useRouter();
  function getUser() {
    const token = getToken();
    const user = decodeToken(token!);
    return user;
  }
  const user = getUser();
  async function handleVerify(verificationCode: string) {
    const response = verify(user.email, verificationCode);
    if (await response) {
      alert("Verification successful");
      logout();
      router.push("/");
    } else {
      alert("Verification failed");
    }
  }
  useEffect(() => {
    setIsVerified(user.isVerified);
  }, []);
  return (
    <div className="flex flex-col">
      <h1>User details: </h1>
      <ul>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>Email verified: {user.isVerified.toString()}</li>
        {}
      </ul>
      {!isVerified ? (
        <div className="flex flex-col gap-4 py-3">
          <h2>Check your email for verification code</h2>
          <div className="flex gap-4 py-2 items-center">
            <Label>Verification code:</Label>
            <Input
              className="w-fit"
              type="text"
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              className="w-fit"
              onClick={() => handleVerify(verificationCode)}
            >
              Verify
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
