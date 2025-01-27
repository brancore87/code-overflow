import Link from "next/link";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

import { auth, signOut } from "../../auth";

export default async function Home() {
  const session = await auth();

  console.log(session?.user);

  return (
    <>
      <h1 className="h1-bold absolute top-24 z-10">
        Welcome to the world of Next.js 15
      </h1>

      <form
        className="px-10 pt-[100px] text-center"
        action={async () => {
          "use server";

          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        {!session?.user ? (
          <Link href="/sign-in">Sign In</Link>
        ) : (
          <>
            <p>Welcome, {session.user.name}</p>
            <Button type="submit">Log out</Button>
          </>
        )}
      </form>
    </>
  );
}
