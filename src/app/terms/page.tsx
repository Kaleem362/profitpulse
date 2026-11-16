import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service — ProfitPulse",
  description: "Terms and conditions governing the use of ProfitPulse calculators and online tools.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
          <FileText className="h-3.5 w-3.5 text-emerald-600" />
          <span>Last Updated: November 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-slate-600 text-sm">
          Please review these terms before using the ProfitPulse calculation suite.
        </p>
      </div>

      <div className="space-y-6 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ProfitPulse (https://profitpulse.io), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the website immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Informational Purpose Only</h2>
          <p>
            All calculations, fee schedules, break-even estimations, and financial comparisons provided on this website are for informational and educational purposes only. They do not constitute formal certified public accountant (CPA), financial, legal, or tax advice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Intellectual Property</h2>
          <p>
            The software design, UI components, calculation algorithms, branding, and written editorial content on ProfitPulse are protected by copyright and intellectual property laws. You may not scrape, clone, or redistribute the software or code without prior written consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Third-Party Trademarks</h2>
          <p>
            Etsy, eBay, Stripe, PayPal, and Shopify are registered trademarks of their respective corporations. ProfitPulse is an independent software tool and is not affiliated, sponsored, endorsed, or partnered with any of these third-party platforms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            In no event shall ProfitPulse or its creators be liable for any direct, indirect, incidental, or consequential damages resulting from pricing decisions, business losses, or marketplace disputes arising from the use of our calculators.
          </p>
        </section>
      </div>
    </div>
  );
}

