# ScanMail — Phishing Email Checker

*A free, privacy-first tool that analyzes suspicious emails and tells you how risky they are.*

## What it does

*Paste a raw email (headers, body, links) and ScanMail scores it for phishing risk in seconds — no account, no upload, nothing leaves your browser.*

The analyzer checks for:

- *Reply-To mismatches and display-name spoofing*
- *Malicious URL patterns: IP hosts, link shorteners, punycode, deep subdomains, look-alike domains*
- *Urgency and pressure language*
- *Credential and payment requests*
- *Risky attachment types*
- *Generic greetings and other social-engineering red flags*

## Pages

- */ — the scanner: paste an email, get a risk score with a breakdown of every finding (HIGH / MEDIUM / LOW)*
- */blog/how-to-spot-a-phishing-email — an educational guide covering 10 red flags, how to read email headers, and what to do if you clicked*

## Tech

- *Built with [Lovable](https://lovable.dev) on TanStack Start (React 19) with Tailwind CSS v4*
- *The analysis engine lives in `src/lib/phishing-analyzer.ts` and runs entirely client-side*
- *Editorial design: Source Serif 4 headings, Inter body, JetBrains Mono labels*

## Development

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

*Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4c86ccbf-eeb6-4df1-8bbb-0bc9d55590ac).*
