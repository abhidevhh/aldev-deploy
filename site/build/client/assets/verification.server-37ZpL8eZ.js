import crypto from "node:crypto";
import bcrypt from "bcrypt";
import "litefs-js";
import { ensurePrimary } from "litefs-js/remix";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
const VERIFICATION_CODE_DIGITS = 6;
const VERIFICATION_CODE_MAX_AGE_MS = 1e3 * 60 * 10;
function generateVerificationCode() {
  const code = crypto.randomInt(0, Math.pow(10, VERIFICATION_CODE_DIGITS)).toString().padStart(VERIFICATION_CODE_DIGITS, "0");
  return code;
}
async function createVerification({
  type,
  target
}) {
  const code = generateVerificationCode();
  const codeHash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + VERIFICATION_CODE_MAX_AGE_MS);
  await ensurePrimary();
  const verification = await prisma.verification.create({
    data: {
      type,
      target,
      codeHash,
      expiresAt
    },
    select: { id: true, expiresAt: true, target: true, type: true }
  });
  return { verification, code };
}
async function consumeVerification({
  id,
  code,
  type
}) {
  const verification = await prisma.verification.findUnique({
    where: { id },
    select: {
      id: true,
      type: true,
      target: true,
      codeHash: true,
      expiresAt: true
    }
  });
  if (!verification) return null;
  if (verification.type !== type) return null;
  if (Date.now() > verification.expiresAt.getTime()) return null;
  const isValid = await bcrypt.compare(code, verification.codeHash);
  if (!isValid) return null;
  await ensurePrimary();
  try {
    await prisma.verification.delete({ where: { id: verification.id } });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return null;
    }
    throw error;
  }
  return { target: verification.target };
}
async function consumeVerificationForTarget({
  target,
  code,
  type
}) {
  const verification = await prisma.verification.findFirst({
    where: {
      target,
      type,
      expiresAt: { gt: /* @__PURE__ */ new Date() }
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      type: true,
      target: true,
      codeHash: true,
      expiresAt: true
    }
  });
  if (!verification) return null;
  const isValid = await bcrypt.compare(code, verification.codeHash);
  if (!isValid) return null;
  await ensurePrimary();
  try {
    await prisma.verification.delete({ where: { id: verification.id } });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return null;
    }
    throw error;
  }
  return { target: verification.target };
}
export {
  consumeVerificationForTarget as a,
  createVerification as b,
  consumeVerification as c
};
