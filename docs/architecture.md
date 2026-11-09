# Application architecture

## Overview

Head Exercise Application is a static HTML, CSS and JavaScript application. It has no required account, application server, build step or application database. The current architecture is intentionally lightweight; do not migrate frameworks without a demonstrated maintenance or user-experience need.

## Main components

- index.html: tracker interface, navigation, accessibility controls, safety/privacy disclosures and the session counter markup.
- style.css: responsive layout, focus styles, reduced-motion support and temporary display preference styles.
- script.js: browser UI orchestration, camera permission, MediaPipe loading, calibration, camera lifecycle, manual mode, session timer, voice prompts and user-triggered CSV export.
- tracker-core.js: pure movement-cycle state and direction classification. It contains no DOM access, camera calls, networking or persistence.
- sw.js: same-origin application-shell and help-page caching. It must not cache camera frames or session values.
- guide.html, privacy.html and safety.html: the three supporting public pages.
- tests/: Node unit/UI/static tests and a browser smoke page.

## Camera lifecycle

1. Camera access is requested only after the user selects Start camera.
2. The browser stream is attached to the preview and passed to the tracking library.
3. An unexpected MediaStreamTrack ended event stops the session and releases remaining tracks.
4. When the page becomes hidden or is navigated away from, an active session pauses and camera resources are released.
5. Resuming a camera session reconnects the camera and starts a new neutral-position calibration.
6. The user can switch to manual mode without camera access.

Camera estimates are directional estimates derived from facial landmarks. They are not validated measurements of clinical range of motion.

## Data boundaries

The app keeps current counts and elapsed time in page memory. CSV export is generated only after user action. The static service worker stores website resources for offline use, not session data. See privacy-data-flow.md.

## Change principles

- Preserve camera mode, manual mode, counting, pause/resume/stop, voice prompts and CSV export. Keep the public site limited to Home, Quick guide, Privacy and Safety.
- Keep the tracking core independently testable.
- Keep new data collection opt-in and local-first by default.
- Avoid clinical features until qualified review, validation and governance exist.
