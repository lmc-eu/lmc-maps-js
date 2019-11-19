export const setLanguage = (style: any, lang: string): any => {
    const
        newStyle = {...style},
        labelFallbackLayers: any[] = [];

    newStyle.layers.forEach((layer: any, index: number) => {
        if (layer.id.indexOf('label') !== -1 && layer.layout['text-field']) {
            labelFallbackLayers.push({
                placement: index,
                data: JSON.parse(JSON.stringify(layer))
            });

            addLayerFilter(layer, ['has', `name:${lang}`]);
            layer.layout['text-field'] = `{name:${lang}}`;
        }
    });

    labelFallbackLayers.forEach((layer: any, index: number) => {
        layer.data.id = layer.data.id + '-langFallback';
        addLayerFilter(layer.data, ['!has', `name:${lang}`]);
        newStyle.layers.splice(layer.placement + index + 1, 0, layer.data);
    });

    return newStyle;
}

const addLayerFilter = (layer: any, filter: string[]) => {
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
