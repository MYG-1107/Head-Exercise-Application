# Testing and release validation

## Automated checks

This repository has no build step or package dependencies. With a supported Node.js installation:

```bash
npm run check
```

The command syntax-checks the main JavaScript files and runs the Node test suite. To run only the tests:

```bash
npm test
```

The test suite covers pure tracker state, manual counting, UI wiring, CSV generation, page metadata, internal links, structured data, sitemap coverage and selected accessibility/offline source invariants.

## Browser smoke check

Serve the repository over HTTPS or localhost and open:

```
tests/browser-smoke.html
```

The page embeds the homepage and checks initial camera-off behavior, manual mode, count updates, pause/resume/stop/reset, privacy disclosure, display preferences and essential navigation. It does not grant camera permission or prove camera tracking accuracy.

## Manual camera test matrix

Test on more than one browser/device where possible:

1. Camera permission granted, denied and revoked.
2. Camera disconnected or disabled during a session.
3. Face leaves and re-enters the camera frame.
4. Incomplete or partially obscured facial landmarks.
5. Calibration interrupted by movement or temporary face loss.
6. Front/rear camera switching on supported devices.
7. Pause, resume, stop and reset while camera mode is active.
8. Page hidden during camera startup and during a running session.
9. Resume after returning to the page; confirm fresh calibration.
10. Poor lighting, backlighting, different camera distances and low-performance devices.

Record actual outcomes and device/browser details. Do not invent a camera accuracy percentage or present directional estimates as clinical measurements.

## Responsive and accessibility checks

- Test widths of 320, 375, 768 and desktop sizes.
- Check portrait and landscape orientation, 200% zoom and no horizontal overflow.
- Navigate all controls with keyboard only and inspect focus visibility.
- Check screen-reader names and status announcements.
- Toggle Larger text and High contrast; verify their pressed state and reversal.
- Verify the site follows the operating system reduced-motion preference.
- Review contrast and semantics against WCAG 2.2 AA. Automated checks are not a conformance certification.

## Offline checks

1. Visit the site while online and allow the service worker to install/update.
2. Revisit the homepage and the Quick guide, Privacy and Safety pages after switching offline.
3. Confirm manual mode remains usable offline.
4. Confirm camera mode explains that tracking assets may need an internet connection.
5. Request a removed or uncached page while offline; it should show an explicit unavailable response, not the homepage.
6. Update the cache version and verify the old application-shell cache is removed after activation.

## Release rule

Do not merge based only on source inspection. Run the automated suite, browser smoke check and real-device manual matrix. Automated tests do not establish clinical safety, medical effectiveness, legal compliance, WCAG conformance or search ranking.
