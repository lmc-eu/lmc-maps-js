import LmcMaps from '../lib/lmc-maps';

import './index.scss';

(() => {

    const urlParams = new URL(window.location.href).searchParams;

    const coords = urlParams.get('lng') && urlParams.get('lat')
        ? [urlParams.get('lng'), urlParams.get('lat')]
        : null;

    const lang = urlParams.get('lang');
    const zoom = urlParams.get('zoom');
    const marker = urlParams.get('hasMarker') !== null;
    
    new LmcMaps('map', {
        coords,
        zoom,
        style: 'lmc-default',
        lang,
        marker
    });

})();
