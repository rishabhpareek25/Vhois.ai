import LegalDocument from "../components/layout/LegalDocument";
import CompanyLegalBlock from "../components/layout/CompanyLegalBlock";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { COMPANY, SOCIAL_LINKS } from "../data/company";

const LAST_UPDATED = "June 24, 2025";

export default function Privacy() {
  usePageMeta(
    "Privacy Policy",
    "How Vhois AI collects, uses, and protects your information — including audio, conversation data, and platform usage."
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="page-bleed">
        <LegalDocument
          title="Privacy Policy"
          lastUpdated={LAST_UPDATED}
          sections={[
            {
              id: "introduction",
              title: "Introduction",
              content: (
                <>
                  <p>
                    Vhois AI (&quot;Vhois,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
                    operating at {COMPANY.domain},
                    builds conversation intelligence infrastructure for enterprises and partners.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard
                    information when you visit our website, use our products, participate in pilots,
                    or otherwise interact with us.
                  </p>
                  <p>
                    By using our services, you acknowledge that you have read this policy. If you do
                    not agree, please do not use our services.
                  </p>
                </>
              ),
            },
            {
              id: "information-we-collect",
              title: "Information we collect",
              content: (
                <>
                  <p>We may collect the following categories of information:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong className="text-platinum/90">Account and profile data</strong> — name,
                      email, company, role, and credentials you provide when registering or
                      contacting us.
                    </li>
                    <li>
                      <strong className="text-platinum/90">Usage data</strong> — pages viewed,
                      features used, timestamps, device type, browser, IP address, and diagnostic
                      logs.
                    </li>
                    <li>
                      <strong className="text-platinum/90">Communications</strong> — messages you
                      send via contact forms, email, or support channels.
                    </li>
                    <li>
                      <strong className="text-platinum/90">Pilot and evaluation data</strong> —
                      information shared during demos, waitlists, or early-access programs.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              id: "audio-conversation-data",
              title: "Audio and conversation data",
              content: (
                <>
                  <p>
                    Our platform is designed to process spoken audio and derived conversation
                    intelligence. Depending on your use case and agreement with us, we may process:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Call recordings, meeting audio, and uploaded speech files</li>
                    <li>Transcripts, diarization (speaker attribution), and metadata</li>
                    <li>Derived signals such as topics, summaries, compliance flags, or scores</li>
                  </ul>
                  <p>
                    You are responsible for ensuring you have the legal right and necessary consents
                    to provide audio and conversation data for processing. We process such data only
                    as instructed by you or as described in applicable agreements.
                  </p>
                </>
              ),
            },
            {
              id: "uploaded-files",
              title: "Uploaded files and recordings",
              content: (
                <>
                  <p>
                    When you upload files or connect audio sources, we store and process them to
                    deliver transcription, analysis, search, audit, and related features. File
                    metadata (duration, format, upload time, user ID) may be retained for
                    operational and security purposes.
                  </p>
                  <p>
                    Retention periods may vary by product tier, contract, or your configuration. See
                    the Data retention section below.
                  </p>
                </>
              ),
            },
            {
              id: "contact-form-data",
              title: "Contact and form data",
              content: (
                <p>
                  Information submitted through contact forms, waitlists, or inquiry flows (such as
                  name, company, email, phone, role, use case, and message) is used to respond to
                  your request, evaluate partnership or pilot opportunities, and improve how we
                  communicate with prospects and customers.
                </p>
              ),
            },
            {
              id: "how-we-use",
              title: "How we use information",
              content: (
                <>
                  <p>We use collected information to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Provide, operate, maintain, and improve our services</li>
                    <li>Process audio and generate conversation intelligence outputs</li>
                    <li>Respond to inquiries, support requests, and pilot evaluations</li>
                    <li>Send service-related notices and, where permitted, product updates</li>
                    <li>Monitor security, prevent abuse, and enforce our terms</li>
                    <li>Comply with legal obligations and protect our rights</li>
                  </ul>
                </>
              ),
            },
            {
              id: "ai-processing",
              title: "AI processing and analytics",
              content: (
                <>
                  <p>
                    Vhois AI uses machine learning and automated systems to analyze speech and
                    conversation data. Outputs may include transcripts, classifications, summaries,
                    quality scores, and other derived insights. These outputs are probabilistic and
                    should be reviewed in context for high-stakes decisions.
                  </p>
                  <p>
                    Unless otherwise agreed in writing, we do not use your confidential customer
                    audio to train general-purpose models shared with other customers. Product
                    improvement, benchmarking, and model refinement practices will be described in
                    your commercial agreement or data processing terms where applicable.
                  </p>
                </>
              ),
            },
            {
              id: "data-security",
              title: "Data security",
              content: (
                <>
                  <p>
                    We implement administrative, technical, and organizational measures designed to
                    protect information against unauthorized access, alteration, disclosure, or
                    destruction. These may include encryption in transit, access controls, audit
                    logging, and environment isolation for production workloads.
                  </p>
                  <p>
                    No method of transmission or storage is completely secure. We cannot guarantee
                    absolute security, but we work to maintain standards appropriate for
                    enterprise-grade conversation data.
                  </p>
                </>
              ),
            },
            {
              id: "data-retention",
              title: "Data retention",
              content: (
                <>
                  <p>
                    We retain information for as long as necessary to provide services, fulfill
                    contractual obligations, resolve disputes, and comply with law. Audio,
                    transcripts, and derived intelligence may be deleted or archived according to
                    your retention settings, contract terms, or upon verified request where
                    applicable.
                  </p>
                  <p>
                    Marketing and contact form data is typically retained until you opt out or we no
                    longer have a legitimate business need, subject to legal holds.
                  </p>
                </>
              ),
            },
            {
              id: "third-party",
              title: "Third-party services",
              content: (
                <>
                  <p>
                    We may use third-party providers for hosting, analytics, email delivery,
                    customer support, and infrastructure. These providers process data on our
                    behalf under contractual safeguards and only for specified purposes.
                  </p>
                  <p>
                    Our website may link to third-party sites (such as social networks). Their
                    privacy practices are governed by their own policies, not this one.
                  </p>
                </>
              ),
            },
            {
              id: "cookies",
              title: "Cookies and analytics",
              content: (
                <>
                  <p>
                    We and our analytics partners may use cookies, local storage, and similar
                    technologies to remember preferences, measure traffic, and understand how visitors
                    use our site. You can control cookies through your browser settings; disabling
                    them may affect certain features.
                  </p>
                </>
              ),
            },
            {
              id: "user-rights",
              title: "User rights",
              content: (
                <>
                  <p>
                    Depending on your jurisdiction, you may have rights to access, correct, delete,
                    restrict, or port personal data, and to object to certain processing. To exercise
                    these rights, contact us using the details below. We may need to verify your
                    identity before responding.
                  </p>
                  <p>
                    If you are an end user of an enterprise customer, please contact your
                    organization&apos;s administrator first — they control how your data is
                    processed through their Vhois deployment.
                  </p>
                </>
              ),
            },
            {
              id: "business-transfers",
              title: "Business transfers",
              content: (
                <p>
                  If Vhois is involved in a merger, acquisition, financing, reorganization, or sale
                  of assets, information may be transferred as part of that transaction. We will
                  notify you where required by law of any change in ownership or use of your
                  personal information.
                </p>
              ),
            },
            {
              id: "contact",
              title: "Contact information",
              content: (
                <>
                  <p>For privacy-related questions or requests, contact us at:</p>
                  <ul className="list-none space-y-2 mt-3">
                    <li>
                      <strong className="text-platinum/90">Email:</strong>{" "}
                      <a
                        href={`mailto:${COMPANY.email}`}
                        className="text-platinum hover:underline"
                      >
                        {COMPANY.email}
                      </a>
                    </li>
                    <li>
                      <strong className="text-platinum/90">Website:</strong>{" "}
                      <Link to="/contact" className="text-platinum hover:underline">
                        Contact form
                      </Link>
                    </li>
                    <li>
                      <strong className="text-platinum/90">LinkedIn:</strong>{" "}
                      <a
                        href={SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-platinum hover:underline"
                      >
                        Vhois AI
                      </a>
                    </li>
                  </ul>
                </>
              ),
            },
          ]}
        />
        <div className="max-w-3xl mx-auto mt-12">
          <CompanyLegalBlock />
        </div>
      </div>
    </div>
  );
}
