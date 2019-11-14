import mapboxgl from 'mapbox-gl';

import * as con from './constants';

import './lmc-maps.scss';

class LmcMaps {

    container;
    map;
    coords;
    zoom;
    style;
    lang;
    marker;

    constructor(container, options) {
        this.container = container;
        this.coords = options.coords || [14.4563172, 50.1028914];
        this.zoom = options.zoom || 12;

        this.style = `${con.STYLES_URL}${
            con.STYLES.indexOf(options.style) !== -1 ? options.style : con.STYLES[0]
        }/style.json`;
        this.lang = options.lang || null;
        this.marker = options.marker;

        this.init();
    }

    init() {
        this.map = new mapboxgl.Map({
            container: this.container,
            style: this.style,
            center: this.coords,
            zoom: this.zoom,
            renderWorldCopies: false,
            pitchWithRotate: false,
            transformRequest: (url, resourceType) => {
                if (url.startsWith(TILESERVER_URL) && resourceType === 'Tile') {
                    return {
                        url: url,
                        headers: {
                            'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkR4QzBhZEVub0VvemFUUnJHakZwTWFfUkdwWSIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJ1c2VyIiwiYXpwIjoidXNlciIsImNydCI6IiIsImF1ZCI6InNpZ25vciIsImV4cCI6MTU3NjMyOTI3NywianRpIjoiMGU1NGY3NzYtYjQwMS00ZWI0LTkyMWItMmMxMWNkMDdmN2M5IiwiaWF0IjoxNTczNzM3Mjc3LCJpc3MiOiJzaWdub3IiLCJuYmYiOjE1NzM3MzcyNzcsInN1YiI6ImF1dGgtdG9rZW4ifQ.tiXx8UA9GoY2rqO9_OJT8If2QHbijrPpC-Bt-EEoXV7h7KfpP7mj6EVDVTENsfRmhcRFT6zakT9G-O9A7ntSKBx367C9BdCVY_WVB8VPU1lW3c3_N4LirlIjCY3zWP2v0tTXB01JpDrbAwyc6OhtNDAZADzodqoJs_2-CHSM01pjWQ08xFM8x6OgZOV5DQ7m7k4-b49bDftZJ15jomHenY-RNCEY-eX2np6jaS2gUphicixaF6rMpyV6hssyrsjt6TXy4-f4P2RgHz4AcdVrEf2uct8abS_1lfFHqIvuLU3YYkJQV0VAs7MUoetFQe1QIBP-m4HX8ffuLdELSZsqpA'
                        }
                    }
                }
            }
        });

        this.getEvents();

        this.setControls();
        this.marker && this.renderMarker(this.coords);
    }

    getEvents() {
        this.map.on('load', () => {
            con.LANGUAGES.indexOf(this.lang) !== -1 && this.setLanguage(this.lang);
        });
    }

    setLanguage(lang) {
        const style = JSON.parse(JSON.stringify(this.map.getStyle()));

        const nameFallbackLayers = [];

        style.layers.forEach((layer, index) => {
            if (layer.id.indexOf('label') !== -1 && layer.layout['text-field']) { 
                nameFallbackLayers.push([index, JSON.parse(JSON.stringify(layer))]);
                this.addLayerFilter(layer, ['has', `name:${lang}`]);
                layer.layout['text-field'] = `{name:${lang}}`;
            }
        });

        nameFallbackLayers.forEach((layer, index) => {
            layer[1].id = layer[1].id + '-langFallback';
            this.addLayerFilter(layer[1], ['!has', `name:${lang}`]);
            style.layers.splice(layer[0] + index + 1, 0, layer[1]);
        });

        this.map.setStyle(style, {
            diff: true
        });
    }

    setControls() {
        this.map.addControl(new mapboxgl.NavigationControl({
            showCompass: false
        }));

        this.map.addControl(new mapboxgl.ScaleControl({
            maxWidth: 80
        }));
    }

    renderMarker(coords) {
        new mapboxgl.Marker({
            element: this.setMarkerStyle(),
            anchor: 'bottom',
            offset: [0, 12] // translate cause shadow in image
        }).setLngLat(coords)
          .addTo(this.map);
    }

    setMarkerStyle() {
        const el = document.createElement('div');
        el.className = 'lmc-maps__marker';

        return el;
    }

    addLayerFilter(layer, filter) {
        if (!layer.filter) {
            layer.filter = filter;
        } else if (layer.filter[0] === 'all') {
            layer.filter.push(filter);
        } else {
            layer.filter = [
                'all',
                layer.filter,
                filter
            ];
        }
    }
}

export default LmcMaps;
