# Head Exercise Application

A focused, browser-based movement counter with two ways to count completed head-movement cycles:

- **Camera mode:** estimates movement direction in the browser after camera permission and neutral calibration.
- **Manual mode:** counts user-confirmed movements without camera access.

No account or login is required.

## System design and architecture

Head Exercise Application is a static, client-side web application deployed as a GitHub Pages site. It has no application server, user database, login system, build pipeline or required runtime dependencies. The browser loads the HTML, CSS and JavaScript from the same origin and performs the interactive work locally.

### Runtime components

- `index.html` is the primary application shell. It contains the tracker interface, navigation, accessibility settings, privacy/safety disclosures and semantic metadata for search engines and social previews.
- `script.js` orchestrates browser concerns: camera permission, MediaPipe loading, calibration, camera lifecycle, manual mode, timers, voice prompts, progress updates and user-triggered CSV export.
- `tracker-core.js` is the framework-free domain layer. It classifies directions and records completed movement/return-to-centre cycles without DOM, camera, network or persistence dependencies, which keeps the counting logic independently testable.
- `style.css` provides the responsive layout, focus states, reduced-motion behavior, high-contrast mode, larger-text mode and the system-font fallback for the optional web font.
- `sw.js` caches the same-origin application shell for repeat visits and offline manual mode. It never stores camera frames, counts or exported data.
- `guide.html`, `privacy.html` and `safety.html` are the supporting public pages. They are intentionally limited to the information needed to use the application safely and understand its data handling.

### Runtime flow

1. The user chooses camera mode or manual mode. Camera permission is requested only after the user starts camera mode.
2. In camera mode, the browser stream is displayed locally and facial landmarks from the external MediaPipe library are used for relative direction estimates.
3. A neutral position is calibrated before estimates are counted. A completed repetition requires movement followed by a return to centre.
4. The UI updates the pure tracker state, timer and progress indicators. The user can pause, stop, reset or export a CSV summary.
5. If the page is hidden or the camera track ends, the application pauses and releases camera resources. Manual mode remains available without camera access.

### Data and trust boundaries

Session counts and elapsed time exist only in page memory. They are not sent to an application backend, stored in cookies or local storage, or associated with an account. Camera frames are processed in the browser; there is no intentional camera-frame upload path. CSV export is created only after an explicit user action and is downloaded by the browser.

The application depends on two public external resources: MediaPipe tracking assets from jsDelivr and Source Sans 3 from NAV's public CDN. Those providers receive ordinary browser requests and may receive standard connection metadata. The privacy page documents these boundaries and the service worker is limited to same-origin resources.

### Delivery and SEO architecture

GitHub Pages serves the canonical HTTPS URLs. Each indexable page has a unique title and description, a self-referencing canonical URL, mobile viewport metadata, Open Graph/Twitter preview metadata and JSON-LD structured data. `robots.txt` allows crawling and points to `sitemap.xml`, which contains only the four canonical pages. The public navigation and sitemap are deliberately small so crawlers and users can reach the tracker and its essential supporting information directly.

Performance is supported by a small static asset set, deferred JavaScript, responsive CSS, `font-display: swap`, preconnect/preload hints for the optional font, no auto-start camera request, and service-worker shell caching. Validate real-world Core Web Vitals with Lighthouse or PageSpeed Insights after deployment; field measurements depend on the visitor's device and network.

### Change and release principles

- Preserve camera mode, manual mode, counting, pause/resume/stop, voice prompts and CSV export.
- Keep the tracking core independently testable and keep new data collection opt-in and local-first.
- Update canonical metadata, sitemap dates, structured data and the service-worker cache version when public pages or cached assets change.
- Run `npm run check` before publishing. Also perform a physical-device camera, responsive, accessibility and safety review because automated tests cannot verify those conditions.

## Main pages

- Home — the movement counter.
- [Quick guide](https://myg-1107.github.io/Head-Exercise-Application/guide.html) — start, calibrate, count, pause and export.
- [Privacy](https://myg-1107.github.io/Head-Exercise-Application/privacy.html) — camera processing and data handling.
- [Safety](https://myg-1107.github.io/Head-Exercise-Application/safety.html) — intended use and limitations.

The site intentionally avoids a separate article archive and animated walkthrough. The essential instructions are kept in the quick guide.

## Development checks

This is a static HTML, CSS and JavaScript project with no build step or package dependencies. With Node.js installed, run:

```bash
npm run check
```

Automated checks do not replace physical-device camera, responsive, accessibility or safety review. See [docs/testing.md](docs/testing.md).

## Privacy and intended use

Camera access is optional and requested only when camera mode starts. Camera frames are processed in the browser; the app does not include an intentional camera-frame upload feature. Counts stay in page memory until reset, refresh or close. CSV files are downloaded locally on user action. Camera tracking assets and the public font CDN may receive standard connection metadata.

The application is a movement-counting utility, not a medical device, diagnosis, clinical range-of-motion assessment, exercise prescription or physiotherapy plan. Camera direction is an estimate; manual entries are self-reported.
