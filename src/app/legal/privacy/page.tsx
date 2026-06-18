import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CryptoProperties Uruguay collects, uses, and protects client information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="June 2026"
    >
      <p>
        CryptoProperties Uruguay (&quot;we,&quot; &quot;us,&quot; or
        &quot;the Company&quot;) respects the privacy of every visitor,
        prospective client, and verified client who interacts with our
        website and advisory services. This policy outlines, at a high
        level, the categories of information we collect, how it is used,
        and the choices available to you.
      </p>

      <h2>Information We Collect</h2>
      <p>In the course of providing advisory services, we may collect:</p>
      <ul>
        <li>Contact details you provide directly, such as name, email address, and phone number.</li>
        <li>Information shared during private consultations, including investment objectives and general financial background.</li>
        <li>Identity verification and source-of-funds documentation required for compliance purposes.</li>
        <li>Technical information such as browser type and general usage analytics from our website.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        Information collected is used to provide and improve our advisory
        services, communicate with prospective and existing clients,
        fulfill anti-money-laundering and regulatory obligations, and
        coordinate with the independent legal, notarial, and tax
        professionals involved in a transaction.
      </p>

      <h2>Sharing of Information</h2>
      <p>
        We do not sell personal information. Information may be shared with
        independent attorneys, notaries, banks, or regulatory bodies strictly
        as necessary to facilitate a transaction or satisfy a legal
        obligation, and only with your knowledge as part of the engagement.
      </p>

      <h2>Data Security</h2>
      <p>
        We apply administrative and technical safeguards designed to protect
        client information, including restricted internal access to
        sensitive documentation and encrypted storage of identity
        verification records.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your
        personal information, subject to our regulatory recordkeeping
        obligations, by contacting us using the details below.
      </p>
    </LegalLayout>
  );
}
