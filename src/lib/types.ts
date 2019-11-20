export type MapsOptions = {
    container: string;
    coords?: mapboxgl.LngLatLike;
    zoom?: number;
    style?: string;
    lang?: string;
    hasMarker?: boolean;
    authToken: string;
};

export type Styles = {
    URL: string;
    DEFAULT: string;
};

export type MapStyle = 'lmc-default' | 'klokantech-basic';

export type Languages = 'cs' | 'de' | 'en' | 'fi' | 'pl' | 'sk';
