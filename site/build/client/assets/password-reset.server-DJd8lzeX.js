import "litefs-js";
import { ensurePrimary } from "litefs-js/remix";
import { h as getDomainUrl, q as isResponse } from "./misc-CQO4K9rH.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { a as sendPasswordResetEmail } from "./send-email.server-ClI4Nqgs.js";
import { b as createVerification } from "./verification.server-37ZpL8eZ.js";
async function createAndSendPasswordResetVerificationEmail({
  emailAddress,
  team,
  request
}) {
  const domainUrl = getDomainUrl(request);
  let verificationId = null;
  try {
    const { verification, code } = await createVerification({
      type: "PASSWORD_RESET",
      target: emailAddress
    });
    verificationId = verification.id;
    const verificationUrl = new URL("/reset-password", domainUrl);
    verificationUrl.searchParams.set("verification", verification.id);
    verificationUrl.searchParams.set("code", code);
    await sendPasswordResetEmail({
      emailAddress,
      verificationCode: code,
      verificationUrl: verificationUrl.toString(),
      domainUrl,
      team
    });
  } catch (error) {
    if (isResponse(error)) throw error;
    if (verificationId) {
      try {
        await ensurePrimary();
        await prisma.verification.delete({ where: { id: verificationId } });
      } catch (cleanupError) {
        console.error(
          "Failed to cleanup verification after password reset email failure",
          cleanupError
        );
      }
    }
    console.error("Failed to send password reset email", error);
  }
}
export {
  createAndSendPasswordResetVerificationEmail as c
};
