# Release and maintenance notes

## v2.7.0

- Removes duplicate walkthrough script loading.
- Handles unexpected camera track termination.
- Pauses and releases active camera sessions when the page is hidden or navigated away from.
- Surfaces incomplete face-landmark data as a positioning diagnostic.
- Adds temporary larger-text and high-contrast options.
- Caches the 20 existing help articles as optional offline resources.
- Uses an explicit offline unavailable response for uncached routes.
- Updates regression and browser smoke tests.
- Documents architecture, privacy/data flow and QA requirements.

## Known validation limits

This source update does not prove camera tracking accuracy, WCAG 2.2 AA conformance, clinical safety, medical effectiveness, browser compatibility or real-device reliability. Follow docs/testing.md before release.

## Suggested follow-up roadmap

The strategic roadmap identifies larger future work: independent camera-tracking validation, a reviewed anatomy and movement learning centre, professionally reviewed demonstrations, multilingual content, optional local session history, stronger PWA installation support, a clinical content advisory process and research collaboration. These require their own scope, content review, testing and acceptance criteria; they are not represented as completed in v2.7.
