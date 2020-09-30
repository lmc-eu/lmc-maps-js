'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mapboxgl = _interopDefault(require('mapbox-gl'));

var STYLES = {
    DEFAULT: 'lmc-default'
};
var EVENTS = {
    CLICK: {
        POINTER_BBOX: 10
    }
};
var FEATURE_LAYERS = {
    POI: {
        BUS_STOPS: 'label_poi-bus',
        SUBWAY_STATIONS: 'label_poi-subway',
        TRAM_STOPS: 'label_poi-tram-stop',
        RAILWAY_STATIONS: 'label_poi-railway-station'
    }
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
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
var setLanguage = function (style, lang) {
    var newStyle = __assign({}, style);
    var labelFallbackLayers = [];
    newStyle.layers.forEach(function (layer, index) {
        var symbolLayerLayout = layer.layout;
        if (layer.id.indexOf('label') !== -1 && symbolLayerLayout['text-field']) {
            labelFallbackLayers.push({
                placement: index,
                data: JSON.parse(JSON.stringify(layer))
            });
            addLayerFilter(layer, ['has', "name:" + lang]);
            symbolLayerLayout['text-field'] = "{name:" + lang + "}";
        }
    });
    labelFallbackLayers.forEach(function (layer, index) {
        layer.data.id += '-langFallback';
        addLayerFilter(layer.data, ['!has', "name:" + lang]);
        newStyle.layers.splice(layer.placement + index + 1, 0, layer.data);
    });
    return newStyle;
};

var setMarkerStyle = function () {
    var el = document.createElement('div');
    el.className = 'lmc-maps__marker';
    return el;
};
var createMarker = function (coords) {
    var marker = new mapboxgl.Marker({
        element: setMarkerStyle(),
        anchor: 'bottom',
        offset: [0, 12] // translate cause shadow in image
    }).setLngLat(coords);
    return marker;
};

var createPopup = function (feature) {
    if (feature.geometry.type !== 'Point') {
        return null;
    }
    var _a = feature.geometry.coordinates, lon = _a[0], lat = _a[1];
    var popup = new mapboxgl.Popup({
        offset: [0, -12],
        closeButton: false,
        className: 'lmc-maps__popup'
    })
        .setLngLat({ lon: lon, lat: lat })
        .setHTML("<div>" + feature.properties.name + "</div>");
    return popup;
};

var LmcMaps = /** @class */ (function () {
    function LmcMaps(options) {
        this.container = options.container;
        this.coords = options.coords;
        this.center = options.center;
        this.zoom = options.zoom;
        this.style = options.style || STYLES.DEFAULT;
        this.lang = options.lang;
        this.hasMarker = options.hasMarker;
        this.hasInteractivePois = options.hasInteractivePois;
        this.authToken = options.authToken;
        this.publicUrl = options.publicUrl || "https://tileserver.lmc.cz";
        this.init();
    }
    LmcMaps.prototype.init = function () {
        var _this = this;
        this.map = new mapboxgl.Map({
            container: this.container,
            style: this.publicUrl + "/styles/" + this.style + "/style.json",
            center: this.center || [14.4563172, 50.1028914],
            zoom: this.zoom || 12,
            renderWorldCopies: false,
            pitchWithRotate: false,
            transformRequest: function (url, resourceType) { return ({
                url: url,
                headers: (_this.authToken && url.startsWith(_this.publicUrl) && resourceType === 'Tile')
                    ? { Authorization: "Bearer " + _this.authToken }
                    : {}
            }); }
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
    };
    LmcMaps.prototype.getEvents = function () {
        var _this = this;
        this.map.on('load', function () {
            _this.lang && _this.map.setStyle(setLanguage(_this.map.getStyle(), _this.lang), {
                diff: true
            });
        });
    };
    LmcMaps.prototype.enableFeatureClick = function (layers) {
        var _this = this;
        layers.forEach(function (layer) {
            _this.map.on('mouseenter', layer, function () {
                _this.map.getCanvas().style.cursor = 'pointer';
            });
            _this.map.on('mouseleave', layer, function () {
                _this.map.getCanvas().style.cursor = '';
            });
        });
        this.map.on('click', function (e) {
            var point = [
                [e.point.x - EVENTS.CLICK.POINTER_BBOX, e.point.y - EVENTS.CLICK.POINTER_BBOX],
                [e.point.x + EVENTS.CLICK.POINTER_BBOX, e.point.y + EVENTS.CLICK.POINTER_BBOX]
            ];
            var features = _this.getPointFeatures(point, layers);
            features.forEach(function (feature) {
                var _a;
                (_a = createPopup(feature)) === null || _a === void 0 ? void 0 : _a.addTo(_this.map);
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
    LmcMaps.prototype.getPointFeatures = function (point, layers) {
        return this.map.queryRenderedFeatures(point, {
            layers: layers
        }).filter(function (feature) { return feature.geometry.type === 'Point'; });
    };
    LmcMaps.prototype.computeMapPoints = function () {
        var _this = this;
        this.bounds = new mapboxgl.LngLatBounds();
        this.coords.forEach(function (coord) {
            if (_this.hasMarker) {
                createMarker(coord).addTo(_this.map);
            }
            var convertedCoord = mapboxgl.LngLat.convert(coord);
            _this.bounds.extend(new mapboxgl.LngLat(convertedCoord.lng, convertedCoord.lat));
        });
        !this.center && this.map.fitBounds(this.bounds, {
            maxZoom: this.zoom || 12,
            padding: 70,
            duration: 0
        });
    };
    return LmcMaps;
}());

module.exports = LmcMaps;
