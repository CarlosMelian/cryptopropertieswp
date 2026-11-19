import { NextResponse } from "next/server";
import { getPropertyBySlug } from "@/lib/properties";
import { propertyUrl } from "@/lib/site";
import type { ContactMethod, InquiryIntent } from "@/types";

/**
 * Receives property inquiries from the detail page form.
 *
 * Delivery: set INQUIRY_WEBHOOK_URL to any endpoint that accepts a JSON POST
 * (a CRM, Zapier/Make webhook, Slack incoming webhook, or your own service).
 * Without it, inquiries are only logged in development, and the endpoint
 * responds 503 in production so visitors are offered the email fallback
 * instead of a false confirmation.
 */

const intents: InquiryIntent[] = ["information", "crypto"];
const methods: ContactMethod[] = ["email", "phone", "whatsapp"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{6,30}$/;

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid request.");
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");

  // Honeypot: pretend success so bots don't retry.
  if (str("website")) return NextResponse.json({ ok: true });

  const fullName = str("fullName");
  const email = str("email");
  const phone = str("phone");
  const message = str("message");
  const intent = str("intent") as InquiryIntent;
  const preferredContact = str("preferredContact") as ContactMethod;
  const property = getPropertyBySlug(str("propertySlug"));

  if (fullName.length < 2 || fullName.length > 120) return bad("Please enter your full name.");
  if (!EMAIL_RE.test(email) || email.length > 200) return bad("Please enter a valid email address.");
  if (!PHONE_RE.test(phone)) return bad("Please enter a valid phone number, including country code.");
  if (!methods.includes(preferredContact)) return bad("Please choose a preferred contact method.");
  if (!intents.includes(intent)) return bad("Invalid inquiry type.");
  if (message.length > 2000) return bad("Your message is too long (2,000 characters max).");
  if (!property) return bad("This property could not be found.", 404);

  const inquiry = {
    receivedAt: new Date().toISOString(),
    intent,
    property: {
      id: property.id,
      title: property.title,
      price: property.price,
      url: propertyUrl(property.slug),
    },
    contact: { fullName, email, phone, preferredContact },
    message,
  };

  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[inquiry] INQUIRY_WEBHOOK_URL not set; logging only:", inquiry);
      return NextResponse.json({ ok: true });
    }
    console.error("[inquiry] INQUIRY_WEBHOOK_URL is not configured; inquiry was not delivered.");
    return bad("Our inquiry service is temporarily unavailable.", 503);
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[inquiry] delivery failed:", err);
    return bad("We could not send your request right now.", 502);
  }

  return NextResponse.json({ ok: true });
}
