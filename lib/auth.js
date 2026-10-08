import NaverProvider from "next-auth/providers/naver";

export const loginReady = Boolean(
  process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET && process.env.NEXTAUTH_SECRET
);

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: loginReady ? [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      checks: ["state"],
      profile({ response }) {
        return {
          id: response.id,
          name: response.nickname || response.name || "회원",
          email: response.email || null,
          image: response.profile_image || null,
        };
      },
    }),
  ] : [],

  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },

  pages: { signIn: "/", error: "/" },
};
