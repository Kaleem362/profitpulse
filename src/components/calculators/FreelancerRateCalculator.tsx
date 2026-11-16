"use client";

import React, { useState, useMemo } from "react";
import { RotateCcw, Copy, Check, Printer, Briefcase, Calendar, ShieldAlert, Sparkles } from "lucide-react";
import { CURRENCIES, formatCurrency } from "@/lib/currencies";

const FREELANCE_PRESETS = [
  { label: "🌱 Starting Freelancer ($50k)", salary: 50000, hours: 25, vac: 3, exp: 4000, tax: 25, buff: 10 },
  { label: "💼 Senior Specialist ($90k)", salary: 90000, hours: 25, vac: 4, exp: 8000, tax: 28, buff: 12 },
  { label: "🏆 Agency Consultant ($150k)", salary: 150000, hours: 22, vac: 5, exp: 15000, tax: 32, buff: 15 },
];

export default function FreelancerRateCalculator() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [desiredSalary, setDesiredSalary] = useState<number>(85000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);
  const [annualExpenses, setAnnualExpenses] = useState<number>(7500);
  const [taxRate, setTaxRate] = useState<number>(28); // self-employment + federal/state
  const [profitBuffer, setProfitBuffer] = useState<number>(10); // 10% emergency reserve
  const [copied, setCopied] = useState<boolean>(false);

  const calculations = useMemo(() => {
    const validSalary = Math.max(0, desiredSalary || 0);
    const validExp = Math.max(0, annualExpenses || 0);
    const validHours = Math.max(1, billableHoursPerWeek || 1);
    const validVac = Math.min(50, Math.max(0, vacationWeeks || 0));

    const workingWeeks = Math.max(1, 52 - validVac);
    const annualBillableHours = workingWeeks * validHours;

    // Required Pre-Tax Income = desiredSalary / (1 - (taxRate / 100))
    const requiredPreTaxIncome = validSalary / Math.max(0.1, 1 - (taxRate / 100));
    const totalTaxes = requiredPreTaxIncome - validSalary;
    
    // Add business expenses
    const baseGrossNeeded = requiredPreTaxIncome + validExp;

    // Add profit buffer
    const bufferAmount = baseGrossNeeded * (profitBuffer / 100);
    const totalGrossRevenueNeeded = baseGrossNeeded + bufferAmount;

    // Hourly and Day rates
    const hourlyRate = annualBillableHours > 0 ? totalGrossRevenueNeeded / annualBillableHours : 0;
    const dayRate = hourlyRate * 8;
    const monthlyGrossTarget = totalGrossRevenueNeeded / 12;

    // Visual Distribution
    const salaryPct = totalGrossRevenueNeeded > 0 ? (validSalary / totalGrossRevenueNeeded) * 100 : 0;
    const taxPct = totalGrossRevenueNeeded > 0 ? (totalTaxes / totalGrossRevenueNeeded) * 100 : 0;
    const expPct = totalGrossRevenueNeeded > 0 ? (validExp / totalGrossRevenueNeeded) * 100 : 0;
    const buffPct = totalGrossRevenueNeeded > 0 ? (bufferAmount / totalGrossRevenueNeeded) * 100 : 0;

    return {
      workingWeeks,
      annualBillableHours,
      totalGrossRevenueNeeded,
      monthlyGrossTarget,
      hourlyRate,
      dayRate,
      totalTaxes,
      bufferAmount,
      distribution: {
        salary: salaryPct,
        tax: taxPct,
        expenses: expPct,
        buffer: buffPct,
      },
    };
  }, [desiredSalary, billableHoursPerWeek, vacationWeeks, annualExpenses, taxRate, profitBuffer]);

  const handleApplyPreset = (preset: typeof FREELANCE_PRESETS[0]) => {
    setDesiredSalary(preset.salary);
    setBillableHoursPerWeek(preset.hours);
    setVacationWeeks(preset.vac);
    setAnnualExpenses(preset.exp);
    setTaxRate(preset.tax);
    setProfitBuffer(preset.buff);
  };

  const handleReset = () => {
    setDesiredSalary(85000);
    setBillableHoursPerWeek(25);
    setVacationWeeks(4);
    setAnnualExpenses(7500);
    setTaxRate(28);
    setProfitBuffer(10);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopy = () => {
    const text = `Freelance Rate Calculation:
- Desired Take-Home Salary: ${formatCurrency(desiredSalary, currency.symbol)}
- Annual Billable Hours: ${calculations.annualBillableHours} hrs (${billableHoursPerWeek} hrs/wk for ${calculations.workingWeeks} wks)
-----------------------
- RECOMMENDED HOURLY RATE: ${formatCurrency(calculations.hourlyRate, currency.symbol)}/hr
- RECOMMENDED DAY RATE: ${formatCurrency(calculations.dayRate, currency.symbol)}/day
- MONTHLY INVOICING TARGET: ${formatCurrency(calculations.monthlyGrossTarget, currency.symbol)}/mo
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
          <Briefcase className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Freelance Pricing & Day-Rate Engine
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="free-curr" className="text-xs font-medium text-slate-500">
            Currency:
          </label>
          <select
            id="free-curr"
            value={currency.code}
            onChange={(e) => {
              const found = CURRENCIES.find((c) => c.code === e.target.value);
              if (found) setCurrency(found);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Presets Bar */}
      <div className="border-b border-slate-100 bg-slate-50/40 px-4 py-2.5 sm:px-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-emerald-500" />
          Career Tiers:
        </span>
        {FREELANCE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 transition shadow-2xs"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Inputs (7 Cols) */}
        <div className="p-6 sm:p-8 lg:col-span-7 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">
            Income Targets & Workload
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Desired Salary */}
            <div>
              <label htmlFor="desiredSalary" className="block text-xs font-semibold text-slate-700 mb-1">
                Target Annual Take-Home ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="desiredSalary"
                  step="1000"
                  min="0"
                  value={desiredSalary === 0 ? "" : desiredSalary}
                  onChange={(e) => setDesiredSalary(parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Clean net income in your personal pocket.</p>
            </div>

            {/* Billable Hours */}
            <div>
              <label htmlFor="billableHours" className="block text-xs font-semibold text-slate-700 mb-1">
                Billable Hours / Week ({billableHoursPerWeek} hrs)
              </label>
              <input
                type="range"
                id="billableHours"
                min="10"
                max="40"
                value={billableHoursPerWeek}
                onChange={(e) => setBillableHoursPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600 mt-2"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>10 hrs (Part-time)</span>
                <span>25 hrs (Standard)</span>
                <span>40 hrs (Max)</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Remember: Marketing, admin, and invoicing take 10–15 unpaid hrs/wk.
              </p>
            </div>

            {/* Vacation & Sick Weeks */}
            <div>
              <label htmlFor="vacationWeeks" className="block text-xs font-semibold text-slate-700 mb-1">
                Unpaid Time Off (Vacation + Sick Weeks)
              </label>
              <div className="relative rounded-lg shadow-sm">
                <input
                  type="number"
                  id="vacationWeeks"
                  min="0"
                  max="20"
                  value={vacationWeeks}
                  onChange={(e) => setVacationWeeks(parseInt(e.target.value) || 0)}
                  className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {calculations.workingWeeks} active working weeks per year.
              </p>
            </div>

            {/* Annual Expenses */}
            <div>
              <label htmlFor="annualExpenses" className="block text-xs font-semibold text-slate-700 mb-1">
                Annual Business Overhead ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="annualExpenses"
                  step="500"
                  min="0"
                  value={annualExpenses === 0 ? "" : annualExpenses}
                  onChange={(e) => setAnnualExpenses(parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Laptop, software, health insurance, co-working.</p>
            </div>
          </div>

          {/* Tax & Buffer Sliders */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <label htmlFor="tax-rate">Estimated Tax Reserve Rate</label>
                <span className="text-emerald-700">{taxRate}%</span>
              </div>
              <input
                type="range"
                id="tax-rate"
                min="10"
                max="45"
                value={taxRate}
                onChange={(e) => setTaxRate(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
              />
              <span className="text-[10px] text-slate-400">
                Self-employment tax + Federal/State or regional income tax.
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <label htmlFor="profit-buff">Business Growth Buffer (Emergency Reserve)</label>
                <span className="text-emerald-700">{profitBuffer}%</span>
              </div>
              <input
                type="range"
                id="profit-buff"
                min="0"
                max="30"
                value={profitBuffer}
                onChange={(e) => setProfitBuffer(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
              />
              <span className="text-[10px] text-slate-400">
                Protects against late client payments and dry spells.
              </span>
            </div>
          </div>
        </div>

        {/* Right Output & Summary (5 Cols) */}
        <div className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-gradient-to-b from-slate-50/80 to-white p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Rate Target
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-md transition shadow-2xs hover:bg-slate-50"
                  title="Print rate card"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md transition border border-emerald-200"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Report"}
                </button>
              </div>
            </div>

            {/* Hero Hourly Display */}
            <div className="rounded-xl p-5 border bg-emerald-50/90 border-emerald-200 text-emerald-950 text-center">
              <span className="text-xs font-semibold tracking-wider uppercase opacity-80">
                Minimum Hourly Rate
              </span>
              <div className="text-4xl font-black tracking-tight my-1 text-emerald-900">
                {formatCurrency(calculations.hourlyRate, currency.symbol, 0)}/hr
              </div>
              <div className="text-xs font-semibold text-emerald-700 mt-1">
                Equivalent Day Rate: {formatCurrency(calculations.dayRate, currency.symbol, 0)}/day
              </div>
            </div>

            {/* Visual Revenue Distribution Bar */}
            {calculations.totalGrossRevenueNeeded > 0 && (
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Gross Billing Breakdown</span>
                  <span>{formatCurrency(calculations.totalGrossRevenueNeeded, currency.symbol, 0)}/yr</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.salary)}%` }} 
                    className="bg-emerald-500 transition-all duration-300"
                    title={`Salary: ${calculations.distribution.salary.toFixed(1)}%`}
                  />
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.tax)}%` }} 
                    className="bg-rose-500 transition-all duration-300"
                    title={`Taxes: ${calculations.distribution.tax.toFixed(1)}%`}
                  />
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.expenses)}%` }} 
                    className="bg-slate-400 transition-all duration-300"
                    title={`Expenses: ${calculations.distribution.expenses.toFixed(1)}%`}
                  />
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.buffer)}%` }} 
                    className="bg-amber-400 transition-all duration-300"
                    title={`Buffer: ${calculations.distribution.buffer.toFixed(1)}%`}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Net Salary ({calculations.distribution.salary.toFixed(0)}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span> Taxes ({calculations.distribution.tax.toFixed(0)}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-slate-400"></span> Exp ({calculations.distribution.expenses.toFixed(0)}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-400"></span> Reserve ({calculations.distribution.buffer.toFixed(0)}%)
                  </span>
                </div>
              </div>
            )}

            {/* Breakdown lines */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Annual Billable Hours:</span>
                <span className="font-semibold text-slate-900">
                  {calculations.annualBillableHours.toLocaleString()} hours
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Target Net Take-Home:</span>
                <span className="font-medium text-slate-900">
                  {formatCurrency(desiredSalary, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Estimated Tax Reserve ({taxRate}%):</span>
                <span className="font-medium text-rose-600">
                  {formatCurrency(calculations.totalTaxes, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Business Overhead:</span>
                <span className="font-medium text-slate-800">
                  {formatCurrency(annualExpenses, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Growth / Buffer Reserve:</span>
                <span className="font-medium text-emerald-700">
                  {formatCurrency(calculations.bufferAmount, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 font-bold text-slate-900">
                <span>Monthly Invoicing Goal:</span>
                <span className="text-emerald-800">
                  {formatCurrency(calculations.monthlyGrossTarget, currency.symbol, 0)}/mo
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
            <p>
              💡 <strong>Negotiation Rule:</strong> Never quote an hourly rate without specifying minimum weekly hours or converting to a weekly/monthly retainer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
