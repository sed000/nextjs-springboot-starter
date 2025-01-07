"use client";
import { Button } from "@/components/ui/button";
import { checkAuth, getToken, logout } from "@/lib/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(null)
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  }
  useEffect(() => {
    setIsLoggedIn(checkAuth());
  }, []);
  return (
    <div className="flex justify-between p-4 border-b-2 items-center">
      <h1 className="text-3xl font-bold">
        <Link href={"/"}>Title</Link>
      </h1>
      <ul className="flex gap-3 items-center">
        <li>About?</li>
        <li>
          {isLoggedIn ? (
            <div>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button onClick={() => {}}>
                <Link href={"/auth"}>Sign In</Link>
              </Button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
