'use server';

import { z } from "zod";
import { resend } from "@/lib/resend";
import { getFooterEmailTemplate } from "./templates/footer-email-template";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  message: z.string().min(5).max(500),
});

type State = {
  success: boolean;
  error?: string;
};

export async function sendFooterEmail(
  _: unknown,
  formData: FormData
): Promise<State> {
  // Honeypot (bot trap)
  if (formData.get("company")) {
    return { success: true };
  }

  const rawData = {
    email: formData.get("email"),
    message: formData.get("message"),
  };

  // Normalize FormData → string
  const data = {
    email: typeof rawData.email === "string" ? rawData.email : "",
    message: typeof rawData.message === "string" ? rawData.message : "",
  };

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid input",
    };
  }

  const { email, message } = parsed.data;

  try {
    const htmlContent = getFooterEmailTemplate(email, message);

    await resend.emails.send({
      from: "Portfolio <hello@thuyamyint.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      replyTo: email,
      subject: "New Portfolio Inquiry",
      text: `Sender: ${email}\n\nMessage:\n${message}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Failed to send email",
    };
  }
}
