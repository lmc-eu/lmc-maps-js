# Changelog

<!--
Changelog rules:
- Follow Semantic Versioning (https://semver.org/) and Keep a Changelog principles (https://keepachangelog.com/).
- There should always be "Unreleased" section at the beginning for new changelog records.
- Changelog records should be written in present imperative and end with a dot (e.g. "- Improve some feature.").
-->

## Unreleased

## [0.5.1] - 2022-11-24
### Changed
- Default `center` coordinates to point to the new offices.
- Update dependencies.

## [0.5.0] - 2020-11-03
### Changed
- Show POI type (like "Bus stop") in popup if POI does not have its proper name in source data (instead of "undefined").

## [0.4.0] - 2020-09-30
### Added
- Click on POIs (currently public transport stations) opens popup with more information (if enabled using `hasInteractivePois` option).

## [0.3.0] - 2020-02-24
### Added
- Add optional `center` property to set default map center.
- Add eslint with typescript options.

### Changed
- BC break: `coords` property requires array of arrays to support multiple points with markers.
- Use demo tileserver for devel without authToken, but with max rate limit for tile requests.
