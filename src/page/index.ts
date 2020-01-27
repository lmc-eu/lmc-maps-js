import LmcMaps from '../lib/lmc-maps';

import './index.scss';

import { Languages } from '../lib/types';

(() => {

    const urlParams: URLSearchParams = new URL(window.location.href).searchParams;

    const coords: [number, number] = urlParams.get('lng') && urlParams.get('lat')
        ? [
            parseFloat(urlParams.get('lng')),
            parseFloat(urlParams.get('lat'))
          ]
        : null;
    const lang: Languages = urlParams.get('lang') as Languages;
    const zoom: number = parseInt(urlParams.get('zoom'));
    const hasMarker: boolean = urlParams.get('hasMarker') !== null;
    const authToken: string = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkR4QzBhZEVub0VvemFUUnJHakZwTWFfUkdwWSIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJ1c2VyIiwiYXpwIjoidXNlciIsImNydCI6IiIsImF1ZCI6InNpZ25vciIsImV4cCI6MTU3NjMyOTI3NywianRpIjoiMGU1NGY3NzYtYjQwMS00ZWI0LTkyMWItMmMxMWNkMDdmN2M5IiwiaWF0IjoxNTczNzM3Mjc3LCJpc3MiOiJzaWdub3IiLCJuYmYiOjE1NzM3MzcyNzcsInN1YiI6ImF1dGgtdG9rZW4ifQ.tiXx8UA9GoY2rqO9_OJT8If2QHbijrPpC-Bt-EEoXV7h7KfpP7mj6EVDVTENsfRmhcRFT6zakT9G-O9A7ntSKBx367C9BdCVY_WVB8VPU1lW3c3_N4LirlIjCY3zWP2v0tTXB01JpDrbAwyc6OhtNDAZADzodqoJs_2-CHSM01pjWQ08xFM8x6OgZOV5DQ7m7k4-b49bDftZJ15jomHenY-RNCEY-eX2np6jaS2gUphicixaF6rMpyV6hssyrsjt6TXy4-f4P2RgHz4AcdVrEf2uct8abS_1lfFHqIvuLU3YYkJQV0VAs7MUoetFQe1QIBP-m4HX8ffuLdELSZsqpA';

    new LmcMaps({
        container: 'map',
        coords,
        zoom,
        style: 'lmc-default',
        lang,
        hasMarker,
        authToken
    });

})();
