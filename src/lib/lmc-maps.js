import mapboxgl from 'mapbox-gl';

import './lmc-maps.scss';

class LmcMaps {

    container;
    map;
    coords = [];
    zoom = 0;

    constructor(container, coords, zoom) {
        this.container = container;
        this.coords = coords;
        this.zoom = zoom;

        this.init();
    }

    init() {
        this.map = new mapboxgl.Map({
            container: this.container,
            style: 'http://gis-tileserver-common-stable.service.dev1-services.consul:26452/styles/klokantech-basic/style.json',
            minZoom: 6,
            center: this.coords,
            zoom: this.zoom,
            renderWorldCopies: false,
            pitchWithRotate: false
        });

        this.setControls();
        this.renderMarker(this.coords);
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
}

export default LmcMaps;
