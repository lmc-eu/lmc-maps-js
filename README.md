# LMC Maps - JavaScript library

JavaScript client library for simple use of LMC Maps.

[LMC Maps homepage](https://maps.lmc.cz/) | [Example map](https://maps.lmc.cz/map.html?lng=18.2992239&lat=49.8455919&zoom=14&hasMarker&auth_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImptSThuUHFTR3JTNGFVLWdqajVTamp3R1ZoRSIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJnaXMtdGlsZXNlcnZlciIsImF6cCI6Imdpcy1kZW1vLWFjY291bnQiLCJhdWQiOiJnaXMtdGlsZXNlcnZlciIsImV4cCI6MTU4OTk3ODA5NiwianRpIjoiZTVhMWRiZmEtMGM4NC00NzM0LWI5ZDItNTQzMjYzZGFkMmExIiwiaWF0IjoxNTc0NDI2MDk2LCJpc3MiOiJzaWdub3IiLCJuYmYiOjE1NzQ0MjYwOTYsInN1YiI6ImFjdGlvbi1yZXF1ZXN0LXRva2VuIn0.VNosmSfKsZlLi1aY7wj6mrOL16a7c_aQX_GtAVp7nI0UTKSUOsUPFkuXNk079l06RlYcN7_q0lh5sWcWCeEV4MH4n_QcFaWeqhm0BjUpM-TQslUp3r6tWS3crt_HaU9teoXhNaHfOLj6OplUOTXmnEw13tbH_kUwm66NOYRJG9S6jdJVDKC-M4zE5u-AuNNU-rXAdttjY2ctdNQ9SUYQjGyJUKewGVcw1D6H_cxF7S3FSjkRh_NzNdgztKKNSfmh_qRgDe-ti_nSOndlSL2cXF0oG0fC2tUS5KV6Sg3ury0lJr71ZCtb3WB874ueR6TGBsYTuEw3jnXvwIElmhAyLA)

## Installation

```bash
npm install @lmc-eu/lmc-maps
```

## Usage

Install node package `@lmc-eu/lmc-maps`

```bash
npm install @lmc-eu/lmc-maps --save
```

Create container for map

```html
// .html
<div id="lmcMapId"></div>
```

Import css to your sass/css file

```css
// .scss
@import '~mapbox-gl/dist/mapbox-gl.css';
@import '~@lmc-eu/lmc-maps/dist/lmc-maps.css';
```

Import LmcMaps module and create new map

```js
// .js
import LmcMaps from '@lmc-eu/lmc-maps';

(() => {
    new LmcMaps({
        container: 'lmcMapId',
        coords: [[15.524, 49.766], [15.481, 49.758]],
        center: [15.520, 49.760],
        zoom: 7,
        style: 'lmc-default',
        marker: true,
        lang: 'cs',
        // Default tileserver require use of authToken. You can override default to use our "demo tileserver" for demonstration and development purposes:
        publicUrl: 'https://tileserver.lmc.cz/demo' // DO NOT use demo tileserver on production! (It has low rate limit.)
        // authToken is not needed for "demo tileserver", but requests will have low rate limit.
        // authToken: 'YOUR_TOKEN' // DO NOT FORGET to define auth token for production use
    });
})();
```

### Options

| Property    | Description | Type     |
| :---        | :---        | :---     |
| container   | Id of HTML container for map | string
| coords      | Array of LngLat Array for one or multiple points on map | array
| center      | LngLat Array for center of map (default [14.4563172, 50.1028914]) | array
| zoom        | Initial zoom level of map (default: 12) | number
| hasMarker   | Show marker in center of map (optional) | boolean
| style       | Style id (default: lmc-default) ([see supported styles](https://maps.lmc.cz/#styles))  | string
| lang        | Language of labels in map ([see supported languages](#supported-languages)) (default: native) | string
| authToken   | Your authorization token (must be defined for production use) | string
| publicUrl   | Url to tileserver (default `https://tileserver.lmc.cz`) ([see more info](#tileserver)) | string

#### Supported languages <a name="supported-languages"></a>

Currently are supported these languages:

bg (Bulgarian), bs (Bosnian), cs (Czech), da (Danish), de (German), el (Greek), en (English), es (Spanish), et (Estonian), fi (Finnish), fr (French), hr (Croatian), hu (Hungarian), is (Icelandic), it (Italian), lt (Lithuanian), lv (Latvian), mk (Macedonian), nl (Dutch), pl (Polish), pt (Portuguese), ro (Romania), ru (Russian), sk (Slovak), sl (Slovene), sq (Albanian), sr (Serbian), sv (Swedish), tr (Turkish), uk (Ukrainian)

#### Tileserver `publicUrl` and `authToken` <a name="tileserver"></a>

Default tileserver `publicUrl` is set to `https://tileserver.lmc.cz`, but this tilserver can only be used with your own `authToken`.

If you don't have authToken yet (eg. during development), you can use demo tileserver by setting `publicUrl` to `https://tileserver.lmc.cz/demo`. This tileserver does not need `authToken`, but it has low rate limit for tiles requests and thus **must not** be used on production.

For production use you need to set `authToken` and use production tileserver (for example `https://tileserver.lmc.cz` - which is also default, so you can omit defining `publicUrl` entirely).

If you run your own tileserver, you can set tileserver path in `publicUrl` option, e.g. `http://localhost:8080` for your local tileserver.

### Other usage

See [LMC Maps homepage](https://maps.lmc.cz/) for CDN or IFrame usage.

## Changelog
For latest changes see [CHANGELOG.md](CHANGELOG.md) file. We follow [Semantic Versioning](https://semver.org/).

## Contributing and development

### Install dependencies

```bash
npm install
```

### Start local Webpack dev server

```bash
npm start
```

run on `localhost:3001`

### Build library into dist bundle

Build lib bundle to `dist` folder.

```bash
npm run build
```
