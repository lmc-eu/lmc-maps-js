/// <reference types="mapbox-gl" />

declare module '@lmc-eu/lmc-maps' {

    declare class LmcMaps {

        constructor(options: MapsOptions);

        container: string;

        map: mapboxgl.Map;

        coords: mapboxgl.LngLatLike;

        zoom: number;

        style: MapStyle;

        lang: Languages;

        hasMarker: boolean;

        authToken: string;

        publicUrl: string;

        init(): void;

        getEvents(): void;

        setControls(): void;

    }

    export = LmcMaps;

}

declare type Languages = 'cs' | 'de' | 'en' | 'fi' | 'pl' | 'sk' | null;

declare type MapStyle = 'lmc-default' | 'klokantech-basic' | null;

declare type MapsOptions = {

    container: string;

    coords?: mapboxgl.LngLatLike;

    zoom?: number;

    style?: MapStyle;

    lang?: Languages;

    hasMarker?: boolean;

    authToken: string;

    publicUrl?: string;

};
