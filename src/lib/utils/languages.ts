type FallbackLayers = {
    placement: number;
    data: mapboxgl.AnyLayer;
};

const addLayerFilter = (layer: mapboxgl.Layer, filter: string[]): void => {
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
};

export const setLanguage = (style: mapboxgl.Style, lang: string): mapboxgl.Style => {
    const newStyle: mapboxgl.Style = { ...style };
    const labelFallbackLayers: FallbackLayers[] = [];

    newStyle.layers.forEach((layer: mapboxgl.Layer, index: number) => {
        const symbolLayerLayout: mapboxgl.SymbolLayout = layer.layout;

        if (layer.id.indexOf('label') !== -1 && symbolLayerLayout['text-field']) {
            labelFallbackLayers.push({
                placement: index,
                data: JSON.parse(JSON.stringify(layer))
            });

            addLayerFilter(layer, ['has', `name:${lang}`]);
            symbolLayerLayout['text-field'] = `{name:${lang}}`;
        }
    });

    labelFallbackLayers.forEach((layer: FallbackLayers, index: number): void => {
        layer.data.id += '-langFallback';
        addLayerFilter(layer.data, ['!has', `name:${lang}`]);
        newStyle.layers.splice(layer.placement + index + 1, 0, layer.data);
    });

    return newStyle;
};
