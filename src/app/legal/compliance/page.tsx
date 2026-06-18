import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Compliance Disclosures",
  description:
    "Our approach to anti-money-laundering, source-of-funds verification, and regulatory compliance.",
};

export default function CompliancePage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Compliance Disclosures"
      lastUpdated="June 2026"
    >
      <p>
        Bridging digital assets and real-world property carries unique
        regulatory responsibility. CryptoProperties Uruguay structures every
        engagement around anti-money-laundering (AML) and know-your-customer
        (KYC) principles applicable under Uruguayan law.
      </p>

      <h2>Source-of-Funds Verification</h2>
      <p>
        Before any transaction is structured, clients are required to
        provide documentation establishing the legitimate origin of the
        digital assets involved, which may include exchange records,
        wallet history, and identity verification consistent with
        applicable regulation.
      </p>

      <h2>Currency Conversion</h2>
      <p>
        Digital assets are converted to fiat currency through licensed,
        regulated exchange and banking partners prior to use in a property
        transaction. CryptoProperties Uruguay does not itself custody client
        funds or digital assets at any point in the process.
      </p>

      <h2>Independent Legal and Notarial Review</h2>
      <p>
        All property transactions are reviewed and executed by independent
        Uruguayan attorneys and notaries, consistent with standard practice
        for real estate transfers in Uruguay, ensuring title, registry, and
        tax obligations are properly satisfied.
      </p>

      <h2>Ongoing Monitoring</h2>
      <p>
        Engagements are subject to ongoing review consistent with
        applicable AML obligations, and CryptoProperties Uruguay reserves
        the right to decline or terminate an engagement where source-of-funds
        documentation cannot be satisfactorily established.
      </p>

      <h2>Reporting Obligations</h2>
      <p>
        Where required by law, CryptoProperties Uruguay and its partner
        institutions comply with applicable reporting obligations to
        relevant Uruguayan regulatory and financial intelligence
        authorities.
      </p>
    </LegalLayout>
  );
}
