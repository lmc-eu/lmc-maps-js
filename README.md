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
        coords: [15.524, 49.766],
        zoom: 7,
        style: 'lmc-default',
        marker: true,
        lang: 'cs',
        authToken: 'YOUR_TOKEN',
        publicUrl: 'https://tileserver.lmc.cz'
    });
})();
```

### Options

| Property    | Description | Type     |
| :---        | :---        | :---     |
| container   | Id of HTML container for map | string
| coords      | LngLat Array for center of map (default [14.4563172, 50.1028914]) | array
| zoom        | Initial zoom level of map (default: 12) | number
| hasMarker   | Show marker in center of map (optional) | boolean
| style       | Style id (default: lmc-default) ([see supported styles](https://maps.lmc.cz/#styles))  | string
| lang        | Language of labels in map ([see supported languages](#supported-languages)) (default: native) | string
| authToken   | Your Authorization token (required) | string
| publicUrl   | Url to your tileserver (default: https://tileserver.lmc.cz) | string

#### Supported languages <a name="supported-languages"></a>

Currently are supported these languages:

bg (Bulgarian), bs (Bosnian), cs (Czech), da (Danish), de (German), el (Greek), en (English), es (Spanish), et (Estonian), fi (Finnish), fr (French), hr (Croatian), hu (Hungarian), is (Icelandic), it (Italian), lt (Lithuanian), lv (Latvian), mk (Macedonian), nl (Dutch), pl (Polish), pt (Portuguese), ro (Romania), ru (Russian), sk (Slovak), sl (Slovene), sq (Albanian), sr (Serbian), sv (Swedish), tr (Turkish), uk (Ukrainian)

### Other usage

See [LMC Maps homepage](https://maps.lmc.cz/) for CDN or IFrame usage.

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
