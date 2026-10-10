#!/usr/bin/env bash
# Build a shareable preview of the static site, served from a /site/ sub-path.
#
#   ./scripts/prepare-preview.sh        # -> out-preview/
#
# Why the sub-path: some static hosts (the claude.ai artifact host among them)
# reserve root-level paths beginning with an underscore, which collides with
# Next's `_next/` directory and its `__next.*.txt` route payloads. Building with
# basePath=/site moves every generated path one level down, so nothing
# underscore-prefixed sits at the root. A normal deploy needs none of this —
# use `npm run build:static` and upload `out/` as-is.
set -euo pipefail

DEST="${1:-out-preview}"
BASE="/site"

rm -rf out "$DEST"
NEXT_EXPORT=true NEXT_BASE_PATH="$BASE" npx next build

mkdir -p "$DEST$BASE"
cp -r out/. "$DEST$BASE/"

# Root entry point: sends visitors to the sub-path, and still reads as the
# brand if a slow connection shows it for a moment.
cat > "$DEST/index.html" <<'HTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Eclesare by Paula</title>
    <meta http-equiv="refresh" content="0; url=./site/" />
    <link rel="canonical" href="./site/" />
    <style>
      html { background: #f7f4ee; }
      body {
        margin: 0; min-height: 100dvh;
        display: flex; align-items: center; justify-content: center;
        background: #f7f4ee; color: #30312c;
        font-family: Georgia, "Times New Roman", serif;
      }
      p { font-size: 0.95rem; letter-spacing: 0.34em; text-transform: uppercase; }
      a { color: #737a61; }
    </style>
  </head>
  <body>
    <p>Eclesare</p>
    <script>window.location.replace("./site/");</script>
    <noscript><p><a href="./site/">Continue to the site</a></p></noscript>
  </body>
</html>
HTML

# One Next polyfill chunk embeds U+FFFD (the Unicode replacement character)
# as a literal inside a string — it is the fallback character for invalid
# percent-encoding. Some hosts reject files containing it, so rewrite it to the
# equivalent JavaScript escape. Semantically identical, byte-wise acceptable.
python3 - "$DEST" <<'PYEOF'
import pathlib, subprocess, sys

dest = pathlib.Path(sys.argv[1])
for f in dest.rglob("*.js"):
    text = f.read_text(encoding="utf-8")
    if "\ufffd" not in text:
        continue
    patched = text.replace('"\ufffd"', '"\\uFFFD"')
    if "\ufffd" in patched:
        sys.exit(f"{f}: U+FFFD outside a double-quoted string — handle manually")
    f.write_text(patched, encoding="utf-8")
    subprocess.run(["node", "--check", str(f)], check=True)
    print(f"  patched U+FFFD in {f.relative_to(dest)}")
PYEOF

echo "Wrote $DEST"
echo "  files: $(find "$DEST" -type f | wc -l)   size: $(du -sh "$DEST" | cut -f1)"
echo "  root-level underscore paths: $(find "$DEST" -maxdepth 1 -name '_*' | wc -l)"
