# Word Menagerie pages

These pages use `_layouts/word-menagerie.html` and the scoped stylesheet in `assets/word-menagerie/`. They deliberately bypass the general site's Hydejack includes and Google Analytics configuration. No external fonts, JavaScript, cookies, or analytics are added by these templates.

Routes:

- `/word-menagerie/` — landing page, game collection, screenshots, pricing, and support FAQ.
- `/word-menagerie/privacy/` — app and game-page privacy practices, publisher, and support contact.
- `/word-menagerie/disclosures/` — allowances, purchases and offer codes, advertising status, artwork and word-list acknowledgments, and original dictionary notices.

The App Store listing does not exist in this change. The page says Coming soon to iPhone. Once the listing is available, replace the coming-soon status with the official App Store download link and update the availability FAQ. Confirm the live storefront price; $4.99 is the planned US full-unlock price.

The current app has no ad SDK. Update the landing page, privacy policy, disclosures, and App Store privacy answers before publishing an ad-enabled version. Review the policy date and intended audience before launch. Keep public support mail at wordmenagerie.support@gmail.com current.

Images are optimized WebP derivatives of the game's existing artwork and actual simulator screenshots. The screenshot interface may vary from the latest app version. The full dictionary notices are copied from the app's bundled Dictionary-LICENSE.txt; preserve upstream notices when updating the list.

Validation performed: full existing Jekyll build; local-link, anchor, asset, and rendered-template checks; no script tags in the three rendered pages; desktop landing preview at 1280 pixels; mobile landing at 390 pixels; privacy/disclosure checks at 320 pixels; support FAQ and license disclosure interactions.

The GitHub Pages workflow deploys pushes to main. This change is prepared as a draft pull request, so merging it is the publishing step. After publishing, verify all three public URLs before adding them to the app and App Store Connect. Linktree promotion is managed by the owner.
