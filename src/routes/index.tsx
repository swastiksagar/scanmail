import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { analyzeEmail, type AnalysisResult, type Severity } from "@/lib/phishing-analyzer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Phishing Email Checker — Scan Any Email Free | PhishGuard" },
      {
        name: "description",
        content:
          "Paste a suspicious email and get an instant risk score with every red flag explained — sender spoofing, fake links, urgent language. Free and private.",
      },
      {
        property: "og:title",
        content: "Phishing Email Checker — Scan Any Email Free",
      },
      {
        property: "og:description",
        content:
          "Instant phishing risk score for any email you paste, with each red flag explained. No signup, nothing leaves your browser.",
      },
      { property: "og:url", content: "https://phishemail.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://phishemail.lovable.app/" }],
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
  if (sev === "high") return "border-danger/40 bg-danger/5 text-danger";
  if (sev === "medium") return "border-warn/40 bg-warn/5 text-warn";
  return "border-border bg-secondary text-muted-foreground";
}

function verdictTheme(v: AnalysisResult["verdict"]) {
  if (v === "Likely Phishing") return { color: "text-danger", bar: "bg-danger" };
  if (v === "Suspicious") return { color: "text-warn", bar: "bg-warn" };
  return { color: "text-safe", bar: "bg-safe" };
}

function Home() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const result = useMemo(() => (submitted ? analyzeEmail(submitted) : null), [submitted]);

  return (
    <div className="min-h-screen text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-4">
          <span className="grid h-6 w-6 place-items-center border border-border-hard font-mono text-[11px] font-bold">
            P
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">
            PhishGuard / Email Checker
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-16">
        <section>
          <p className="fig-label">FIG_000 · heuristic scanner v1.0 · 2026 · client-side · free</p>
          <h1 className="mt-4 text-balance text-5xl leading-[1.06] sm:text-6xl">
            Phishing Email
            <br />
            <span className="text-muted-foreground/70">Checker</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Paste any suspicious message — headers, body, links, the works. Every scan returns a
            risk score, a plain "why this is a flag" line, and a term-by-term breakdown of exactly
            what tripped.
          </p>
          <p className="mt-5 max-w-2xl font-mono text-[13px] leading-relaxed text-muted-foreground">
            Organized the way an analyst triages: sender forensics, link intelligence, language
            pressure, payload risk. Nothing is uploaded. It runs on your own machine, in your own
            browser.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#scanner"
              className="border border-foreground bg-foreground px-5 py-2.5 font-mono text-[13px] text-background transition hover:opacity-85"
            >
              Scan an email →
            </a>
            <Link
              to="/blog/how-to-spot-a-phishing-email"
              className="border border-border-hard px-5 py-2.5 font-mono text-[13px] transition hover:bg-secondary"
            >
              Read the guide
            </Link>
          </div>
        </section>

        <section id="scanner" className="mt-16 border-t border-border pt-12" aria-labelledby="scanner-heading">
          <p className="fig-label">FIG_001 · the scanner</p>
          <h2 id="scanner-heading" className="mt-3 text-2xl">
            Paste the email
          </h2>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                Raw message
              </label>
              <div className="flex gap-2 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setInput(SAMPLE)}
                  className="border border-border px-2.5 py-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  Load example
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInput("");
                    setSubmitted(null);
                  }}
                  className="border border-border px-2.5 py-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              id="email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={"From: ...\nSubject: ...\n\n(body)"}
              className="mt-3 h-72 w-full resize-y border border-border-hard bg-background p-4 font-mono text-[13px] leading-relaxed text-foreground outline-none placeholder:text-faint focus:border-primary"
              spellCheck={false}
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="font-mono text-[11px] text-muted-foreground">
                {input.length.toLocaleString()} characters
              </p>
              <button
                type="button"
                disabled={input.trim().length < 10}
                onClick={() => setSubmitted(input)}
                className="border border-foreground bg-foreground px-5 py-2.5 font-mono text-[13px] text-background transition hover:opacity-85 disabled:opacity-30"
              >
                Analyze email →
              </button>
            </div>
          </div>

          <div className="mt-10">{result ? <ResultPanel result={result} /> : <EmptyPanel />}</div>
        </section>

        <section className="mt-16 border-t border-border pt-12" aria-labelledby="features-heading">
          <p className="fig-label">FIG_002 · what gets checked</p>
          <h2 id="features-heading" className="mt-3 text-2xl">
            Key security checks
          </h2>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            {[
              {
                title: "Sender forensics",
                body: "Detects display-name spoofing, Reply-To mismatches, and brand impersonation from free email accounts.",
              },
              {
                title: "Link intelligence",
                body: "Flags look-alike domains, punycode, URL shorteners, raw IPs, and hidden mismatched hyperlinks.",
              },
              {
                title: "Private by design",
                body: "Analysis runs entirely in your browser. Your email content never leaves this page.",
              },
            ].map((f, i) => (
              <div key={f.title} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                  {String(i + 1).padStart(2, "0")} · {f.title}
                </dt>
                <dd className="text-[15px] leading-relaxed text-muted-foreground">{f.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16 border-t border-border pt-12" aria-labelledby="learn-heading">
          <p className="fig-label">FIG_003 · further reading</p>
          <h2 id="learn-heading" className="mt-3 text-2xl">
            Learn to spot phishing yourself
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            The guide walks through the 10 red flags in a phishing email, how to read message
            headers, and exactly what to do if you already clicked a link.
          </p>
          <Link
            to="/blog/how-to-spot-a-phishing-email"
            className="mt-5 inline-flex border-b border-primary font-mono text-[13px] text-primary transition hover:opacity-70"
          >
            How to spot a phishing email →
          </Link>
        </section>

        <section className="mt-16 border-t border-border pt-8">
          <p className="max-w-2xl font-mono text-[12px] leading-relaxed text-muted-foreground">
            <span className="text-warn">Heads up —</span> PhishGuard is a heuristic aid, not a
            verdict. When in doubt, do not click links or reply; verify the sender through an
            independent, trusted channel.
          </p>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-3xl px-6 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
          Built for safer inboxes · PhishGuard runs 100% client-side
        </div>
      </footer>
    </div>
  );
}

function EmptyPanel() {
  return (
    <div className="border border-dashed border-border-hard p-8 text-center">
      <p className="fig-label">Awaiting scan</p>
      <p className="mx-auto mt-2 max-w-sm text-[15px] text-muted-foreground">
        Paste an email above and hit <span className="text-foreground">Analyze</span> to see the
        full risk breakdown here.
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
