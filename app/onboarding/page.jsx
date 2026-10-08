import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { getOrCreateUser } from "../../lib/db";
import Onboarding from "../../components/Onboarding";

export const dynamic = "force-dynamic";

export default async function OnboardingPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const isDemo = !session?.user && params.demo === "1";

  if (!session?.user && !isDemo) redirect("/");

  if (session?.user) {
    const member = await getOrCreateUser(session.user.id);
    if (member.onboarding_completed) redirect("/");
  }

  return <Onboarding isDemo={isDemo} />;
}
