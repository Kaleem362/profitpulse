import React from "react";
import Link from "next/link";
import { ChevronRight, CreditCard, ArrowRightLeft } from "lucide-react";
import StripeCalculator from "@/components/calculators/StripeCalculator";
import AdBanner from "@/components/AdBanner";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";

export const metadata = {
  title: "Stripe & PayPal Fee Calculator (2026) - Reverse Invoice Calculator",
  description:
    "Free 2026 Stripe and PayPal merchant fee calculator. Calculate processing cuts and reverse engineer your invoices to receive the exact amount in your bank.",
  keywords: [
    "stripe fee calculator",
    "paypal fee calculator",
    "reverse invoice fee calculator",
    "paypal invoicing fees 2026",
    "how much to charge to receive net amount",
  ],
};

const stripeFAQs: FAQItem[] = [
  {
    question: "What is Stripe's standard fee in 2026?",
    answer:
      "Stripe's standard pricing for domestic cards is 2.9% + $0.30 per successful card charge. International cards and currency conversion carry an additional 1.5% fee (+1% for currency conversion if applicable).",
  },
  {
    question: "What is the difference between PayPal Checkout and PayPal Invoicing?",
    answer:
      "PayPal charges 3.49% + $0.49 for standard merchant invoicing sent via the PayPal dashboard. For direct online store checkouts, PayPal charges 2.99% + $0.49. That 0.50% difference can add up significantly on large client projects.",
  },
  {
    question: "How does the reverse invoice calculation work?",
    answer:
      "If you want to receive an exact amount (e.g. $1,000) after Stripe takes 2.9% + $0.30, the formula is: Invoice Amount = (Desired Net + $0.30) / (1 - 0.029). In this case, you must invoice $1,030.18 to take home exactly $1,000.00.",
  },
  {
    question: "Can I legally pass credit card processing fees to my clients?",
    answer:
      "In many jurisdictions and US states, credit card surcharging is legal provided you clearly disclose the surcharge on the invoice before payment, or alternatively offer an early-payment discount for ACH bank transfers or wire payments.",
  },
];

export default function StripeCalculatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="hover:text-slate-900">Calculators</span>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-semibold text-slate-900">Stripe & PayPal Calculator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-3">
          <CreditCard className="h-3.5 w-3.5 text-indigo-600" />
          <span>Multi-Gateway & Reverse Invoicing Ready</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Stripe & PayPal Merchant Fee Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Calculate processing deductions across Stripe, PayPal, Square, and Wise. Use the reverse calculator to find out exactly how much to invoice to receive your desired net payout.
        </p>
      </div>

      {/* Top Ad */}
      <AdBanner slot="stripe-top-banner" format="horizontal" />

      {/* Interactive Tool */}
      <section className="mb-12">
        <StripeCalculator />
      </section>

      {/* Mid Ad */}
      <AdBanner slot="stripe-mid-banner" format="auto" />

      {/* Editorial Guide */}
      <article className="prose prose-slate max-w-none my-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900">
          Comparing Gateway Fees: Stripe vs. PayPal vs. Square vs. Wise
        </h2>
        <p>
          For digital entrepreneurs, freelancers, and agency owners, merchant processing fees represent one of the single largest operating expenditures. Knowing which payment rail to use can save hundreds or thousands of dollars annually.
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto my-6 not-prose">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-800 font-bold">
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Domestic Rate</th>
                <th className="py-3 px-4">Cross-Border Surcharge</th>
                <th className="py-3 px-4">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Stripe Payments</td>
                <td className="py-3 px-4 text-indigo-700 font-bold">2.9% + $0.30</td>
                <td className="py-3 px-4 text-slate-600">+1.50% (+1% if currency conversion)</td>
                <td className="py-3 px-4 text-slate-600">SaaS, e-commerce checkouts, automated billing.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">PayPal Invoicing</td>
                <td className="py-3 px-4 text-indigo-700 font-bold">3.49% + $0.49</td>
                <td className="py-3 px-4 text-slate-600">+1.50%</td>
                <td className="py-3 px-4 text-slate-600">Clients who insist on paying via PayPal balance.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Square Online</td>
                <td className="py-3 px-4 text-indigo-700 font-bold">2.9% + $0.30</td>
                <td className="py-3 px-4 text-slate-600">+1.00%</td>
                <td className="py-3 px-4 text-slate-600">Omnichannel retail & local service businesses.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Wise / Bank ACH Transfer</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">~0.5% (Capped)</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">Real mid-market exchange rate</td>
                <td className="py-3 px-4 text-slate-600">High-ticket B2B invoices over $2,000.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          The Secret to Saving 3% on High-Ticket Client Invoices
        </h3>
        <p>
          On a $5,000 project invoice, accepting a credit card through PayPal Invoicing will cost you <strong>$174.99 in merchant fees</strong>. If you instead request payment via Stripe ACH Direct Debit or a Wise bank transfer, the fee is typically capped at $5.00 to $25.00, putting over $150 straight into your profit column.
        </p>
      </article>

      {/* FAQ */}
      <FAQAccordion items={stripeFAQs} />

      {/* Bottom Ad */}
      <AdBanner slot="stripe-bottom-banner" format="horizontal" />
    </div>
  );
}

