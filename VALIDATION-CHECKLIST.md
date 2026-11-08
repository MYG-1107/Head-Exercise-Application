# Post-deployment QA acceptance checklist

Run this checklist on the deployed GitHub Pages URL using a desktop browser and a phone.

## Smoke tests
- [ ] Page loads with no uncaught JavaScript errors; tracker starts in Ready state.
- [ ] The camera remains off before the user clicks Start camera.
- [ ] Permission granted: camera preview appears, automatic calibration progress advances, and centre position becomes ready.
- [ ] Complete one direction → centre cycle; the matching count changes without refreshing.
- [ ] Direction → direction without returning to centre does not count a repetition.
- [ ] Face loss during a movement never counts that incomplete movement; centre must be reacquired.
- [ ] Calibrate again; camera flip reconnects or gives a clear error and requires calibration again.
- [ ] Pause releases camera; resume reopens it and recalibrates. Stop also releases the camera.
- [ ] Denied/unavailable camera shows a helpful error and manual mode still works.
- [ ] Manual counts update and session completes at the configured goal.
- [ ] Export summary downloads a CSV only after user click; no network upload occurs.
- [ ] Voice off produces no speech; switching off voice stops queued speech.
- [ ] Reset clears counts and time and stops the camera.

## Privacy and offline
- [ ] Network panel shows the expected NAV font request and, only in camera mode, jsDelivr model requests.
- [ ] No camera frame/image upload request occurs.
- [ ] Refresh clears session counters.
- [ ] After loading once online, disconnect and reload: the app shell is available and manual mode works. Camera mode should clearly require a connection for model loading.
- [ ] Clear site storage and retest install/offline behavior.

## Responsive/accessibility
- [ ] Test at 320 px, 375 px, 768 px and desktop widths; no horizontal scroll or clipped controls.
- [ ] Keyboard can reach and activate all controls; focus indicators are visible.
- [ ] Browser zoom to 200% remains usable.
- [ ] Reduced-motion preference is respected; status updates are announced without flooding.

## Content and enquiry route
- [ ] Open Articles from the tracker and confirm the blog index displays all 31 articles.
- [ ] Test search and category filters with keyboard and touch input.
- [ ] Open several articles and confirm breadcrumbs, related links, scope note and GrapeCrux enquiry link.
- [ ] Confirm the GrapeCrux link opens the external website in a new tab; the app does not claim to submit an enquiry.
- [ ] Check headings, tags and cards at mobile, tablet and desktop widths.

## SEO
- [ ] Open `robots.txt` and `sitemap.xml` on deployed site; both should return successfully.
- [ ] Confirm guide, privacy, safety, blog index and all 31 articles load and each has a unique title, description and self-referencing canonical URL.
- [ ] Validate canonical and JSON-LD after deploy; confirm the sitemap contains 36 indexable URLs and submit it in Search Console and Bing Webmaster Tools.

A passing automated test suite does not establish real webcam accuracy, clinical safety, or search ranking.
