"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex gap-2 items-center">
        <Image
          src="https://img.icons8.com/arcade/128/design.png"
          alt="logo"
          width={40}
          height={40}
        />
        <h2 className="text-xl font-semibold">Airtistub</h2>
      </div>
      <ul className="flex gap-10 items-center text-lg">
        <li className="hover:text-primary cursor-pointer">Home</li>
        <li className="hover:text-primary cursor-pointer">Pricing</li>
      </ul>
      {!user ? (
        <>
          <SignInButton mode="modal">
            <Button className="bg-primary text-white">Get Started</Button>
          </SignInButton>
        </>
      ) : (
        <UserButton />
      )}
    </div>
  );
};

export default Header;
