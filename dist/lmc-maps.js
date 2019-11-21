import mapboxgl from 'mapbox-gl';

var STYLES = {
    URL: "https://tileserver.lmc.cz" + "/styles/",
    DEFAULT: 'lmc-default'
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var setLanguage = function (style, lang) {
    var newStyle = __assign({}, style), labelFallbackLayers = [];
    newStyle.layers.forEach(function (layer, index) {
        if (layer.id.indexOf('label') !== -1 && layer.layout['text-field']) {
            labelFallbackLayers.push({
                placement: index,
                data: JSON.parse(JSON.stringify(layer))
            });
            addLayerFilter(layer, ['has', "name:" + lang]);
            layer.layout['text-field'] = "{name:" + lang + "}";
        }
    });
    labelFallbackLayers.forEach(function (layer, index) {
        layer.data.id = layer.data.id + '-langFallback';
        addLayerFilter(layer.data, ['!has', "name:" + lang]);
        newStyle.layers.splice(layer.placement + index + 1, 0, layer.data);
    });
    return newStyle;
};
var addLayerFilter = function (layer, filter) {
    if (!layer.filter) {
        layer.filter = filter;
    }
    else if (layer.filter[0] === 'all') {
        layer.filter.push(filter);
    }
    else {
        layer.filter = [
            'all',
            layer.filter,
            filter
        ];
    }
};

var createMarker = function (coords) {
    var marker = new mapboxgl.Marker({
        element: setMarkerStyle(),
        anchor: 'bottom',
        offset: [0, 12] // translate cause shadow in image
    }).setLngLat(coords);
    return marker;
};
var setMarkerStyle = function () {
    var el = document.createElement('div');
    el.className = 'lmc-maps__marker';
    return el;
};

var LmcMaps = /** @class */ (function () {
    function LmcMaps(options) {
        this.container = options.container;
        this.coords = options.coords || [14.4563172, 50.1028914];
        this.zoom = options.zoom || 12;
        this.style = (options.style || STYLES.DEFAULT);
        this.lang = options.lang;
        this.hasMarker = options.hasMarker;
        this.authToken = options.authToken;
        this.init();
    }
    LmcMaps.prototype.init = function () {
        var _this = this;
        this.map = new mapboxgl.Map({
            container: this.container,
            style: "" + STYLES.URL + this.style + "/style.json",
            center: this.coords,
            zoom: this.zoom,
            renderWorldCopies: false,
            pitchWithRotate: false,
            transformRequest: function (url, resourceType) {
                if (_this.authToken && url.startsWith("https://tileserver.lmc.cz") && resourceType === 'Tile') {
                    return {
                        url: url,
                        headers: {
                            'Authorization': 'Bearer ' + _this.authToken
                        }
                    };
                }
            }
        });
        this.getEvents();
        this.setControls();
        this.hasMarker && createMarker(this.coords).addTo(this.map);
    };
    LmcMaps.prototype.getEvents = function () {
        var _this = this;
        this.map.on('load', function () {
            _this.lang && _this.map.setStyle(setLanguage(_this.map.getStyle(), _this.lang), {
                diff: true
            });
        });
    };
    LmcMaps.prototype.setControls = function () {
        this.map.addControl(new mapboxgl.NavigationControl({
            showCompass: false
        }));
        this.map.addControl(new mapboxgl.ScaleControl({
            maxWidth: 80
        }));
    };
    return LmcMaps;
}());

export default LmcMaps;
