# LMC Maps - JavaScript library

![npm](https://img.shields.io/npm/v/@lmc-eu/lmc-maps?color=green&style=flat-square)

JavaScript client library for simple use of [LMC Maps service](https://maps.lmc.cz/).

See [🗺 example map](https://maps.lmc.cz/map.html?lng=14.4566808&lat=50.1028639&zoom=14&hasMarker&hasInteractivePois) created using this library.

## Installation

```bash
npm install @lmc-eu/lmc-maps
```

## Usage

Install node package `@lmc-eu/lmc-maps`:

```bash
npm install @lmc-eu/lmc-maps --save
```

Create container element for map:

```html
// .html
<div id="lmcMapId"></div>
```

Import css to your sass/css file:

```css
// .scss
@import '~mapbox-gl/dist/mapbox-gl.css';
@import '~@lmc-eu/lmc-maps/dist/lmc-maps.css';
```

Import `LmcMaps` module and create new map:

```js
// .js
import LmcMaps from '@lmc-eu/lmc-maps';

(() => {
    new LmcMaps({
        container: 'lmcMapId',
        zoom: 7,
        center: [15.520, 49.760],
        coords: [[15.524, 49.766], [15.481, 49.758]],
        hasMarker: true,
        hasInteractivePois: true,
        lang: 'cs',
        // Tileserver running on default publicUrl require use of authToken. For demonstration and development purposes only, you can however override default publicUrl to use our "demo tileserver":
        publicUrl: 'https://tileserver.lmc.cz/demo' // DO NOT USE demo tileserver on production! (It has low rate limit.)
        // authToken is not needed for "demo tileserver" but must be defined for production use:
        // authToken: 'YOUR_TOKEN' // DO NOT FORGET to define auth token for production use
    });
})();
```

### Options

| Property    | Description | Type     |
| :---        | :---        | :---     |
| container   | Id of HTML element container for map | string
| zoom        | Initial zoom level of map (default: `12`) | number
| center      | LngLat Array for center of map (default: `[14.4563172, 50.1028914]` or if markers are enabled value is computed automatically.).  | array
| coords      | Array of LngLat Array for one or multiple markers on map | array
| hasMarker   | Show markers passed in coords property (default: `false`) | boolean
| hasInteractivePois | Make POIs like public transport stations interactive, ie. showing popup with more information on click (default: `false`) | boolean
| style       | Style id (default: `lmc-default`) ([see supported styles](https://maps.lmc.cz/#styles))  | string
| lang        | Language of labels in map ([see supported languages](#supported-languages)) (default: null = use native name) | string
| authToken   | Your authorization token (must be defined for production use) | string
| publicUrl   | Url to tileserver (default `https://tileserver.lmc.cz`) ([see more info](#tileserver)) | string

#### Supported languages <a name="supported-languages"></a>

Currently supported languages:

cs (Czech), de (German), en (English), fi (Finnish), pl (Polish), sk (Slovak)

#### Tileserver `publicUrl` and `authToken` <a name="tileserver"></a>

Default tileserver `publicUrl` is set to `https://tileserver.lmc.cz`, but this tilserver can only be used with your own `authToken`.

If you don't have `authToken` yet (eg. during development), you can use demo tileserver by setting `publicUrl` to `https://tileserver.lmc.cz/demo`. This tileserver does not need `authToken`, but it has low rate limit for tiles requests and thus **must not** be used on production.

For production use you need to set `authToken` and use production tileserver (for example `https://tileserver.lmc.cz` - which is also default, so you can omit defining `publicUrl` entirely).

If you run your own tileserver, you can set tileserver path in `publicUrl` option, e.g. `http://localhost:8080` for your local tileserver.

### Other usage

See [LMC Maps homepage](https://maps.lmc.cz/) for CDN or IFrame usage.

## Changelog
For latest changes see [CHANGELOG.md](CHANGELOG.md) file. We follow [Semantic Versioning](https://semver.org/).

## Contributing and development

### Install dependencies

```bash
yarn
```

### Start local Webpack dev server

```bash
yarn start
```

run on `localhost:3001`

### Build library into dist bundle

Build lib bundle to `dist` folder.

```bash
yarn build
```
