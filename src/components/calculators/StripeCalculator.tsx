"use client";

import React, { useState, useMemo } from "react";
import { RotateCcw, Copy, Check, Printer, ArrowRightLeft, CreditCard, Sparkles } from "lucide-react";
import { CURRENCIES, formatCurrency } from "@/lib/currencies";

interface Gateway {
  id: string;
  name: string;
  percent: number;
  fixed: number;
  badge: string;
}

const GATEWAYS: Gateway[] = [
  { id: "stripe_us", name: "Stripe (US Standard)", percent: 2.9, fixed: 0.30, badge: "Most Popular" },
  { id: "stripe_intl", name: "Stripe (International / Cross-Border)", percent: 4.4, fixed: 0.30, badge: "+1.5% Intl" },
  { id: "paypal_invoice", name: "PayPal (Standard Invoicing)", percent: 3.49, fixed: 0.49, badge: "Invoices" },
  { id: "paypal_standard", name: "PayPal (Online Checkout)", percent: 2.99, fixed: 0.49, badge: "Checkout" },
  { id: "square", name: "Square (Card-Not-Present)", percent: 2.9, fixed: 0.30, badge: "Online" },
  { id: "wise", name: "Wise / Bank ACH Transfer", percent: 0.5, fixed: 0.00, badge: "Lowest Fee" },
];

const STRIPE_PRESETS = [
  { label: "📦 SaaS Sub ($49)", amount: 49 },
  { label: "✍️ Copywriting ($450)", amount: 450 },
  { label: "💻 Web Design ($2,500)", amount: 2500 },
  { label: "🚀 Enterprise ($7,500)", amount: 7500 },
];

export default function StripeCalculator() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [mode, setMode] = useState<"standard" | "reverse">("standard");
  const [amount, setAmount] = useState<number>(500.00);
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>("stripe_us");
  const [copied, setCopied] = useState<boolean>(false);

  const selectedGateway = useMemo(() => {
    return GATEWAYS.find((g) => g.id === selectedGatewayId) || GATEWAYS[0];
  }, [selectedGatewayId]);

  const calculations = useMemo(() => {
    const validAmount = Math.max(0, amount || 0);
    const rate = selectedGateway.percent / 100;
    const fixed = selectedGateway.fixed;

    if (mode === "standard") {
      // Invoicing $amount -> What you get
      const fee = validAmount > 0 ? (validAmount * rate) + fixed : 0;
      const netPayout = Math.max(0, validAmount - fee);
      const effectiveRate = validAmount > 0 ? (fee / validAmount) * 100 : 0;
      return {
        invoiceAmount: validAmount,
        fee,
        netPayout,
        effectiveRate,
      };
    } else {
      // Reverse: Want $amount net payout -> What to invoice
      const invoiceAmount = validAmount > 0 ? (validAmount + fixed) / Math.max(0.01, 1 - rate) : 0;
      const fee = invoiceAmount - validAmount;
      const effectiveRate = invoiceAmount > 0 ? (fee / invoiceAmount) * 100 : 0;
      return {
        invoiceAmount,
        fee,
        netPayout: validAmount,
        effectiveRate,
      };
    }
  }, [mode, amount, selectedGateway]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopy = () => {
    const text = `${selectedGateway.name} Fee Calculation:
- Invoice Total: ${formatCurrency(calculations.invoiceAmount, currency.symbol)}
- Processing Fee: ${formatCurrency(calculations.fee, currency.symbol)} (${calculations.effectiveRate.toFixed(2)}%)
- Net Payout Received: ${formatCurrency(calculations.netPayout, currency.symbol)}
Calculated with ProfitPulse.io`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-slate-50/80 p-4 sm:px-6 gap-3">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-indigo-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Payment Processing Fee Engine
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="stripe-curr" className="text-xs font-medium text-slate-500">
            Currency:
          </label>
          <select
            id="stripe-curr"
            value={currency.code}
            onChange={(e) => {
              const found = CURRENCIES.find((c) => c.code === e.target.value);
              if (found) setCurrency(found);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setAmount(500.00)}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="border-b border-slate-200 bg-slate-50/30 p-2 sm:px-6 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("standard")}
          className={`flex-1 sm:flex-initial py-2 px-4 rounded-lg text-xs font-bold transition ${
            mode === "standard"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Invoice Fee (How much will I receive?)
        </button>
        <button
          type="button"
          onClick={() => setMode("reverse")}
          className={`flex-1 sm:flex-initial py-2 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            mode === "reverse"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <ArrowRightLeft className="h-3.5 w-3.5" />
          Reverse Calculator (How much to ask for?)
        </button>
      </div>

      {/* Presets Bar */}
      <div className="border-b border-slate-100 bg-slate-50/40 px-4 py-2.5 sm:px-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-indigo-500" />
          Common Invoices:
        </span>
        {STRIPE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => setAmount(preset.amount)}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 hover:border-indigo-500 hover:text-indigo-700 hover:bg-indigo-50/50 transition shadow-2xs"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Inputs (7 Cols) */}
        <div className="p-6 sm:p-8 lg:col-span-7 space-y-6">
          {/* Amount input */}
          <div>
            <label htmlFor="stripe-amount" className="block text-xs font-semibold text-slate-700 mb-1">
              {mode === "standard"
                ? `Invoice / Payment Amount (${currency.symbol})`
                : `Target Amount You Want in Your Bank (${currency.symbol})`}
            </label>
            <div className="relative rounded-lg shadow-sm">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                {currency.symbol}
              </span>
              <input
                type="number"
                id="stripe-amount"
                step="1"
                min="0"
                value={amount === 0 ? "" : amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2.5 text-base font-bold text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {mode === "standard"
                ? "Enter the total charge amount you invoice or bill your client."
                : "Enter the clean amount you wish to take home after merchant fees are deducted."}
            </p>
          </div>

          {/* Gateway Selector Cards */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Payment Gateway & Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GATEWAYS.map((gw) => (
                <div
                  key={gw.id}
                  onClick={() => setSelectedGatewayId(gw.id)}
                  className={`cursor-pointer rounded-xl border p-3 transition ${
                    selectedGatewayId === gw.id
                      ? "border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900">{gw.name}</span>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/70 px-1.5 py-0.5 rounded">
                      {gw.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Rate: {gw.percent}% {gw.fixed > 0 ? `+ ${currency.symbol}${gw.fixed.toFixed(2)}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output & Summary (5 Cols) */}
        <div className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-gradient-to-b from-slate-50/80 to-white p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {mode === "standard" ? "Payout Breakdown" : "Invoice Recommendation"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-md transition shadow-2xs hover:bg-slate-50"
                  title="Print estimate"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-md transition border border-indigo-200"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Report"}
                </button>
              </div>
            </div>

            {/* Primary Hero Display */}
            <div className="rounded-xl p-5 border bg-indigo-50/90 border-indigo-200 text-indigo-950 text-center">
              <span className="text-xs font-semibold tracking-wider uppercase opacity-80">
                {mode === "standard" ? "You Receive (Net Deposit)" : "You Should Invoice"}
              </span>
              <div className="text-4xl font-black tracking-tight my-1 text-indigo-900">
                {formatCurrency(
                  mode === "standard" ? calculations.netPayout : calculations.invoiceAmount,
                  currency.symbol
                )}
              </div>
              <div className="text-xs font-semibold text-indigo-700 mt-1">
                Effective Processing Fee: {calculations.effectiveRate.toFixed(2)}%
              </div>
            </div>

            {/* Visual Bar: Fee vs Received */}
            {calculations.invoiceAmount > 0 && (
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Take-Home Retention</span>
                  <span>{(100 - calculations.effectiveRate).toFixed(1)}% Retained</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                  <div 
                    style={{ width: `${Math.max(0, 100 - calculations.effectiveRate)}%` }} 
                    className="bg-indigo-600 transition-all duration-300"
                  />
                  <div 
                    style={{ width: `${Math.min(100, calculations.effectiveRate)}%` }} 
                    className="bg-rose-500 transition-all duration-300"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                  <span className="text-indigo-700 font-semibold">
                    Net Deposit ({formatCurrency(calculations.netPayout, currency.symbol)})
                  </span>
                  <span className="text-rose-600 font-semibold">
                    Fee ({formatCurrency(calculations.fee, currency.symbol)})
                  </span>
                </div>
              </div>
            )}

            {/* Breakdown lines */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Client Charged Amount:</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(calculations.invoiceAmount, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">
                  Gateway Fee ({selectedGateway.percent}% + {currency.symbol}{selectedGateway.fixed}):
                </span>
                <span className="font-semibold text-rose-600">
                  -{formatCurrency(calculations.fee, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 font-bold text-slate-900">
                <span>Net Bank Deposit:</span>
                <span className="text-emerald-700">
                  {formatCurrency(calculations.netPayout, currency.symbol)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
            <p>
              💡 <strong>Pro Tip:</strong> To avoid absorbing client payment fees, include payment fee clauses in your client agreements or accept ACH bank transfers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
