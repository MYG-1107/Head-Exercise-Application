# Privacy and data-flow notes

## Current data flow

| Data or resource | Processing/location | Persistence |
| --- | --- | --- |
| Camera frames | Browser camera stream and in-page tracking flow | Not saved by this application |
| Direction estimates | In-page tracker logic | Current page memory only |
| Repetition counts | In-page tracker logic | Current page memory only |
| Elapsed time | In-page session timer | Current page memory only |
| CSV summary | Created in the browser after an explicit export action | Downloaded to a file chosen by the browser/user |
| App shell and help pages | Same-origin service-worker cache | Browser-managed cache |
| Preferences for larger text/high contrast | CSS class on the current page | Temporary; not saved |

## External requests

Camera mode loads the pinned MediaPipe Face Mesh script and model assets from jsDelivr. The page also references a public font CDN. Those providers receive ordinary network requests and may receive standard connection metadata such as IP address, requested asset path and browser details. Their handling of request logs is outside this repository's control.

The application has no login, account database, analytics endpoint or cloud session-sync implementation in this repository.

## Camera handling

- Camera permission is requested only when the user starts camera mode.
- Manual mode does not request camera permission.
- A track ending unexpectedly stops the current tracking session.
- Hiding or navigating away from the page pauses the session and releases the camera stream.
- The app does not provide an upload control for camera frames or recordings.

## CSV export

The CSV is created as a browser Blob only after the user selects Export summary. The download remains under the user's device/browser control. Users should treat exported files as potentially sensitive and manage or delete them through their device.

## Service-worker scope

The service worker caches static same-origin pages, scripts, styles, icons and help articles. It must not cache camera streams, captured images, repetition counts, session notes or exported CSV files. Changes to this boundary require an updated privacy review and user-facing policy.

## Future changes requiring a separate review

Any introduction of accounts, analytics, local session history, notes, remote APIs, cloud synchronization, research data collection or third-party telemetry requires a fresh data-flow review, clear user choice, data minimisation and appropriate deletion/security controls. Do not imply that a future feature already exists.
