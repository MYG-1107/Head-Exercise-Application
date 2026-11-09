# Technical SEO audit and release checks

This project is a static GitHub Pages application. The technical SEO changes are intentionally limited to improvements supported by the current site architecture.

## Current baseline verified in the repository

- Four useful public pages are served as HTML: the tracker, quick guide, privacy and safety.
- Each indexable page has a distinct title, a useful meta description, a self-referencing canonical URL and an explicit `index, follow` robots directive.
- Main content is present in the HTML source; JavaScript enhances the tracker rather than creating the primary page content.
- Internal navigation uses real anchor elements with `href` destinations.
- `robots.txt` permits crawling and points to the XML sitemap.
- The sitemap lists only the four canonical public URLs.
- JSON-LD, Open Graph and social preview metadata are present on the public pages.
- A custom GitHub Pages 404 document now helps visitors recover from mistyped or retired URLs. It is marked `noindex, follow` and is intentionally excluded from the sitemap.

## Automated regression coverage

Run:

```sh
npm run check
```

The test suite checks titles, descriptions, canonical URLs, robots directives, sitemap membership, crawlable internal links and the 404 page. It also runs the existing tracker and application quality tests.

## Checks that require deployment or external services

The repository cannot set arbitrary HTTP response headers on GitHub Pages. After publishing, inspect response status codes and confirm the 404 document is returned with an actual HTTP 404. Check redirects from any historical URLs and ensure there are no redirect chains.

After deployment:

1. Open Google Search Console and use URL Inspection on the home page and each supporting page. Request indexing where appropriate.
2. Submit `https://myg-1107.github.io/Head-Exercise-Application/sitemap.xml` in Search Console.
3. Use PageSpeed Insights / Lighthouse on mobile and desktop. Review Core Web Vitals, especially LCP, INP and CLS.
4. Review the rendered HTML and screenshot in Search Console's live URL test. The essential page text should remain visible without relying on JavaScript.
5. Monitor Search Console indexing, crawl errors, sitemap status and Core Web Vitals over time.

## Important limitation

Technical SEO makes pages easier to discover, crawl and understand; it does not guarantee indexing, traffic or a first-page ranking. Search demand, useful content, reputation, links, user experience and competition also affect visibility. Do not add thin pages or keyword-stuffed copy just to increase the sitemap size.
