# Post-deployment validation checklist

## Product identity and onboarding
- [ ] Homepage and every support/help page consistently display Head Exercise Application.
- [ ] Homepage clearly states no account, registration or login is required.
- [ ] The tracker opens directly and existing camera/manual controls work.
- [ ] Play, pause and replay the 3D-style walkthrough; check captions and transcript.
- [ ] In a supported browser, record and download the WebM walkthrough; verify the file plays.

## Camera and counting
- [ ] Disconnect or disable the active camera track during a session; verify the session stops, counts are not incremented, and a recovery message appears.
- [ ] Hide the browser tab or switch apps during camera setup and during a session; verify the session pauses and camera tracks are released.
- [ ] Return to the page and explicitly resume; verify camera reconnection and neutral calibration are required again.
- [ ] Present an incomplete or partially obscured face; verify the app requests repositioning and does not treat incomplete landmarks as a valid movement.
- [ ] Camera remains off until Start camera is selected.
- [ ] Permission granted: preview appears, calibration completes and status updates.
- [ ] One direction followed by return to centre increments the correct count once.
- [ ] Direct direction-to-direction movement does not count a completed repetition.
- [ ] Face loss interrupts an unfinished movement without completing a count.
- [ ] Recalibration, flip, pause, resume and stop work; the camera indicator turns off after pause/stop.
- [ ] Denied/unavailable camera provides a useful message and manual mode remains usable.
- [ ] Manual entries update counts and are labelled self-reported.
- [ ] CSV export downloads only after the user clicks Export summary.

## Responsive, accessibility and privacy
- [ ] Test at 320 px, 375 px, 768 px and desktop widths without horizontal scrolling.
- [ ] Keyboard focus is visible and all controls are reachable.
- [ ] Browser zoom to 200% remains usable; reduced-motion preference is respected.
- [ ] Confirm no camera frame upload request is made by the application.
- [ ] Confirm the privacy page describes external asset requests and local CSV download.

## Help centre and SEO
- [ ] Help centre shows exactly 20 application-specific guides; search and topic filters work.
- [ ] Every guide has a unique title, description, canonical, BlogPosting JSON-LD and working links.
- [ ] Sitemap returns successfully and lists 25 canonical URLs.
- [ ] Submit the sitemap in Search Console and monitor indexing; do not assume submission guarantees indexing.

Automated tests do not establish camera accuracy, clinical safety, legal compliance or search ranking.
