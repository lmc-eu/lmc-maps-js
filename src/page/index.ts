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
    const hasInteractivePois: boolean = urlParams.get('hasInteractivePois') !== null;

    const mapIgnored = new LmcMaps({
        container: 'map',
        coords,
        zoom,
        style: 'lmc-default',
        lang,
        hasMarker,
        hasInteractivePois
    });
})();
