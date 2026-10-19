# Third-party notices

FretFlow's GPL-3.0-only license applies to its first-party code and documentation. It does not replace the licenses below. Preserve upstream notices when redistributing these components.

| Component | License | Source / notices |
| --- | --- | --- |
| alphaTab 1.8.4 | MPL-2.0 | https://github.com/CoderLine/alphaTab ; [license](licenses/MPL-2.0.txt). Vendored public/alphaTab* headers retain integrated-library attributions. |
| SONiVOX SoundFont | Apache-2.0 as distributed by alphaTab | public/soundfont/LICENSE and README.md; [full license](licenses/Apache-2.0.txt). Both banks match the locked alphaTab npm package byte-for-byte. |
| Bravura | SIL Open Font License 1.1 | public/font/Bravura-OFL.txt; associated FAQ and FONTLOG retained. |
| Inter | SIL Open Font License 1.1 | [license](licenses/Inter-OFL.txt); @fontsource/inter. |
| JetBrains Mono | SIL Open Font License 1.1 | [license](licenses/JetBrainsMono-OFL.txt); @fontsource/jetbrains-mono. |
| React / React DOM | MIT | https://github.com/facebook/react |
| Vite | MIT | https://github.com/vitejs/vite |
| TypeScript | Apache-2.0 | https://github.com/microsoft/TypeScript |
| Tailwind CSS | MIT | https://github.com/tailwindlabs/tailwindcss |
| Electron | MIT, with Chromium/other dependency notices | https://github.com/electron/electron; distributed Electron runtimes require their own included notices. |
| Lucide | ISC | https://github.com/lucide-icons/lucide |
| JSZip | MIT or GPL-3.0-or-later | https://github.com/Stuk/jszip; retain installed package license files. |
| canvas-confetti | ISC | https://github.com/catdad/canvas-confetti |

alphaTab's distributed headers also credit TinySoundFont, SFZero, Haxe standard library, SharpZipLib, NVorbis, and libvorbis. Their original attributions remain in the vendored files. Upstream source is available at https://github.com/CoderLine/alphaTab/tree/v1.8.4 ; use the package/version and repository metadata if upstream reorganizes its tree.

[DEPENDENCIES.json](docs/DEPENDENCIES.json) records installed package metadata from the locked development dependency tree. It is an inventory, not a substitute for the upstream licenses or a legal audit. Before publishing desktop binaries, include Electron's complete runtime notices and review all bundled assets.
