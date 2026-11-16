import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Cookie Disclosure — ProfitPulse",
  description:
    "ProfitPulse Privacy Policy. Information regarding cookies, Google AdSense advertising, and user data privacy practices.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
          <Shield className="h-3.5 w-3.5 text-emerald-600" />
          <span>Last Updated: November 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-slate-600 text-sm">
          How ProfitPulse handles user data, cookies, and third-party advertising partners.
        </p>
      </div>

      <div className="space-y-6 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Information We Do Not Collect</h2>
          <p>
            ProfitPulse is designed to be privacy-first. We do not require account registration, do not collect personal financial records, and do not store credit card or bank credentials. Calculations performed in our tools run client-side in your web browser.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Cookies and Web Beacons</h2>
          <p>
            Like most modern websites, ProfitPulse uses cookies to improve user experience, remember currency preferences, and compile aggregate analytics on website traffic. You can choose to disable cookies through your individual browser settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Google AdSense & Third-Party Advertising</h2>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to ProfitPulse and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 underline font-medium"
            >
              Google Ads Settings
            </a>
            . Alternatively, you can opt out of third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 underline font-medium"
            >
              www.aboutads.info
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Analytics</h2>
          <p>
            We may use privacy-compliant web analytics tools (such as Google Analytics or Firebase Analytics) to understand aggregate traffic trends, such as which calculators are most frequently accessed. These tools collect anonymized data such as browser type, referring pages, and timestamp.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Contact Information</h2>
          <p>
            If you have questions or concerns regarding this Privacy Policy, please contact us at{" "}
            <span className="font-mono text-emerald-700">privacy@profitpulse.io</span> or via our{" "}
            <Link href="/contact" className="text-emerald-600 underline font-medium">
              Contact Page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

