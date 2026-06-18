import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description:
    "Key risks associated with converting digital assets into Uruguayan real estate.",
};

export default function RiskDisclosurePage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Risk Disclosure"
      lastUpdated="June 2026"
    >
      <p>
        Converting digital assets into real estate involves risks distinct
        from either asset class alone. This disclosure summarizes key
        considerations clients should understand and discuss with
        independent professional advisors before proceeding.
      </p>

      <h2>Market and Valuation Risk</h2>
      <p>
        The value of cryptocurrency can be highly volatile between the time
        a transaction is initiated and the time funds are converted and
        deployed. Real estate values in Uruguay, while historically stable,
        are also subject to market fluctuation and are not guaranteed to
        appreciate.
      </p>

      <h2>No Guarantee of Returns</h2>
      <p>
        CryptoProperties Uruguay does not promise, project, or guarantee any
        rate of return, rental yield, or appreciation on real estate
        acquired through our advisory services. References to investment
        philosophy on this website describe an approach, not a forecast.
      </p>

      <h2>Regulatory and Tax Risk</h2>
      <p>
        Cryptocurrency and cross-border real estate regulations are subject
        to change in Uruguay and in clients&apos; home jurisdictions. Clients
        are responsible for understanding and complying with applicable tax
        reporting obligations in their country of residence and
        citizenship.
      </p>

      <h2>Liquidity Risk</h2>
      <p>
        Real estate is a comparatively illiquid asset. Clients should not
        treat property acquired through our services as readily convertible
        back into cash or digital assets on short notice.
      </p>

      <h2>Third-Party Dependencies</h2>
      <p>
        Transactions depend on the performance of independent banks,
        exchanges, attorneys, and notaries who are not employees of
        CryptoProperties Uruguay. We exercise care in selecting partners but
        cannot guarantee their performance or timelines.
      </p>

      <p>
        Clients are strongly encouraged to consult independent legal,
        financial, and tax professionals in both Uruguay and their home
        jurisdiction before proceeding with any transaction.
      </p>
    </LegalLayout>
  );
}
