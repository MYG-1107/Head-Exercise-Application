# Validation report — v2.6.0

## Source changes

This update standardises the product identity, adds a canvas-based 3D-style first-session walkthrough with browser-side WebM recording support, replaces the broad article archive with 20 application-specific guides and updates SEO/app-shell metadata.

## Checks included

- Static tests for unique page titles, descriptions, canonical URLs, internal links, JSON-LD and sitemap coverage.
- Help-centre tests for the exact article count, individual canonical URLs, BlogPosting metadata and collection links.
- Existing tracker-core and UI tests remain in the suite.
- JavaScript syntax check includes the new walkthrough script.

## Not claimed as passed

The GitHub connector does not execute the repository's Node.js test suite or browser/device tests. Run npm run check locally after checking out the branch. Test camera permission, calibration, counting, track release, WebM recording, mobile layouts, keyboard access and reduced-motion behaviour in real browsers before merging.

The application is a movement counter, not a medical device or clinical assessment. Camera output is an estimate and manual entries are self-reported.
