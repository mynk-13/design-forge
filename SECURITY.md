# Security Policy

## Supported Versions

Only the latest published version of each package receives security fixes.

| Package | Supported |
|---|---|
| `@designforge/ui` | ✅ latest |
| `@designforge/themes` | ✅ latest |
| `@designforge/hooks` | ✅ latest |
| `@designforge/icons` | ✅ latest |
| `@designforge/ai` | ✅ latest |

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Use GitHub's private vulnerability reporting to disclose findings confidentially:

1. Go to the [Security tab](https://github.com/mynk-13/design-forge/security/advisories/new) of this repository
2. Click **"Report a vulnerability"**
3. Fill in the advisory form with as much detail as possible

This keeps the report private between you and the maintainer until a fix is ready.

### What to include

- A clear description of the vulnerability
- Steps to reproduce
- The affected package(s) and version(s)
- Potential impact (data exposure, denial of service, etc.)
- Any proof-of-concept code or reproduction case

## Response Timeline

| Stage | Target |
|---|---|
| Acknowledgement | Within 48 hours |
| Initial assessment | Within 5 business days |
| Fix or mitigation | Varies by severity (critical: as fast as possible) |
| Public disclosure | After fix is released |

## Scope

### In scope

- Security issues in any published `@designforge/*` npm package
- Vulnerabilities in the docs application API routes (`/api/generate`, `/api/validate`, `/api/search`, `/api/tokens`, `/api/types`)
- Dependency vulnerabilities with exploitable attack vectors in this project's context

### Out of scope

- Vulnerabilities in third-party dependencies that have no exploitable path in this project
- Issues that require physical access to the machine
- Social engineering attacks
- Rate limit bypass via multiple requests (the anonymous rate limiter is a best-effort control; per-instance limitations are a known, documented trade-off for v1.0)
- Denial-of-service via extremely large payloads (already mitigated at the application layer)

## Preferred Languages

Reports in English are preferred.

## Acknowledgements

Responsibly disclosed vulnerabilities will be credited in the release notes of the corresponding fix (unless the reporter prefers to remain anonymous).
