#!/bin/bash
# Downloads the two optional outside libraries into slides/vendor/. Run from the slides folder:
#   bash vendor/fetch_vendor.sh
# rough-notation 0.5.1 (MIT): hand-drawn underlines for emphasis.
# ET Book from tufte-css 1.8.0 (MIT): the typeface of Edward Tufte's books, an alternative text face.
set -e
cd "$(dirname "$0")"
mkdir -p rough-notation et-book
curl -fsSL https://cdn.jsdelivr.net/npm/rough-notation@0.5.1/lib/rough-notation.iife.js -o rough-notation/rough-notation.iife.js
for f in et-book-roman-line-figures et-book-display-italic-old-style-figures et-book-bold-line-figures; do
  curl -fsSL "https://cdn.jsdelivr.net/npm/tufte-css@1.8.0/et-book/$f/$f.woff" -o "et-book/$f.woff"
done
echo 'window.VENDOR = { rough: true };' > available.js
echo "Done. Reload the slides."
