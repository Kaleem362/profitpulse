"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Feedback");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    // Simulate submission
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <Mail className="h-3.5 w-3.5 text-emerald-600" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Contact Us
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
          Questions about our calculations, partnership inquiries, or suggestions for new platform calculators? We respond to all inquiries within 24–48 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info Sidebar (4 Cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Direct Inquiries</h2>
            <div className="flex items-start gap-3 text-xs text-slate-600">
              <Mail className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-slate-800">Support & Feedback:</span>
                <span className="font-mono text-emerald-700">support@profitpulse.io</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-600">
              <MessageSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-slate-800">Feature Requests:</span>
                <span className="font-mono text-emerald-700">features@profitpulse.io</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 text-xs text-slate-600 leading-relaxed">
            <h3 className="font-bold text-slate-800 mb-2">Note on Financial Advice</h3>
            <p>
              Please note that while we strive for 100% calculation accuracy, ProfitPulse does not provide individualized tax, legal, or certified accounting advice. For personalized tax filing advice, consult a licensed CPA.
            </p>
          </div>
        </div>

        {/* Form (7 Cols) */}
        <div className="md:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out to the ProfitPulse team. We will review your message and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="mt-4 inline-flex items-center text-xs font-semibold text-emerald-600 hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1">
                    Topic / Category
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="General Feedback">General Feedback</option>
                    <option value="Fee Formula Bug Report">Fee Formula Update or Bug Report</option>
                    <option value="New Calculator Request">Request a New Calculator</option>
                    <option value="Advertising & Partnership">Advertising & Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind or how we can improve..."
                    className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <AdBanner slot="contact-bottom-banner" format="horizontal" />
    </div>
  );
}

