// in-memory session store: token -> expiresAt
// attached to globalThis so it survives HMR re-evaluation in development
const sessions = globalThis.__sessions || (globalThis.__sessions = new Map());
const SESSION_TTL = 2 * 60 * 60 * 1000; // 2 hours

export function createSession() {
  const token = crypto.randomUUID();
  sessions.set(token, Date.now() + SESSION_TTL);
  return token;
}

export function validateSession(token) {
  if (!token) return false;
  const expiresAt = sessions.get(token);
  if (!expiresAt) return false;
  if (Date.now() > expiresAt) {
    sessions.delete(token);
    return false;
  }
  return true;
}

export function deleteSession(token) {
  sessions.delete(token);
}
