"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../../lib/auth";
import { markOnboardingComplete } from "../../lib/db";

export async function completeOnboarding() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "로그인이 만료되었어요. 다시 로그인해 주세요." };
  }

  try {
    await markOnboardingComplete(session.user.id);
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "완료 상태를 저장하지 못했어요. 다시 눌러 주세요." };
  }
}
