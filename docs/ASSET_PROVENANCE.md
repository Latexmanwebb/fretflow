# Asset provenance

## SoundFonts and notation engine

`public/soundfont/sonivox.sf2`, `sonivox.sf3`, and their license notice match `@coderline/alphatab@1.8.4/dist/soundfont/` byte-for-byte. [Recorded SHA-256 values](ASSET_PROVENANCE.json) make that verification reproducible. alphaTab describes its bundled SONiVOX bank as Apache-licensed: https://alphatab.net/docs/getting-started/installation-web . Original notices and the complete Apache-2.0 text are retained.

Vendored alphaTab files identify version 1.8.4, matching package-lock.json. The engine is MPL-2.0; original notices remain in place.

## Fonts

Bravura's original OFL and accompanying notices are in public/font/. Inter and JetBrains Mono are distributed through their locked @fontsource packages; license copies are in licenses/.

## Logo and repository banner

public/logo.jpg was supplied in the project source package. Its independent creation/source history has not been established by this technical review. The README banner in docs/images/banner.svg was created for this repository using original vector shapes and text. The screenshot is of the actual local browser interface, with no personal imported scores shown.

## Included musical examples

The source includes AlphaTex studies and arrangements attributed to Bach, Giuliani, traditional material, and workshop-style practice drills. The maintainer believes the historical compositions are public domain. This review has not established which editions, modern arrangements, or transcriptions were used, and does not certify edition fidelity or a blanket public-domain status for every included asset. Composition rights and modern edition/transcription rights can differ.

No personal score imports, including the King Krule file in the maintainer's Downloads, are included. Do not contribute commercial tabs, copyrighted recordings, or third-party score editions unless you have the right to redistribute them. If an attribution or rights concern is found, open an issue with the relevant source and location; do not upload the disputed full score to the issue.
