import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "How to Spot a Phishing Email: 10 Red Flags (2026 Guide)";
const DESCRIPTION =
  "Spot a phishing email fast: 10 red flags including spoofed senders, look-alike domains, hidden links and urgent language — plus what to do if you clicked.";
const URL = "https://phishemail.lovable.app/blog/how-to-spot-a-phishing-email";

export const Route = createFileRoute("/blog/how-to-spot-a-phishing-email")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "PhishGuard" },
          publisher: { "@type": "Organization", name: "PhishGuard" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How can I tell if an email is phishing?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Check the full sender address (not the display name), hover every link to see its real destination, look for urgency or threats, and be suspicious of any request for passwords, payment details, or gift cards. A single red flag is worth a second look; two or more usually means phishing.",
              },
            },
            {
              "@type": "Question",
              name: "What should I do if I clicked a phishing link?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Disconnect from the network if you downloaded anything, change the password for the affected account from a different device, enable two-factor authentication, run a malware scan, and report the email to your IT or security team.",
              },
            },
            {
              "@type": "Question",
              name: "Are phishing emails always full of typos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Modern phishing — especially AI-assisted and spear-phishing campaigns — is often flawless in grammar and closely copies real brand templates. Judge the sender domain, links, and the request itself rather than the writing quality.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: GuidePage,
});

const FLAGS = [
  {
    title: "The sender domain is almost right",
    body: "Attackers register look-alike domains: paypa1-verify.com, micros0ft-support.net, or a real brand as a subdomain of their own domain (paypal.com.secure-login.ru). Read the address from right to left — the part just before the first single slash is the real domain.",
  },
  {
    title: "The display name doesn't match the address",
    body: "\"Microsoft Account Team\" sent from a random Gmail or free webmail address is a classic spoof. Mail clients hide the actual address by default, so expand the header before you trust it.",
  },
  {
    title: "Reply-To points somewhere else",
    body: "A legitimate From with a Reply-To on an unrelated domain means your reply — and anything you send in it — goes to the attacker.",
  },
  {
    title: "Manufactured urgency or threats",
    body: "\"Your account will be closed in 24 hours\", \"final warning\", \"immediate action required\". Urgency exists to stop you from checking. Real companies rarely destroy your account over an unanswered email.",
  },
  {
    title: "Link text doesn't match the link target",
    body: "HTML email lets any text hide any URL. Hover (desktop) or long-press (mobile) to preview the destination. A link that reads https://www.paypal.com but resolves to a raw IP or shortener is phishing.",
  },
  {
    title: "Shorteners, raw IPs, and odd file paths",
    body: "bit.ly links, http://192.168.x.x addresses, and long random paths in transactional email are strong signals. Legitimate senders link to their own documented domains.",
  },
  {
    title: "Unexpected attachments",
    body: ".html, .htm, .iso, .img, .zip with a script inside, or an Office file demanding you \"enable content\" — all common malware carriers. Invoices you never ordered are the most common lure.",
  },
  {
    title: "It asks for credentials, payment, or codes",
    body: "No bank, employer, or platform will ask you to confirm a password, full card number, or one-time code by email. A request for gift cards or a same-day wire transfer is fraud, full stop.",
  },
  {
    title: "Generic or slightly wrong greeting",
    body: "\"Dear Customer\" or \"Dear user@example.com\" from a service that knows your name is a bulk-phish tell. Note the inverse too: spear-phishing uses your real name and job title from LinkedIn.",
  },
  {
    title: "It doesn't fit the context",
    body: "A password reset you didn't request, a shipping notice for nothing you ordered, a CEO messaging you directly about a confidential purchase. Out-of-band verification — a phone call to a number you already have — resolves all of these in a minute.",
  },
];

function GuidePage() {
  return (
    <div className="min-h-screen text-foreground">
      <header className="border-b border-border/50">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-lg font-bold tracking-tight">
            PhishGuard
          </Link>
          <Link
            to="/"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Check an email
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-12">
        <article>
          <p className="text-xs uppercase tracking-widest text-primary">Security guide</p>
          <h1 className="mt-3 text-balance text-4xl font-bold leading-tight sm:text-5xl">
            How to spot a phishing email
          </h1>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">
            Phishing still starts the majority of breaches, and modern attempts are polished — no
            typos, real logos, correct branding. Here are the ten signals that actually hold up,
            what to do when you find one, and how to recover if you already clicked.
          </p>

          <section className="mt-12" aria-labelledby="red-flags">
            <h2 id="red-flags" className="font-display text-2xl font-bold">
              10 red flags in a phishing email
            </h2>
            <ol className="mt-6 space-y-5">
              {FLAGS.map((f, i) => (
                <li key={f.title} className="glass-card rounded-2xl p-5">
                  <h3 className="text-base font-semibold">
                    <span className="mr-2 text-primary">{i + 1}.</span>
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14" aria-labelledby="check-headers">
            <h2 id="check-headers" className="font-display text-2xl font-bold">
              How to check the email headers
            </h2>
            <p className="mt-3 text-muted-foreground">
              The visible message is styled by the sender; the headers are not. In Gmail open the
              three-dot menu and choose <em>Show original</em>; in Outlook use{" "}
              <em>File → Properties → Internet headers</em>; in Apple Mail use{" "}
              <em>View → Message → All Headers</em>. Then look for:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Return-Path / Reply-To</strong> — should match
                the visible From domain.
              </li>
              <li>
                <strong className="text-foreground">SPF, DKIM, DMARC</strong> — anything other than{" "}
                <code className="font-mono text-xs">pass</code> on a supposedly big-brand email is a
                serious warning.
              </li>
              <li>
                <strong className="text-foreground">Received chain</strong> — read it bottom-up; the
                first hop reveals where the message really originated.
              </li>
            </ul>
          </section>

          <section className="mt-14" aria-labelledby="types">
            <h2 id="types" className="font-display text-2xl font-bold">
              Types of phishing worth knowing
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold">Spear phishing</dt>
                <dd className="text-muted-foreground">
                  Targeted at you personally using real details about your job and colleagues.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Business email compromise (BEC)</dt>
                <dd className="text-muted-foreground">
                  An executive or supplier "asks" for an urgent payment or changed bank details.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Clone phishing</dt>
                <dd className="text-muted-foreground">
                  A real email you received before, resent with the links or attachment swapped.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Smishing and vishing</dt>
                <dd className="text-muted-foreground">
                  The same playbook over SMS or a phone call, often as a follow-up to the email.
                </dd>
              </div>
            </dl>
          </section>

          <section className="mt-14" aria-labelledby="clicked">
            <h2 id="clicked" className="font-display text-2xl font-bold">
              What to do if you already clicked
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Disconnect from the network if you downloaded or opened a file.</li>
              <li>
                Change the password for the affected account from a different, trusted device — and
                anywhere you reused it.
              </li>
              <li>Turn on two-factor authentication, preferably with an app or hardware key.</li>
              <li>Run a full malware scan and check for new mail forwarding rules or app grants.</li>
              <li>
                Report it to your IT/security team, the impersonated brand, and your national
                reporting body; then delete the message.
              </li>
            </ol>
          </section>

          <section className="mt-14" aria-labelledby="faq">
            <h2 id="faq" className="font-display text-2xl font-bold">
              Frequently asked questions
            </h2>
            <div className="mt-4 space-y-5 text-sm">
              <div>
                <h3 className="font-semibold">Are phishing emails always full of typos?</h3>
                <p className="mt-1 text-muted-foreground">
                  No. AI-assisted campaigns are grammatically clean and copy brand templates
                  precisely. Judge the sender domain, the links, and the request — not the writing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Is opening a phishing email dangerous?</h3>
                <p className="mt-1 text-muted-foreground">
                  Simply reading it is usually safe in a modern mail client. The risk comes from
                  clicking links, opening attachments, enabling content, or replying.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Can I trust an email because it has a padlock/HTTPS link?</h3>
                <p className="mt-1 text-muted-foreground">
                  No. HTTPS certificates are free and most phishing pages have one. It proves
                  encryption, not honesty.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-14 rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center">
            <h2 className="font-display text-xl font-bold">Not sure about an email you received?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Paste it into the free PhishGuard checker for an instant risk score and a breakdown of
              every red flag. Nothing leaves your browser.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Check an email now
            </Link>
          </section>
        </article>
      </main>

      <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
        Built for safer inboxes · PhishGuard runs 100% client-side
      </footer>
    </div>
  );
}
