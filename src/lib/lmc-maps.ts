import mapboxgl, { PointLike, MapMouseEvent, MapboxGeoJSONFeature } from 'mapbox-gl';

import './lmc-maps.scss';

import { MapsOptions, Languages, MapStyle } from './types';
import { STYLES, EVENTS, FEATURE_LAYERS } from './constants';

import { setLanguage } from './utils/languages';
import { createMarker } from './utils/markers';
import { createPopup } from './utils/popups';

declare const TILESERVER_URL: string;

class LmcMaps {
    container: string;

    map: mapboxgl.Map;

    bounds: mapboxgl.LngLatBounds;

    coords: Array<mapboxgl.LngLatLike>;

    center: mapboxgl.LngLatLike;

    zoom: number;

    style: MapStyle;

    lang: Languages;

    hasMarker: boolean;

    hasInteractivePois: boolean;

    authToken: string;

    publicUrl: string;

    constructor(options: MapsOptions) {
        this.container = options.container;

        this.coords = options.coords;

        this.center = options.center;

        this.zoom = options.zoom;

        this.style = options.style || STYLES.DEFAULT;

        this.lang = options.lang;

        this.hasMarker = options.hasMarker;

        this.hasInteractivePois = options.hasInteractivePois;

        this.authToken = options.authToken;

        this.publicUrl = options.publicUrl || TILESERVER_URL;

        this.init();
    }

    init() {
        this.map = new mapboxgl.Map({
            container: this.container,
            style: `${this.publicUrl}/styles/${this.style}/style.json`,
            center: this.center || [14.4563172, 50.1028914],
            zoom: this.zoom || 12,
            renderWorldCopies: false,
            pitchWithRotate: false,
            transformRequest: (url: string, resourceType: mapboxgl.ResourceType) => ({
                url,
                headers: (this.authToken && url.startsWith(this.publicUrl) && resourceType === 'Tile')
                    ? { Authorization: `Bearer ${this.authToken}` }
                    : {}
            })
        });

        this.getEvents();

        this.hasInteractivePois && this.enableFeatureClick([
            FEATURE_LAYERS.POI.BUS_STOPS,
            FEATURE_LAYERS.POI.TRAM_STOPS,
            FEATURE_LAYERS.POI.RAILWAY_STATIONS,
            FEATURE_LAYERS.POI.SUBWAY_STATIONS
        ]);

        this.setControls();

        this.coords && this.computeMapPoints();
    }

    getEvents() {
        this.map.on('load', () => {
            this.lang && this.map.setStyle(setLanguage(this.map.getStyle(), this.lang), {
                diff: true
            });
        });
    }

    enableFeatureClick(layers: string[]) {
        layers.forEach((layer) => {
            this.map.on('mouseenter', layer, () => {
                this.map.getCanvas().style.cursor = 'pointer';
            });

            this.map.on('mouseleave', layer, () => {
                this.map.getCanvas().style.cursor = '';
            });
        });

        this.map.on('click', (e: MapMouseEvent) => {
            const point: [PointLike, PointLike] = [
                [e.point.x - EVENTS.CLICK.POINTER_BBOX, e.point.y - EVENTS.CLICK.POINTER_BBOX],
                [e.point.x + EVENTS.CLICK.POINTER_BBOX, e.point.y + EVENTS.CLICK.POINTER_BBOX]
            ];

            const features = this.getPointFeatures(point, layers);
            features.forEach((feature) => {
                createPopup(feature, this.lang)?.addTo(this.map);
            });
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

    getPointFeatures(point: [PointLike, PointLike], layers: string[]): MapboxGeoJSONFeature[] {
        return this.map.queryRenderedFeatures(point, {
            layers
        }).filter((feature) => feature.geometry.type === 'Point');
    }

    computeMapPoints() {
        this.bounds = new mapboxgl.LngLatBounds();

        this.coords.forEach((coord: mapboxgl.LngLatLike): void => {
            if (this.hasMarker) {
                createMarker(coord).addTo(this.map);
            }

            const convertedCoord = mapboxgl.LngLat.convert(coord);
            this.bounds.extend(new mapboxgl.LngLat(convertedCoord.lng, convertedCoord.lat));
        });

        !this.center && this.map.fitBounds(this.bounds, {
            maxZoom: this.zoom || 12,
            padding: 70, // in px, to make markers on the top edge visible
            duration: 0
        });
    }
}

export default LmcMaps;
