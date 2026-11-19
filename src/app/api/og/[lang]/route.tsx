import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

/** Branded 1200×630 share image per language, generated at build time. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const GOLD = "#C9A53B";

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;
  const { meta } = getDictionary(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 50% 0%, rgba(201,165,59,0.22), #07080A 62%)",
          backgroundColor: "#07080A",
          color: "#F5F3EE",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <circle cx="4.5" cy="23" r="1.6" fill={GOLD} />
            <circle cx="27.5" cy="23" r="1.6" fill={GOLD} />
            <path d="M4.5 23H27.5" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
            <path d="M11 23V8M21 23V8" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
            <path d="M11 8L4.5 23M11 8L17 23M21 8L27.5 23M21 8L15 23" stroke={GOLD} strokeWidth="0.85" strokeLinecap="round" opacity="0.65" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, letterSpacing: 1 }}>
            CryptoProperties<span style={{ color: "#A8A9B3", marginLeft: 12 }}>Uruguay</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 2, background: GOLD, marginBottom: 36 }} />
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.1, maxWidth: 980 }}>{meta.ogTagline}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#A8A9B3",
            borderTop: "1px solid #26282F",
            paddingTop: 28,
          }}
        >
          <span>{meta.ogParent}</span>
          <span style={{ color: GOLD, letterSpacing: 4, fontSize: 20 }}>BTC · USDT · ETH</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
