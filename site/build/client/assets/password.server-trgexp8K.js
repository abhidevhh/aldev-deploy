import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { f as fetchWithTimeout } from "./fetch-with-timeout.server-BL1zZ7UJ.js";
const BCRYPT_COST = 10;
const DUMMY_PASSWORD_HASH = "$2b$10$fvrjcVttSLHkz9k1tjMfqu9ADv42kasEph8Oi2UR0zQNC9h0svQyu";
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_BYTES = 72;
async function getPasswordHash(password) {
  return bcrypt.hash(password, BCRYPT_COST);
}
async function verifyPassword({
  password,
  hash
}) {
  return bcrypt.compare(password, hash);
}
function getPasswordHashParts(password) {
  const hash = crypto.createHash("sha1").update(password, "utf8").digest("hex").toUpperCase();
  return [hash.slice(0, 5), hash.slice(5)];
}
async function checkIsCommonPassword(password) {
  const [prefix, suffix] = getPasswordHashParts(password);
  try {
    const response = await fetchWithTimeout(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {},
      1e3
    );
    if (!response.ok) return false;
    const data = await response.text();
    return data.split(/\r?\n/).some((line) => {
      const [hashSuffix] = line.split(":");
      return hashSuffix === suffix;
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Request timeout") {
      console.warn("Password commonality check timed out");
      return false;
    }
    console.warn("Unknown error during password commonality check", error);
    return false;
  }
}
function getPasswordValidationError(password) {
  if (typeof password !== "string" || !password.length) {
    return "Password is required";
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }
  if (new TextEncoder().encode(password).length > PASSWORD_MAX_BYTES) {
    return `Password is too long (max ${PASSWORD_MAX_BYTES} bytes)`;
  }
  return null;
}
async function getPasswordStrengthError(password) {
  const basicError = getPasswordValidationError(password);
  if (basicError) return basicError;
  const isCommon = await checkIsCommonPassword(password);
  if (isCommon) {
    return "This password is too common. Please choose a different one.";
  }
  return null;
}
export {
  DUMMY_PASSWORD_HASH as D,
  getPasswordHash as a,
  getPasswordStrengthError as g,
  verifyPassword as v
};
//# sourceMappingURL=password.server-trgexp8K.js.map
