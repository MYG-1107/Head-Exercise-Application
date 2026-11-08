# Search visibility and content setup

## What this release includes

- Correct, self-referencing canonical URLs using this repository's GitHub Pages path: `https://myg-1107.github.io/Head-Exercise-Application/`.
- Unique titles, meta descriptions, supplemental keywords and social-sharing metadata for the tracker, guide, privacy, safety and article pages.
- JSON-LD structured data for the web application, support pages, article collection and individual BlogPosting pages.
- 31 individual educational articles with visible body content and crawlable links.
- Internal links between the tracker, guide, article index and related articles.
- An updated sitemap containing every intended indexable HTML page and an updated robots.txt.
- A separate GrapeCrux destination for business enquiries. No non-functional contact form has been added.

## Important note about meta keywords

The `meta name="keywords"` tag is included as supplementary metadata, but Google explicitly says it does not use this tag for indexing or ranking. Do not repeat or stuff keywords. Use accurate page titles, useful visible content, descriptive internal links and distinct meta descriptions instead.

Official reference: [Google: Meta tags and attributes that Google supports](https://developers.google.com/search/docs/crawling-indexing/special-tags).

## After merging and publishing

1. Add the URL-prefix property `https://myg-1107.github.io/Head-Exercise-Application/` in Google Search Console.
2. Complete the verification method Google provides. If using a verification meta tag, add Google's exact tag to `index.html`; do not invent a verification value.
3. Submit `https://myg-1107.github.io/Head-Exercise-Application/sitemap.xml` in Search Console.
4. Use URL Inspection on the homepage, blog index and selected articles. Request indexing where available; a sitemap is a discovery hint, not a guarantee.
5. Add the same site to Bing Webmaster Tools and submit the sitemap.
6. Confirm deployed canonical URLs match the public GitHub Pages URL. This repository is `Head-Exercise-Application`; the previous `/head-exercise-tracker/` canonical path was inconsistent.
7. Review search queries, impressions, clicks and reader feedback over time.

## Editorial quality

- Each article should answer a distinct reader question and provide practical explanation.
- Keep medical, legal, financial and cybersecurity content educational; do not imply professional advice or certification.
- Do not add fabricated authors, client results, case studies, citations, testimonials or clinical claims.
- Review article details when standards, laws or vendor behaviour change.
- Avoid near-duplicate pages that differ only by keyword.

## Ranking expectations

No code change guarantees indexing, leads, a first-page position or a fixed number of enquiries. Search engines decide whether and where to show pages. Results also depend on search demand, competition, relevance, content quality, reputation, links, usability and time.

The objective is to make the site accurate, accessible, discoverable and transparent—not to promise a ranking.
