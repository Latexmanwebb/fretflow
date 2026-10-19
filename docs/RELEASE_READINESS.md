# Release readiness — 2026-10-19

## Rebuilt alpha.2 package — 2026-10-19

The original audit below is retained as history. A fresh Apple Silicon build now passes `codesign --verify --deep --strict`, including after extracting its final ZIP. The packaged app loads local notation, its desktop bridge, the FretFlow logo, and the corrected title. A playback diagnostic measured nonzero guitar samples (peak 0.424), advancing MIDI ticks, pause, and resume. This checks synthesized audio; listening quality, live microphone input, native import/export round trips, and a clean-machine installation remain unverified.

The live Pages app was tested through its Play button: the countdown completed, playback advanced to bar 9, and synthesized guitar samples were nonzero (peak 0.301). Its logo loaded at 1024 pixels wide and the AI title was removed. Local browser pause/resume was also checked.

Packaging includes an application icon, microphone usage description, audio/JIT entitlements, and an ad hoc signature. No Developer ID identity is available on the build Mac. The package is **not Apple notarized**, and no Gatekeeper distribution pass is claimed. See [Mac build instructions](MAC_BUILD.md).

## Original public preview audit

The repository is a source-only early alpha under GPL-3.0-only. It is suitable for transparent development and feedback; it is not a claim that the supplied macOS binary is ready for everyday distribution.

| Check | Result |
| --- | --- |
| Locked dependency install | npm ci --ignore-scripts passed. |
| TypeScript and production bundle | Passed after approved removal of four unused legacy AI files. Initial GitHub Actions build also passed. |
| Packaged renderer correspondence | Rebuilt index-C4QZG0ve.js and index-DIccmiBi.css match the supplied app ASAR byte-for-byte. |
| Source browser rendering / transport | Library and Bach notation/tab rendered; the playback cursor visibly advanced to bar 8 and stop returned to bar 1. Audible output was not independently checked. |
| Supplied macOS ZIP executable | Mach-O arm64, bundle version 1.0.0. |
| Packaged Electron main/preload | Main file matches supplied source; static REA inspection completed for these entrypoints only. |
| Strict bundle signature verification | Failed: code has no resources but signature indicates they must be present. Ad hoc executable signature, no Developer ID team. |
| Supplied DMG integrity | hdiutil verify passed. This does not validate the app signature. |
| Stapled notarization ticket | stapler did not find a ticket on the supplied DMG. No clean-machine notarization/Gatekeeper pass established. |
| Packaged app launch | A direct launch was attempted; no surviving app process was observed. No successful packaged runtime claim is made. |
| SoundFont provenance | SF2, SF3 and license notice match @coderline/alphatab@1.8.4 byte-for-byte. |
| Source privacy scan | No obvious embedded secret or personal imported score was found in the publication file scan. This is not a comprehensive security audit. |
| Live microphone/audio validation | Not completed. |

## Publication changes

- Added a GPL-3.0-only license, third-party notices, dependency/asset inventory, README art and real browser screenshot.
- Added contribution/security guidance, issue/PR templates, known issues, roadmap and a build-only CI workflow.
- Excluded local MCP configuration, machine-specific launchers, node_modules, generated bundles, original macOS binaries and personal imports from Git.
- Removed only four unused AI modules, as approved, to resolve missing deleted-type/bridge references. The current application entrypoint did not import these modules.
- Updated release/package metadata to identify the source preview as 1.0.0-alpha.1.
- No broad application bug-fix pass was performed. The original Downloads files were not modified.

## Before a desktop download

1. Rebuild from the exact tagged source in a clean output directory, preserving Electron's required runtime notices.
2. Configure the app icon and precise microphone usage text; review permission types/origins and navigation restrictions.
3. Produce a correctly signed app. For the smooth Developer ID distribution path, sign with an appropriate identity, enable the required hardened runtime settings/entitlements, submit for notarization and staple the result. Do not commit signing credentials.
4. Verify both the app and final DMG/ZIP after copying to the delivery location. Archive/resource-fork metadata can affect signatures.
5. Test the downloaded artifact on a clean Apple Silicon Mac: launch, notation fonts, sound, pause/resume, looping, speed changes, import/export, persistence, optional microphone permission and denied permission.
6. Publish tested binaries as GitHub Release assets, with version/architecture, SHA-256 checksums, known issues and truthful signing/notarization status. Do not commit application bundles into the source repository.

Official references: [Apple notarization overview](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution), [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases).

## Analysis evidence

Static package main/preload analysis: REA ev_24cd35e9879750532c297e5bc68882146e3186004770d211c62992ea69aff0a7. Other packaged modules were outside that analysis scope. Fuse bytes: REA ev_bff12e23371cc3eb3e51565b8a7acc7b6751c58d3c0bf78f3be2206db949a052. Inspector/RunAsNode are enabled; embedded ASAR integrity enforcement and ASAR-only loading are disabled. These are static observations, not proof of exploitability or runtime behavior.
