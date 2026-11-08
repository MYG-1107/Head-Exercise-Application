# Head Exercise Tracker — Content, Trust and SEO Update v2.5

A static GitHub Pages web app for counting head-movement cycles. The tracker remains focused on camera-assisted estimates, manual counts, session controls and user-triggered CSV export. This release adds an educational article hub and clearer routes for digital project enquiries.

## User features

- Optional camera-assisted head-direction tracking with neutral calibration.
- Manual mode that does not request camera access.
- Voice prompts off by default, plus Flip camera and Reset controls.
- Downloadable CSV session summary; export is user-initiated and is not uploaded.
- Installable app shell and offline manual mode after the site has been loaded and cached once.
- Guide, privacy and safety pages with explicit limitations.
- 31 individual articles covering software engineering, health technology, medical software, accessibility, AI, cybersecurity, networking, cloud, business and finance.
- A clearly separate link to GrapeCrux for digital project enquiries.

## Deploy

1. Review and merge the pull request into `main`.
2. Confirm GitHub Pages publishes from the repository's configured branch and folder.
3. Visit `https://myg-1107.github.io/Head-Exercise-Application/` and hard-refresh after deployment.
4. Run the checks in `VALIDATION-CHECKLIST.md`.

The project is static HTML, CSS and JavaScript. No build step is required. For tests, run `npm run check` with Node.js. Automated tests do not replace real camera, browser, accessibility or clinical validation.

## Content and scope

The article hub is at `https://myg-1107.github.io/Head-Exercise-Application/blog/`. Articles are educational explainers, not clinical guidance or professional legal, regulatory, cybersecurity incident-response or financial advice. They do not claim that the tracker is a medical device or clinically validated product.

GrapeCrux is linked as a separate destination for business enquiries. The app does not contain a fake contact form or claim that an enquiry has been submitted.

## Privacy and safety

- No account, app database, analytics, cookies, photo upload or video upload feature is included in the tracker.
- Camera permission is requested only when camera mode is started.
- MediaPipe scripts and model assets are loaded from jsDelivr only after the user chooses camera mode. The Source Sans 3 font is loaded from NAV's public CDN. These providers can receive standard request metadata.
- The service worker caches same-origin static app files. It does not cache camera frames or session counts.
- Session values stay in page memory until reload/close. A CSV file is created only when the user chooses Export summary.
- The tracker is a movement-counting utility, not a medical device, diagnosis, exercise prescription or physiotherapy plan. Stop if activity causes pain, dizziness, numbness or concerning symptoms and seek professional advice.

## SEO notes

The public pages use page-specific titles, descriptions, canonical URLs, Open Graph/Twitter metadata and structured data. The sitemap lists the canonical pages and all 31 article URLs. The project path is `/Head-Exercise-Application/`; the previous `/head-exercise-tracker/` path was inconsistent and has been corrected. See `SEO-SETUP.md`.
