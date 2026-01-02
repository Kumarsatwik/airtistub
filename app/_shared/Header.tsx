"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-4 relative z-10">
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
        <li>
          <Link
            href="/"
            className="hover:text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/pricing"
            className="hover:text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
          >
            Pricing
          </Link>
        </li>
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
