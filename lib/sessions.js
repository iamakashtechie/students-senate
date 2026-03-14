import crypto from "crypto";

const SESSION_TTL = 2 * 60 * 60 * 1000; // 2 hours

// use SESSION_SECRET from env, fall back to ADMIN_KEY
function getSecret() {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_KEY;
  if (!secret) throw new Error("SESSION_SECRET or ADMIN_KEY env var is required");
  return secret;
}

// create a signed token: base64(payload).base64(signature)
export function createSessionToken() {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL });
  const payloadB64 = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${signature}`;
}

// validate a signed token — returns true if signature matches and not expired
export function validateSessionToken(token) {
  if (!token || !token.includes(".")) return false;

  const [payloadB64, signature] = token.split(".");

  // verify signature
  const expectedSig = crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest("base64url");

  if (signature !== expectedSig) return false;

  // check expiry
  try {
    const { exp } = JSON.parse(Buffer.from(payloadB64, "base64url").toString());
    if (Date.now() > exp) return false;
  } catch {
    return false;
  }

  return true;
}

// keep old names as aliases for backward compatibility
export const createSession = createSessionToken;
export const validateSession = validateSessionToken;
export function deleteSession() {
  // no-op: stateless tokens are invalidated by clearing the cookie
}
