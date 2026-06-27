const SESSION_KEY = "ma_admin_session_v1";

export const ADMIN_CREDENTIALS = {
  email: "admin@multialmeida.com",
  password: "admin123",
};

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function loginAdmin(email, password) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const isValid =
    normalizedEmail === ADMIN_CREDENTIALS.email &&
    String(password || "") === ADMIN_CREDENTIALS.password;

  if (!isValid) {
    return {
      ok: false,
      message: "E-mail ou senha inválidos.",
    };
  }

  const session = {
    email: ADMIN_CREDENTIALS.email,
    role: "Administrador",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return {
    ok: true,
    session,
  };
}

export function getAdminSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  const session = safeJsonParse(raw, null);

  if (!session || typeof session !== "object" || !session.email) {
    return null;
  }

  return session;
}

export function isAdminAuthenticated() {
  return Boolean(getAdminSession());
}

export function logoutAdmin() {
  localStorage.removeItem(SESSION_KEY);
}
