# Head Exercise Application

A static browser application for counting completed head-movement cycles with optional camera-assisted direction estimates or camera-free manual mode.

## First-time use

- Open the GitHub Pages site. No account, registration or login is required.
- Choose camera mode only when ready to grant browser camera permission, or use manual mode without a camera.
- In camera mode, allow neutral calibration to complete. A counted repetition requires a direction followed by a return to centre.
- Use Pause or Stop when needed. Export summary downloads a CSV file only after you request it.
- Watch the animated 3D-style walkthrough on the homepage. Supported browsers can record that walkthrough as WebM locally.

## Help centre

The help centre is at https://myg-1107.github.io/Head-Exercise-Application/blog/ and contains 20 individual articles about the application's actual features, setup, troubleshooting, privacy and safety.

## Development checks

This is a static HTML, CSS and JavaScript project; no build step is needed. With Node.js installed, run npm run check. Automated checks do not replace physical-device camera, browser, responsive, accessibility or safety review.

## Privacy and intended use

No account or application database is included. Camera access is optional and requested only when camera mode starts. Camera tracking assets load from jsDelivr; a public font CDN is also referenced, and those services may receive standard request metadata. Session counts stay in page memory until reset, refresh or close. CSV files are downloaded locally on user action.

The application is a movement-counting utility, not a medical device, diagnosis, exercise prescription or physiotherapy plan. Camera direction is an estimate; manual entries are self-reported.
