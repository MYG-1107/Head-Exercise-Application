# Release and maintenance notes

## v2.8.0 — Simplified public site

- Reduced public navigation to Home, Quick guide, Privacy and Safety.
- Removed the separate article archive and its 20 article pages.
- Removed the standalone animated walkthrough and its browser-side video recording feature.
- Kept the essential usage steps in one concise Quick guide.
- Updated sitemap, offline cache, QA tests and project documentation to reflect the smaller site.

## v2.7.0 — Camera lifecycle, accessibility and offline reliability

- Removed duplicate walkthrough script loading.
- Handles unexpected camera track termination.
- Pauses and releases active camera sessions when the page is hidden or navigated away from.
- Surfaces incomplete face-landmark data as a positioning diagnostic.
- Adds temporary larger-text and high-contrast options.
- Improved service-worker cache handling and regression tests.

## Known validation limits

The source updates do not prove camera tracking accuracy, WCAG 2.2 AA conformance, clinical safety, medical effectiveness, browser compatibility or real-device reliability. Follow docs/testing.md and VALIDATION-CHECKLIST.md before release.

## Future work

Potential future research, clinical content review, multilingual capabilities or local session history should be considered separately. They are not required for the core counter and should not be reintroduced as public pages or features without clear user value, appropriate review and acceptance criteria.
