import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { analyzeEmail, type AnalysisResult, type Severity } from "@/lib/phishing-analyzer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PhishGuard — Free Phishing Email Checker" },
      {
        name: "description",
        content:
          "Paste any suspicious email and get an instant phishing risk score with a breakdown of red flags. Free, private, runs entirely in your browser.",
      },
      { property: "og:title", content: "PhishGuard — Free Phishing Email Checker" },
      {
        property: "og:description",
        content:
          "Instant phishing risk analysis. Detects spoofed senders, malicious links, urgency tactics and more — right in your browser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const SAMPLE = `From: PayPal Security <security-alert@paypa1-verify.com>
Reply-To: recover@mail-secure.ru
Subject: URGENT: Your account has been LIMITED!!!

Dear Customer,

We detected unauthorized activity on your PayPal account. Your account has been
suspended and will be permanently locked within 24 hours unless you verify your
identity IMMEDIATELY.

Please confirm your password and credit card here:
<a href="http://192.168.44.10/paypa1-login/verify">https://www.paypal.com/signin</a>

Or use the short link: https://bit.ly/3xR-verify

Act now to avoid permanent closure of your account!!!
`;

function severityStyles(sev: Severity) {
  if (sev === "high") return "bg-danger/15 text-danger border-danger/40";
  if (sev === "medium") return "bg-warn/15 text-warn border-warn/40";
  return "bg-muted text-muted-foreground border-border";
}

function verdictTheme(v: AnalysisResult["verdict"]) {
  if (v === "Likely Phishing") return { color: "text-danger", ring: "ring-danger/50", bar: "bg-danger" };
  if (v === "Suspicious") return { color: "text-warn", ring: "ring-warn/50", bar: "bg-warn" };
  return { color: "text-safe", ring: "ring-safe/50", bar: "bg-safe" };
}

function Home() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const result = useMemo(() => (submitted ? analyzeEmail(submitted) : null), [submitted]);

  return (
    <div className="min-h-screen text-foreground">
      <header className="border-b border-border/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 ring-1 ring-primary/40">
              <ShieldIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-tight">PhishGuard</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Email Threat Scanner
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-safe" />
            100% client-side · nothing is uploaded
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-14">
        <section className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <SparkIcon className="h-3.5 w-3.5" />
            Free · No signup · No data leaves your device
          </div>
          <h1 className="mt-5 text-balance text-5xl font-bold leading-[1.05] sm:text-6xl">
            Is that email a{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.75_0.18_260)] bg-clip-text text-transparent">
              phishing attempt?
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Paste any suspicious message — headers, body, links, the works. Get a risk score in
            milliseconds with a breakdown of every red flag we find.
          </p>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="glass-card rounded-2xl p-5 lg:col-span-3">
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="text-sm font-semibold">
                Suspicious email
              </label>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setInput(SAMPLE)}
                  className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-muted-foreground transition hover:text-foreground"
                >
                  Load example
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInput("");
                    setSubmitted(null);
                  }}
                  className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-muted-foreground transition hover:text-foreground"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              id="email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={"Paste the full email here — include the From, Subject, and body.\n\nExample:\nFrom: ...\nSubject: ...\n\n(body)"}
              className="mt-3 h-80 w-full resize-y rounded-xl border border-border bg-input/60 p-4 font-mono text-sm text-foreground outline-none ring-primary/40 placeholder:text-muted-foreground/70 focus:ring-2"
              spellCheck={false}
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {input.length.toLocaleString()} characters
              </p>
              <button
                type="button"
                disabled={input.trim().length < 10}
                onClick={() => setSubmitted(input)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
              >
                <ScanIcon className="h-4 w-4" />
                Analyze email
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            {result ? <ResultPanel result={result} /> : <EmptyPanel />}
          </div>
        </section>

        <section className="mt-20 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: <FingerprintIcon className="h-5 w-5" />,
              title: "Sender forensics",
              body: "Detects display-name spoofing, Reply-To mismatches, and brand impersonation from free email accounts.",
            },
            {
              icon: <LinkIcon className="h-5 w-5" />,
              title: "Link intelligence",
              body: "Flags look-alike domains, punycode, URL shorteners, raw IPs, and hidden mismatched hyperlinks.",
            },
            {
              icon: <LockIcon className="h-5 w-5" />,
              title: "Private by design",
              body: "Analysis runs entirely in your browser. Your email content never leaves this page.",
            },
          ].map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                {f.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-2xl border border-warn/30 bg-warn/5 p-5 text-sm text-muted-foreground">
          <strong className="text-warn">Heads up:</strong> PhishGuard is a heuristic aid, not a
          verdict. When in doubt, do not click links or reply — verify the sender through an
          independent, trusted channel.
        </section>
      </main>

      <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
        Built for safer inboxes · PhishGuard runs 100% client-side
      </footer>
    </div>
  );
}

function EmptyPanel() {
  return (
    <div className="glass-card flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl p-8 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/30">
        <ShieldIcon className="h-7 w-7 text-primary" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">Awaiting scan</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        Paste an email on the left and hit <span className="text-foreground">Analyze</span> to see
        a full risk breakdown here.
      </p>
    </div>
  );
}

function ResultPanel({ result }: { result: AnalysisResult }) {
  const theme = verdictTheme(result.verdict);
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Verdict</div>
          <div className={`mt-1 font-display text-2xl font-bold ${theme.color}`}>
            {result.verdict}
          </div>
        </div>
        <div
          className={`grid h-20 w-20 shrink-0 place-items-center rounded-full bg-card ring-4 ${theme.ring}`}
        >
          <div className="text-center leading-none">
            <div className={`text-2xl font-bold ${theme.color}`}>{result.score}</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              risk
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full ${theme.bar} transition-all`}
          style={{ width: `${result.score}%` }}
        />
      </div>

      {(result.stats.fromDomain || result.stats.subject) && (
        <dl className="mt-5 grid grid-cols-1 gap-2 text-xs">
          {result.stats.subject && (
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-muted-foreground">Subject</dt>
              <dd className="truncate font-mono">{result.stats.subject}</dd>
            </div>
          )}
          {result.stats.fromDomain && (
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-muted-foreground">From domain</dt>
              <dd className="truncate font-mono">{result.stats.fromDomain}</dd>
            </div>
          )}
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-muted-foreground">Links</dt>
            <dd className="font-mono">
              {result.stats.urls.length} found ·{" "}
              <span className={result.stats.suspiciousUrls.length ? "text-danger" : "text-safe"}>
                {result.stats.suspiciousUrls.length} suspicious
              </span>
            </dd>
          </div>
        </dl>
      )}

      <div className="mt-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Findings ({result.findings.length})
        </div>
        <ul className="space-y-2">
          {result.findings.map((f) => (
            <li
              key={f.id}
              className={`rounded-lg border px-3 py-2.5 text-sm ${severityStyles(f.severity)}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{f.title}</span>
                <span className="text-[10px] uppercase tracking-wider opacity-80">
                  {f.severity}
                </span>
              </div>
              <p className="mt-1 text-xs opacity-90">{f.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Icons ---------- */
function ShieldIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function ScanIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M3 12h18" />
    </svg>
  );
}
function SparkIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2 13.9 8.1 20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2z" />
    </svg>
  );
}
function FingerprintIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 11v3a10 10 0 0 1-2 6" />
      <path d="M16 11a4 4 0 0 0-8 0v3a11 11 0 0 1-3 7.5" />
      <path d="M20 11a8 8 0 0 0-14.5-4.6" />
      <path d="M4 15a10 10 0 0 0 .5 3" />
    </svg>
  );
}
function LinkIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </svg>
  );
}
function LockIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
