# Security

FretFlow is alpha software. The current development line is the focus of security fixes; there is no established long-term support schedule.

## Reporting a vulnerability

If GitHub private vulnerability reporting is enabled for this repository, use the repository's **Security → Advisories → Report a vulnerability** action.

If that action is unavailable, open an issue asking the maintainer for a private reporting channel. Include no exploit details, credentials, private files, or other sensitive information in that public request. Wait for a private channel before sharing those details.

In a private report, include the affected version or commit, operating system, reproduction steps, expected impact, and a minimal example where possible. Do not include personal scores or microphone recordings unless necessary and you have permission to share them.

## Data and local services

The app stores preferences and imported scores locally. The current interface does not include an AI service. Tuner audio is processed locally in the current source. Dependency installation needs internet access; see [privacy and local data](docs/PRIVACY.md).

Production builds and CI are not security audits. Desktop permissions, imported files, dependency updates, and storage handling remain areas to review as the project develops.
