export type MapsOptions = {
    container: string;
    coords?: Array<mapboxgl.LngLatLike>;
    center?: mapboxgl.LngLatLike;
    zoom?: number;
    style?: MapStyle;
    lang?: Languages;
    hasMarker?: boolean;
    hasInteractivePois?: boolean;
    authToken?: string;
    publicUrl?: string;
};

export type Styles = {
    DEFAULT: MapStyle;
};

export type MapStyle = 'lmc-default' | 'klokantech-basic' | null;

export type Languages = 'cs' | 'de' | 'en' | 'fi' | 'pl' | 'sk' | null;
