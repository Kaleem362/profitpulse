import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Financial & Earnings Disclaimer — ProfitPulse",
  description:
    "ProfitPulse earnings disclaimer, trademark attribution, and calculation accuracy disclosures.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold mb-3">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
          <span>Legal Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Financial & Earnings Disclaimer
        </h1>
        <p className="mt-2 text-slate-600 text-sm">
          Please read this financial disclaimer carefully before applying calculation outputs to your business pricing.
        </p>
      </div>

      <div className="space-y-6 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Not Financial or Accounting Advice</h2>
          <p>
            The content, tools, and calculation results available on ProfitPulse are provided strictly for general educational and planning purposes. They are not intended as certified tax advice, financial planning, legal counsel, or business auditing.
          </p>
          <p>
            Tax laws and marketplace policy interpretations vary significantly depending on your jurisdiction, legal business entity type (e.g. Sole Proprietorship, LLC, S-Corp), and international tax treaties. Always consult with a licensed Certified Public Accountant (CPA) or attorney regarding your specific financial situation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Accuracy of Calculations</h2>
          <p>
            While we make every effort to verify our calculations against current 2026 fee schedules published by Etsy, eBay, Stripe, PayPal, and Shopify, platforms frequently update their policies, exchange rate conversions, and category commissions without advance notice. ProfitPulse makes no warranties regarding the complete real-time accuracy or error-free nature of all calculation results.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Non-Affiliation with Third-Party Platforms</h2>
          <p>
            ProfitPulse is an independent web application. We are not endorsed by, sponsored by, or directly affiliated with Etsy, Inc., eBay Inc., Stripe, Inc., PayPal Holdings, Inc., Shopify Inc., or any of their subsidiaries. All trademarks and brand names referenced on this site belong exclusively to their respective owners.
          </p>
        </section>
      </div>
    </div>
  );
}

