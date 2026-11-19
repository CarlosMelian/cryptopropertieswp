import { NextResponse } from "next/server";
import { getPropertyBySlug } from "@/lib/properties";
import { propertyUrl } from "@/lib/site";
import { defaultLocale, isLocale } from "@/i18n/config";
import type { ContactMethod, InquiryIntent } from "@/types";

/**
 * Receives property inquiries from the detail page form.
 *
 * Delivery: set INQUIRY_WEBHOOK_URL to any endpoint that accepts a JSON POST
 * (a CRM, Zapier/Make webhook, Slack incoming webhook, or your own service).
 * Without it, inquiries are only logged in development, and the endpoint
 * responds 503 in production so visitors are offered the email fallback
 * instead of a false confirmation.
 *
 * Errors are returned as codes; the form translates them into the visitor's
 * language (see `properties.inquiry.errors` in the dictionaries).
 */

const intents: InquiryIntent[] = ["information", "crypto"];
const methods: ContactMethod[] = ["email", "phone", "whatsapp"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{6,30}$/;

function fail(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("invalid_request");
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
  const rawLocale = str("locale");
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  // The team receives the English title; the URL points to the page the visitor saw.
  const property = getPropertyBySlug(str("propertySlug"), "en");

  if (fullName.length < 2 || fullName.length > 120) return fail("invalid_name");
  if (!EMAIL_RE.test(email) || email.length > 200) return fail("invalid_email");
  if (!PHONE_RE.test(phone)) return fail("invalid_phone");
  if (!methods.includes(preferredContact)) return fail("invalid_method");
  if (!intents.includes(intent)) return fail("invalid_intent");
  if (message.length > 2000) return fail("message_too_long");
  if (!property) return fail("property_not_found", 404);

  const inquiry = {
    receivedAt: new Date().toISOString(),
    intent,
    /** Language the visitor used, so the team can reply in it. */
    language: locale,
    property: {
      id: property.id,
      title: property.title,
      price: property.price,
      url: propertyUrl(property.slug, locale),
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
    return fail("unavailable", 503);
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
    return fail("delivery_failed", 502);
  }

  return NextResponse.json({ ok: true });
}
