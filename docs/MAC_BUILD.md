# Apple Silicon Mac build

Requires macOS, Node.js 22, npm, and Xcode command line tools.

```sh
npm ci --ignore-scripts
node node_modules/electron/install.js
npm run desktop:dist
```

The output is `release/FretFlow-1.0.0-alpha.2-mac-arm64.zip` plus a `.sha256` file. Extract the ZIP to obtain `FretFlow.app`. This build runs from bundled local files; a Vite server is not needed. It includes the FretFlow app icon and asks for microphone access when the tuner requests audio. Microphone input stays local.

The build script signs in a temporary folder, verifies the app, archives it, and verifies an extracted copy. Keep the ZIP intact when transferring it; synced folders can attach metadata to an expanded app and invalidate its signature.

## Signing status

This package is **ad hoc signed, not Developer ID signed or Apple notarized**. Local signature validation is not proof that Gatekeeper will accept an internet download on another Mac. The browser demo is available without installing this package.

Before distributing a normal public Mac download, configure a Developer ID identity, use the appropriate distribution entitlements, notarize and staple the package, and test the downloaded copy on a clean Mac. No signing credentials belong in this repository. [electron-builder's signing guide](https://www.electron.build/v26/docs/features/code-signing/code-signing-mac/) describes that workflow.

## Checks performed

- TypeScript and production build passed.
- Strict signature verification passed on the app and extracted ZIP copy.
- Packaged local notation, desktop bridge, logo, corrected title, and synthesized guitar audio were checked.
- The live browser's countdown, advancing playback, and nonzero guitar samples were checked separately.

Live microphone capture, native file import/export, listening quality, Intel Mac support, and a clean-machine Gatekeeper check remain unverified.
