"use client";
import { useState } from "react";
import { generateFAQsFromDescription } from "./generateFAQsFromDescription";

export default function Home() {
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [desc, setDesc] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setFaqs([]);
    setError("");
    setCopySuccess(false);

    const formData = new FormData(event.currentTarget);
    // Server action call
    const result = await generateFAQsFromDescription(formData);
    setLoading(false);
    if (result.error) setError(result.error);
    setFaqs(result.faqs || []);
  }

  async function handleCopy() {
    if (!faqs.length) return;
    const text = faqs
      .map(({ q, a }) => `Q: ${q}\nA: ${a}\n`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-[#ffe6d8] text-zinc-900">
      <main className="flex min-h-screen w-full flex-col gap-12 px-6 py-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[#fb7232]/30 bg-white px-5 py-2 shadow-sm">
              <span className="text-2xl font-black tracking-tight text-[#fb7232]">Faqlio</span>
            </div>
            <p className="text-sm font-medium text-[#c75829] sm:text-base">
              AI FAQ Generator for SaaS founders.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end w-full sm:w-auto">
            <a
              href="https://nextjs.org/docs"
              className="w-full sm:w-auto text-center rounded-full border border-[#fb7232]/30 bg-white px-4 py-2 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Docs
            </a>
            <a
              href="https://vercel.com/new"
              className="w-full sm:w-auto text-center rounded-full bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
            >
              Deploy
            </a>
          </div>
        </header>

        <section className="grid min-h-[520px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232] shadow-sm">
              AI-Powered FAQ Generator
            </p>
            <h1 className="text-4xl font-black leading-tight text-[#3f1b08] sm:text-5xl">
              Instantly generate meaningful FAQs for your SaaS landing page with AI.
            </h1>
            <p className="max-w-3xl text-lg leading-7 text-zinc-700">
              Enter your product description, and Faqlio will generate visitor-ready FAQs with answers—saving you time and improving your conversion rate.
            </p>
            <form
              className="flex flex-col gap-4 w-full max-w-xl"
              onSubmit={onSubmit}
              autoComplete="off"
            >
              <label htmlFor="description" className="text-sm font-semibold text-[#fb7232]">
                Paste your product description
              </label>
              <textarea
                id="description"
                name="description"
                className="rounded-lg border border-[#fb7232]/30 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm min-h-[90px] focus:outline-none focus:ring-2 focus:ring-[#fb7232]/30 resize-none"
                required
                minLength={12}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Describe your SaaS product — what does it do? Who's it for? Main value?"
                disabled={loading}
              />
              <button
                type="submit"
                className="rounded-lg bg-[#fb7232] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md disabled:bg-[#fb7232]/60"
                disabled={loading || desc.trim().length < 12}
              >
                {loading ? "Generating FAQs..." : "Generate FAQs"}
              </button>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {error}
                </div>
              )}
            </form>

            <div className="flex flex-col gap-4 pt-1">
              <div className="flex gap-3">
                <span className="rounded-full bg-[#fb7232] px-3 py-1 text-xs font-medium text-white">
                  1. Paste Description
                </span>
                <span className="rounded-full bg-[#fb7232] px-3 py-1 text-xs font-medium text-white">
                  2. Generate FAQs
                </span>
                <span className="rounded-full bg-[#fb7232] px-3 py-1 text-xs font-medium text-white">
                  3. Copy to Clipboard!
                </span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#fb7232]/30 bg-white shadow-md flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffe7dd] via-white to-[#ffd9c6] opacity-70" aria-hidden />
            <div className="relative p-6 flex-1 flex flex-col">
              <h2 className="mb-4 text-lg font-bold text-[#c75829]">Generated FAQs</h2>
              <ol className="space-y-5 list-decimal list-inside min-h-[210px]">
                {faqs.length > 0 ? (
                  faqs.map((faq, i) => (
                    <li key={i} className="bg-white/80 rounded-lg p-4 shadow ring-1 ring-[#fb7232]/15">
                      <p className="font-bold text-[#fb7232]">Q: {faq.q}</p>
                      <p className="text-zinc-700 mt-1">A: {faq.a}</p>
                    </li>
                  ))
                ) : (
                  <li className="italic text-zinc-400">FAQs appear here after generation.</li>
                )}
              </ol>
              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-lg border border-[#fb7232]/30 bg-[#fb7232] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md disabled:bg-[#fb7232]/60"
                onClick={handleCopy}
                disabled={!faqs.length}
              >
                {copySuccess ? "Copied!" : "Copy All FAQs"}
              </button>
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="rounded-2xl border border-[#fb7232]/15 bg-gradient-to-br from-white via-[#fff5ee] to-white px-6 py-12 text-[#33170a] shadow-sm sm:px-12"
        >
          <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232]">About Faqlio</p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">For SaaS makers who launch fast</h2>
              <p className="text-base text-[#6a3515]">
                Perfect for product teams and indie hackers: ship your next landing page with smart, conversion-optimized FAQs in minutes.
              </p>
            </div>

            <div className="grid gap-4 rounded-xl border border-[#fb7232]/20 bg-white/80 p-6 text-sm shadow-sm sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c75829]">Contact</p>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="mailto:hi@chirag.co">
                  hi@chirag.co
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c75829]">Resources</p>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="https://github.com/">
                  GitHub
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="https://nextjs.org/docs">
                  Docs
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center border-t border-[#fb7232]/15 pt-6 text-center text-xs text-[#6a3515]">
            <span>
              Built by Chirag Dodiya • MIT licensed • Ready for your conversion lift
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}