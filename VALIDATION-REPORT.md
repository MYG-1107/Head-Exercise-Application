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


## v2.7.0 pull-request scope

- Removed the duplicate walkthrough script reference.
- Added camera-track ended handling and automatic session pause on page hiding/navigation.
- Added a diagnostic path for incomplete facial landmarks.
- Added temporary larger-text and high-contrast display settings.
- Updated the service worker to cache all 20 current help articles as optional resources and to avoid silently serving the homepage for an uncached offline route.
- Added regression assertions for these changes and corrected the browser smoke page to target the current privacy disclosure and controls.

## Validation status

The new Node and browser checks are committed but have **not been executed in this environment**. Run npm run check from a local checkout of this branch, then open tests/browser-smoke.html over the deployed HTTPS site. Camera disconnection, page-hidden behavior, offline article navigation, responsive layouts, keyboard/screen-reader access and reduced-motion behavior still require real-browser and device validation.

The PR does not claim camera accuracy, WCAG 2.2 AA conformance, clinical validation or legal compliance.


## v2.8.0 — Site simplification

The public-facing site is reduced to four pages: the homepage movement counter, a short Quick guide, Privacy and Safety. The 20-page article archive, its archive-specific test and the animated walkthrough/WebM recorder were removed. Navigation, footer links, sitemap, service-worker app-shell cache, SEO setup notes, QA tests and documentation were updated to match.

The core counter, camera/manual modes, calibration, session controls, voice prompts, CSV export, privacy and safety pages, display accessibility settings and camera lifecycle handling are retained.

The GitHub connector does not execute the Node.js test suite or browser/device tests. Run npm run check and complete VALIDATION-CHECKLIST.md before merging. No camera accuracy, clinical validation, WCAG 2.2 AA conformance or search-ranking claim is made.
