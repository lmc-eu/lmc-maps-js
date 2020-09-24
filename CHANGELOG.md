# Changelog

<!--
Changelog rules:
- Follow Semantic Versioning (https://semver.org/) and Keep a Changelog principles (https://keepachangelog.com/).
- There should always be "Unreleased" section at the beginning for new changelog records.
- Changelog records should be written in present imperative and end with a dot (eg. "- Improve some feature.").
-->

## Unreleased
### Added
- Click on POIs (currently public transport stations) opens popup with more information (if enabled using `hasInteractivePois` option).

## [0.3.0] - 2020-02-24
### Added
- Add optional `center` property to set default map center.
- Add eslint with typescript options.

### Changed
- BC break: `coords` property requires array of arrays to support multiple points with markers.
- Use demo tileserver for devel without authToken, but with max rate limit for tile requests.
