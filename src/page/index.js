import LmcMaps from '../lib/lmc-maps';

import './index.scss';

(() => {

    const urlParams = new URL(window.location.href).searchParams;

    const coords = [
        urlParams.get('lng') || 15.524,
        urlParams.get('lat') || 49.766,
    ];

    const lang = urlParams.get('lang');
    
    const zoom = urlParams.get('zoom') || 7;
    
    new LmcMaps('map', {
        coords,
        zoom,
        style: 'lmc-default',
        lang
    });

})();
