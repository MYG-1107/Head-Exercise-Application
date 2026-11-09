# Head Exercise Application

A focused, browser-based movement counter with two ways to count completed head-movement cycles:

- **Camera mode:** estimates movement direction in the browser after camera permission and neutral calibration.
- **Manual mode:** counts user-confirmed movements without camera access.

No account or login is required.

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
