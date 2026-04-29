import { decrypt } from "./auth";

export async function auth() {
  const { cookies } = await import("next/headers");
  const session = cookies().get("session")?.value;
  if (!session) return { userId: null, sessionClaims: null };

  try {
    const payload = await decrypt(session);
    return {
      userId: payload.user.id,
      sessionClaims: {
        metadata: {
          role: payload.user.role.toLowerCase(),
        },
      },
    };
  } catch (error) {
    return { userId: null, sessionClaims: null };
  }
}
