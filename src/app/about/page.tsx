import React from "react";
import Link from "next/link";
import { ShieldCheck, Target, Calculator, Users, CheckCircle2 } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export const metadata = {
  title: "About Us & Calculation Methodology — ProfitPulse",
  description:
    "Learn about ProfitPulse, our mission to support independent e-commerce sellers and freelancers, and our verified fee calculation methodology.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Mission & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About ProfitPulse
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
          Empowering independent creators, marketplace sellers, and freelancers with transparent, precision financial utilities.
        </p>
      </div>

      <div className="space-y-8 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-600" />
            Our Mission
          </h2>
          <p>
            ProfitPulse was created in response to a growing challenge in the creator economy: <strong>the fragmentation and complexity of platform fee structures</strong>. Between transaction cuts, payment handling, buyer shipping surcharges, and algorithm-driven advertising fees, calculating your actual net profit by hand has become needlessly confusing.
          </p>
          <p>
            Our mission is simple: provide free, instant, zero-friction financial calculators that give digital entrepreneurs clarity over their numbers so they can price their products sustainably.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Calculation Methodology & Data Accuracy
          </h2>
          <p>
            Every formula running on ProfitPulse is audited against the officially published fee schedules and seller handbooks of each respective platform:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li>
              <strong>Etsy:</strong> Verified against the official Etsy Seller Handbook (6.5% transaction cut on item + shipping + gift wrap, $0.20 per-listing renewal, and country-specific payment processor cuts).
            </li>
            <li>
              <strong>eBay:</strong> Verified against the eBay Seller Center Managed Payments schedule, accounting for category-tier variances, per-order fixed deductions, and store subscription tiers.
            </li>
            <li>
              <strong>Stripe & PayPal:</strong> Verified against public merchant pricing documentation, including cross-border international transaction surcharges.
            </li>
          </ul>
        </section>

        <section className="space-y-3 pt-6 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600" />
            Who We Are
          </h2>
          <p>
            We are a team of software developers, e-commerce veterans, and former freelancers who grew tired of messy spreadsheets and outdated blog posts with obsolete math. We maintain and update these calculators regularly whenever platform policies change.
          </p>
          <p>
            Have a question, feature request, or suggestion for a new calculator? We would love to hear from you. Visit our{" "}
            <Link href="/contact" className="text-emerald-600 font-semibold underline">
              Contact Us page
            </Link>{" "}
            to get in touch.
          </p>
        </section>
      </div>

      <AdBanner slot="about-bottom-banner" format="horizontal" />
    </div>
  );
}

