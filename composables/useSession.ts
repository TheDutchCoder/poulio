// composables/useSession.ts
type SessionCookie = { id: string; name: string; email: string } | null;

export const useSession = () => {
  const sessionCookie = useCookie<SessionCookie>("wc2026_session", {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 60,
  });

  const user = useUser();

  const restore = () => {
    const s = sessionCookie.value;
    if (s?.id && s?.name) {
      user.value = { id: s.id, name: s.name, email: s.email || "", loggedIn: true };
    }
  };

  const login = (id: string, name: string, email: string) => {
    sessionCookie.value = { id, name, email };
    user.value = { id, name, email, loggedIn: true };
  };

  const logout = () => {
    sessionCookie.value = null;
    user.value = { id: "", name: "", email: "", loggedIn: false };
  };

  return { restore, login, logout };
};
