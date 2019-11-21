export type MapsOptions = {
    container: string;
    coords?: mapboxgl.LngLatLike;
    zoom?: number;
    style?: MapStyle;
    lang?: Languages;
    hasMarker?: boolean;
    authToken: string;
};

export type Styles = {
    URL: string;
    DEFAULT: MapStyle;
};

export type MapStyle = 'lmc-default' | 'klokantech-basic' | null;

export type Languages = 'cs' | 'de' | 'en' | 'fi' | 'pl' | 'sk' | null;
