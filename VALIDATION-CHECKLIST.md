# Post-deployment validation checklist

## Essential pages
- [ ] Homepage opens directly to the movement counter.
- [ ] Main navigation contains only Quick guide, Privacy and Safety.
- [ ] Quick guide links back to the counter and explains camera/manual mode, calibration, a complete repetition, pause/stop and CSV export.
- [ ] Privacy page accurately explains camera processing, third-party asset requests, in-memory counts and user-triggered CSV export.
- [ ] Safety page clearly explains intended use and limitations.
- [ ] Removed article and walkthrough links are no longer visible.

## Camera and counting
- [ ] Camera remains off until Start camera is selected.
- [ ] Permission granted: preview appears, calibration completes and status updates.
- [ ] Permission denied/unavailable: a useful message appears and manual mode remains usable.
- [ ] One direction followed by return to centre increments the correct count once.
- [ ] Direct direction-to-direction movement does not count a completed repetition.
- [ ] Face loss interrupts an unfinished movement without completing a count.
- [ ] Disconnecting the active camera stops the session and releases camera resources.
- [ ] Hiding the browser tab pauses the session and releases camera resources.
- [ ] Resume reconnects the camera and requires fresh calibration.
- [ ] Recalibration, flip, pause, resume and stop work.
- [ ] Manual entries update counts and are labelled self-reported.
- [ ] CSV export downloads only after the user clicks Export summary.

## Responsive, accessibility and privacy
- [ ] Test at 320 px, 375 px, 768 px and desktop widths without horizontal scrolling.
- [ ] Keyboard focus is visible and all controls are reachable.
- [ ] Browser zoom to 200% remains usable; reduced-motion preference is respected.
- [ ] Larger text and High contrast settings can be enabled and disabled.
- [ ] Confirm no camera frame upload request is made by the application.
- [ ] Confirm the privacy page describes external asset requests and local CSV download.

## Offline and SEO
- [ ] Home, Quick guide, Privacy and Safety load from the service-worker cache after an online visit.
- [ ] Manual mode remains usable offline.
- [ ] Sitemap returns successfully and lists exactly four canonical URLs.
- [ ] Submit the updated sitemap in Search Console and inspect the four retained URLs.
- [ ] Previously indexed article URLs are no longer promoted in the sitemap or internal links.

Automated tests do not establish camera accuracy, clinical safety, legal compliance, WCAG conformance or search ranking.
