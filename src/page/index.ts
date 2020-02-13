import LmcMaps from '../lib/lmc-maps';

import './index.scss';

import { Languages } from '../lib/types';

(() => {
    const urlParams: URLSearchParams = new URL(window.location.href).searchParams;

    const coords: [[number, number]] = urlParams.get('lng') && urlParams.get('lat')
        ? [[
            parseFloat(urlParams.get('lng')),
            parseFloat(urlParams.get('lat'))
        ]]
        : null;
    const lang: Languages = urlParams.get('lang') as Languages;
    const zoom: number = parseInt(urlParams.get('zoom'), 10);
    const hasMarker: boolean = urlParams.get('hasMarker') !== null;
    const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImptSThuUHFTR3JTNGFVLWdqajVTamp3R1ZoRSIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJnaXMtdGlsZXNlcnZlciIsImF6cCI6Imdpcy1kZW1vLWFjY291bnQiLCJhdWQiOiJnaXMtdGlsZXNlcnZlciIsImV4cCI6MTU4OTk3ODA5NiwianRpIjoiZTVhMWRiZmEtMGM4NC00NzM0LWI5ZDItNTQzMjYzZGFkMmExIiwiaWF0IjoxNTc0NDI2MDk2LCJpc3MiOiJzaWdub3IiLCJuYmYiOjE1NzQ0MjYwOTYsInN1YiI6ImFjdGlvbi1yZXF1ZXN0LXRva2VuIn0.VNosmSfKsZlLi1aY7wj6mrOL16a7c_aQX_GtAVp7nI0UTKSUOsUPFkuXNk079l06RlYcN7_q0lh5sWcWCeEV4MH4n_QcFaWeqhm0BjUpM-TQslUp3r6tWS3crt_HaU9teoXhNaHfOLj6OplUOTXmnEw13tbH_kUwm66NOYRJG9S6jdJVDKC-M4zE5u-AuNNU-rXAdttjY2ctdNQ9SUYQjGyJUKewGVcw1D6H_cxF7S3FSjkRh_NzNdgztKKNSfmh_qRgDe-ti_nSOndlSL2cXF0oG0fC2tUS5KV6Sg3ury0lJr71ZCtb3WB874ueR6TGBsYTuEw3jnXvwIElmhAyLA';

    const mapIgnored = new LmcMaps({
        container: 'map',
        coords,
        zoom,
        style: 'lmc-default',
        lang,
        hasMarker,
        authToken
    });
})();
