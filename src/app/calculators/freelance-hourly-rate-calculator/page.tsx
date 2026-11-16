import React from "react";
import Link from "next/link";
import { ChevronRight, Briefcase, Info, TrendingUp } from "lucide-react";
import FreelancerRateCalculator from "@/components/calculators/FreelancerRateCalculator";
import AdBanner from "@/components/AdBanner";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";

export const metadata = {
  title: "Freelance Hourly Rate & Day Rate Calculator (2026) - Tax & Overhead Adjusted",
  description:
    "Calculate your minimum freelance hourly rate and day rate. Reverse engineer your rates based on take-home pay, unpaid vacation, taxes, and software expenses.",
  keywords: [
    "freelance hourly rate calculator",
    "contractor day rate calculator",
    "how much to charge as a freelancer",
    "freelance tax calculator",
    "consulting rate formula",
  ],
};

const freelanceFAQs: FAQItem[] = [
  {
    question: "Why can't I just divide my old 9-to-5 salary by 2,080 hours?",
    answer:
      "A traditional employee working 40 hours/week logs 2,080 hours, but their employer covers half of FICA taxes (7.65%), health insurance, paid vacation, and sick leave. As a freelancer, you must pay both halves of self-employment tax (15.3%), purchase your own healthcare, pay for your tools, and spend 10 to 15 hours every week on unbillable client acquisition and admin tasks.",
  },
  {
    question: "What is a realistic billable hours target for a full-time freelancer?",
    answer:
      "Most successful full-time freelancers bill between 20 and 28 hours per week. Attempting to bill 40 hours per week leads to immediate burnout because lead generation, proposal writing, contract review, and accounting take up 25% to 40% of your working time.",
  },
  {
    question: "How should I calculate my Day Rate from my Hourly Rate?",
    answer:
      "The industry standard day rate is typically 7 to 8 times your hourly rate, or slightly discounted (e.g. 7.5x) to encourage clients to book full uninterrupted days.",
  },
  {
    question: "How much should I reserve for freelance taxes?",
    answer:
      "In the United States and most Western economies, reserving 25% to 30% of your gross freelance revenue into a separate high-yield tax savings account is strongly recommended to cover quarterly estimated federal, state, and self-employment taxes.",
  },
];

export default function FreelanceCalculatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="hover:text-slate-900">Calculators</span>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-semibold text-slate-900">Freelancer Rate Calculator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <Briefcase className="h-3.5 w-3.5 text-emerald-600" />
          <span>Freelance & Agency Pricing Formula</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Freelance Hourly Rate & Day Rate Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Price your services profitably. Factor in self-employment taxes, unbillable marketing hours, software expenses, and unpaid vacation to calculate your sustainable hourly rate.
        </p>
      </div>

      {/* Top Ad */}
      <AdBanner slot="free-top-banner" format="horizontal" />

      {/* Calculator */}
      <section className="mb-12">
        <FreelancerRateCalculator />
      </section>

      {/* Mid Content Ad */}
      <AdBanner slot="free-mid-banner" format="auto" />

      {/* Editorial & Pricing Formula Guide */}
      <article className="prose prose-slate max-w-none my-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900">
          The Mathematical Formula for Sustainable Freelance Rates
        </h2>
        <p>
          The most dangerous mistake early contractors make is taking their prior corporate hourly wage (e.g. $40/hr) and billing clients that exact number. Within 6 months, taxes and overhead leave them earning less than minimum wage for equivalent effort.
        </p>

        <div className="rounded-xl bg-slate-900 text-slate-100 p-5 not-prose font-mono text-xs leading-relaxed">
          <p className="text-emerald-400 font-bold mb-2"># The Universal Freelancer Rate Equation:</p>
          <p>Annual Billable Hours = (52 Weeks - Vacation Weeks) × Weekly Billable Hours</p>
          <p>Gross Target = (Desired Net Income ÷ (1 - Tax Rate)) + Annual Expenses + Emergency Buffer</p>
          <p className="text-emerald-300 font-bold mt-2">Minimum Hourly Rate = Gross Target ÷ Annual Billable Hours</p>
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          Three Pricing Traps to Avoid
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Assuming 40 Billable Hours:</strong> You cannot bill 40 hours a week unless you are willing to work 60+ total hours including sales calls, client revisions, bookkeeping, and hardware maintenance.
          </li>
          <li>
            <strong>Forgetting Sick and Holiday Days:</strong> If you take 2 weeks off for illness or family events, your income drops to zero unless those weeks were pre-funded across your active client billable hours.
          </li>
          <li>
            <strong>Ignoring Scope Creep:</strong> Always quote projects based on milestone deliverables or capped sprint buckets rather than open-ended undefined hourly commitments.
          </li>
        </ul>
      </article>

      {/* FAQ */}
      <FAQAccordion items={freelanceFAQs} />

      {/* Bottom Ad */}
      <AdBanner slot="free-bottom-banner" format="horizontal" />
    </div>
  );
}

