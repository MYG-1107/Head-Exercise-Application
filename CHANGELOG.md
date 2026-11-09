# Changelog

## v2.8.0 — Simplified site structure

- Reduced the public site to four essential pages: Home, Quick guide, Privacy and Safety.
- Removed the 20-page article archive and its archive-specific test.
- Removed the animated 3D-style walkthrough and browser-side WebM recording feature; the concise Quick guide now covers the essential user steps.
- Removed article/walkthrough links and unused styling from the site.
- Reduced the service-worker cache to the app shell and three supporting pages.
- Updated the sitemap to list only the four retained public pages.
- Updated SEO, testing and project documentation to match the simplified site.


## v2.7.0 — Camera lifecycle, accessibility and offline reliability

- Removed duplicate loading of the 3D-style walkthrough script.
- Detect unexpected camera-track termination, stop tracking safely and explain recovery options.
- Pause active sessions when the page is hidden or navigated away from; release camera resources and require an explicit resume.
- Show a clearer diagnostic message when facial landmarks are incomplete.
- Add temporary larger-text and high-contrast controls with accessible pressed states.
- Cache the 20 existing application help guides as optional offline resources without making a missing article block app installation.
- Improve offline navigation fallback so uncached pages show an explicit unavailable message rather than the homepage.
- Update unit/UI/static regression tests and replace stale browser smoke checks with checks for the current interface.
- Add engineering, privacy and release validation documentation.

No camera accuracy, clinical validation, WCAG conformance or real-device compatibility claim is made by this release.


## v2.6.0 — Product identity and first-session onboarding

- Standardised the visible product name and page metadata as Head Exercise Application.
- Added a clear statement that no account, registration or login is required.
- Added an animated 3D-style walkthrough covering first open, mode selection, camera permission, calibration, cycle counting, manual mode and CSV export.
- Added optional in-browser WebM recording where canvas capture and MediaRecorder are supported.
- Replaced unrelated editorial posts with 20 individual application help guides and a searchable, filterable help centre.
- Updated guide, privacy, safety, app manifest, package metadata, service-worker cache, sitemap, documentation and regression tests.
- Kept the existing camera and manual counting workflows and their safety/privacy limitations.

## v2.4.0 — QA and useful features

- Added user-triggered CSV session export, installable app metadata and offline app-shell caching.
- Added guide, privacy and safety support pages and basic SEO metadata.
- Documented the need for real-device camera, responsive and accessibility checks.
