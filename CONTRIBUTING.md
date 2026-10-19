# Contributing to FretFlow

FretFlow is an early alpha guitar practice app. Contributions that make practice more dependable, accessible, and available without paywalls are welcome.

Before starting, read [known issues](docs/KNOWN_ISSUES.md) and the [roadmap](docs/ROADMAP.md). Search existing issues and discuss substantial changes before implementing them. Small, focused pull requests are easiest to review.

## Local development

Use Node.js 22 and npm. From the repository root:

```sh
npm ci --ignore-scripts
npm run dev
```

For a production build:

```sh
npm run build
```

The build checks TypeScript and creates the Vite production bundle. It does not prove audio playback, microphone access, import compatibility, or packaged macOS behavior. Exercise the workflow your change affects and describe the environment and results in your pull request.

## Pull requests

- Describe the problem, the resulting behavior, and how you checked it.
- Include screenshots for visible interface changes and reproduction files when redistribution is permitted.
- Keep unrelated formatting and dependency upgrades separate.
- Do not commit credentials, private scores, personal paths, local model files, generated builds, or user data.
- Use original or suitably licensed examples and assets. Include source, author, and license information for third-party additions.
- Follow the repository's GPL-3.0-only license for first-party code. Third-party material retains its own license.

The current CI performs a production build only. Report manual checks honestly and identify anything you could not test.
