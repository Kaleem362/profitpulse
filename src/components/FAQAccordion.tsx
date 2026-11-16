"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  description?: string;
}

export default function FAQAccordion({
  items,
  title = "Frequently Asked Questions",
  description = "Get clear, updated answers to the most common questions regarding platform fees, formulas, and margins.",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured Data for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section className="my-10" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mb-6">
        <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-4 text-left font-medium text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold text-slate-800 pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-sm leading-relaxed text-slate-600 border-t border-slate-100">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

