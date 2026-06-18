import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the CryptoProperties Uruguay website and advisory services.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="June 2026"
    >
      <p>
        These Terms of Service govern your access to and use of the
        CryptoProperties Uruguay website and the advisory services described
        on it. By using this website, you agree to the terms outlined below.
      </p>

      <h2>Nature of Our Services</h2>
      <p>
        CryptoProperties Uruguay acts as an advisory intermediary connecting
        digital asset holders with the Uruguayan real estate market. We are
        not a licensed real estate brokerage, law firm, notarial office,
        bank, or registered investment advisor. Property transactions,
        currency conversion, and legal title transfer are carried out by
        independent, appropriately licensed third parties.
      </p>

      <h2>No Investment, Legal, or Tax Advice</h2>
      <p>
        Nothing on this website or communicated during a consultation should
        be construed as investment, legal, financial, or tax advice. Clients
        are responsible for obtaining independent professional advice
        before entering into any transaction.
      </p>

      <h2>Eligibility and Verification</h2>
      <p>
        Use of our advisory services and access to our private property
        portfolio is conditioned on completion of an identity and
        source-of-funds verification process, consistent with applicable
        anti-money-laundering regulations in Uruguay.
      </p>

      <h2>Illustrative Information</h2>
      <p>
        Statistics, figures, and case examples presented on this website are
        illustrative in nature unless explicitly stated otherwise, and do
        not constitute a guarantee of any particular outcome, timeline, or
        result.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, CryptoProperties
        Uruguay shall not be liable for indirect, incidental, or
        consequential damages arising from use of this website or reliance
        on information presented here.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms shall be interpreted in accordance with the laws of the
        Oriental Republic of Uruguay, without regard to conflict-of-law
        principles.
      </p>
    </LegalLayout>
  );
}
