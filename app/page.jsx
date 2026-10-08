import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions, loginReady } from "../lib/auth";
import { getOrCreateUser } from "../lib/db";
import MalangApp from "../components/MalangApp";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;

  if (session?.user) {
    const member = await getOrCreateUser(session.user.id);
    if (!member.onboarding_completed) redirect("/onboarding");
  }

  return (
    <MalangApp
      signedInUser={session?.user ?? null}
      isDemo={!session?.user && params.demo === "1"}
      loginReady={loginReady}
      error={params.error}
    />
  );
}
