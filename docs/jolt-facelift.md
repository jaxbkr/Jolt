# Jolt facelift

## Delivered

- Purple, peach, and warm-neutral design across the home page, teams, games, rosters, and player statistics.
- Responsive navigation with text labels and current-page state; team search and game week filters.
- Direct links to the real product replace the fake signup and login buttons.
- Page entrance, play-diagram drawing, hover, and loading animations. Reduced-motion settings disable motion.
- Theme preference persists. Keyboard focus, skip navigation, named controls, and a labelled score table improve access.
- One server-side API client checks HTTP errors and API-level errors, applies a timeout, and caches data for 15 minutes (season metadata for one day). No automatic live polling.
- Missing scores show a dash; zero remains zero. Empty data and provider failures have visible states.

## API findings

The original code requests **2023**, not 2024, from API-Sports API-NFL:
`https://v1.american-football.api-sports.io`.

The current official guide demonstrates 2025 NFL data. Newer seasons are supported by the provider; the exact available seasons and account access must be verified with an authenticated request. The app now reads `/leagues?id=1`, selects the season flagged `current` (or the newest returned year), and offers the returned seasons in a selector. It carries that year into teams, rosters, games, and player statistics.

API season years mean the year the season starts. Early-year playoff games belong to the previous year's season. Season player statistics begin in 2022, and coverage can vary.

The direct API uses `x-apisports-key`; the original implementation sent RapidAPI headers to the direct API host. The shared client uses the documented direct header with the existing server-side `API_KEY` setting. A RapidAPI-issued credential may need a separate provider configuration; it has not been verified here.

Sources checked October 4, 2026:

- [API-NFL documentation](https://api-sports.io/documentation/nfl/v1)
- [Official API-NFL integration guide](https://www.api-football.com/news/post/how-to-get-started-with-api-nfl-the-complete-beginners-guide)
- [API-NFL coverage and plans](https://api-sports.io/sports/nfl)

## Configuration

Use the existing server-only `API_KEY` environment setting for a direct API-Sports key. Do not expose it through a `NEXT_PUBLIC_` variable. The home page works independently of the data connection.

Account-specific live access is not verified. Automatic approval review rejected a metadata check of granted secret names; no stored secrets were retrieved.

## Verification

- `API_KEY='' npm run build`: passed, all seven routes compiled.
- `node tests/api.test.mjs`: five tests passed (season discovery, offseason selection, provider errors, missing credentials, and direct authentication).
- Chromium: desktop and 390px mobile layout, no horizontal page overflow, theme persistence, navigation, missing-connection state, 404, and reduced motion passed. No browser JavaScript errors.
- Live API account access was not tested. Browser data-flow checks use synthetic data only.
- No deployment or production setting was changed.
- Synthetic-data browser checks passed: search and empty results, 2023 selection retained through team → roster → player, week filter, winning score, zero values, quarter table, absent team, and mobile game detail layout.
