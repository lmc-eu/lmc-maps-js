/// <reference types="mapbox-gl" />

export = lmcmaps;
export as namespace lmcmaps;

declare namespace lmcmaps {

    export class LmcMaps {

        constructor(options: MapsOptions);

        container: string;

        map: mapboxgl.Map;

        coords: mapboxgl.LngLatLike;

        zoom: number;

        style: MapStyle;

        lang: Languages;

        hasMarker: boolean;

        authToken: string;

        init(): void;

        getEvents(): void;

        setControls(): void;

    }

    export type Styles = {

        URL: string;

        DEFAULT: string;

    };

    export type MapStyle = 'lmc-default' | 'klokantech-basic' | null;

    export type Languages = 'cs' | 'de' | 'en' | 'fi' | 'pl' | 'sk' | null;

    export const STYLES: Styles;

    export type MapsOptions = {

        container: string;

        coords?: mapboxgl.LngLatLike;

        zoom?: number;

        style?: MapStyle;

        lang?: Languages;

        hasMarker?: boolean;

        authToken: string;

    };

}
