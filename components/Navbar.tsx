import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

async function Navbar() {
  const user = await getServerSession(authOptions);

  console.log("usuario", user);
  return (
    <nav className="flex justify-between bg-zinc-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">NEXTAUTH</h1>

      <ul className="flex gap-x-2">
        {!user ? (
          <>
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/auth/login">LOGIN</Link>
            </li>
            <li>
              <Link href="/auth/register">REGISTER</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/dashboard">DASHBOARD</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
