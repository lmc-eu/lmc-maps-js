'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mapboxgl = _interopDefault(require('mapbox-gl'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

// STYLES
var STYLES_URL = "https://tileserver.lmc.cz/styles";
var STYLES = ['klokantech-basic', 'lmc-default'];
var LANGUAGES = ['cs', 'de', 'en', 'fi', 'pl', 'sk'];

var LmcMaps =
/*#__PURE__*/
function () {
  function LmcMaps(container, options) {
    _classCallCheck(this, LmcMaps);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "map", void 0);

    _defineProperty(this, "coords", [0, 0]);

    _defineProperty(this, "zoom", 0);

    _defineProperty(this, "style", void 0);

    _defineProperty(this, "lang", void 0);

    this.container = container;
    this.coords = options.coords;
    this.zoom = options.zoom;
    this.style = "".concat(STYLES_URL, "/").concat(STYLES.indexOf(options.style) !== -1 ? options.style : STYLES[0], "/style.json");
    this.lang = options.lang || null;
    this.init();
  }

  _createClass(LmcMaps, [{
    key: "init",
    value: function init() {
      this.map = new mapboxgl.Map({
        container: this.container,
        style: this.style,
        minZoom: 6,
        center: this.coords,
        zoom: this.zoom,
        renderWorldCopies: false,
        pitchWithRotate: false
      });
      this.getEvents();
      this.setControls();
      this.renderMarker(this.coords);
    }
  }, {
    key: "getEvents",
    value: function getEvents() {
      var _this = this;

      this.map.on('load', function () {
        LANGUAGES.indexOf(_this.lang) !== -1 && _this.setLanguage(_this.lang);
      });
    }
  }, {
    key: "setLanguage",
    value: function setLanguage(lang) {
      var _this2 = this;

      var style = JSON.parse(JSON.stringify(this.map.getStyle()));
      var nameFallbackLayers = [];
      style.layers.forEach(function (layer, index) {
        if (layer.id.indexOf('label') !== -1 && layer.layout['text-field']) {
          nameFallbackLayers.push([index, JSON.parse(JSON.stringify(layer))]);

          _this2.addLayerFilter(layer, ['has', "name:".concat(lang)]);

          layer.layout['text-field'] = "{name:".concat(lang, "}");
        }
      });
      nameFallbackLayers.forEach(function (layer, index) {
        layer[1].id = layer[1].id + '-langFallback';

        _this2.addLayerFilter(layer[1], ['!has', "name:".concat(lang)]);

        style.layers.splice(layer[0] + index + 1, 0, layer[1]);
      });
      this.map.setStyle(style, {
        diff: true
      });
    }
  }, {
    key: "setControls",
    value: function setControls() {
      this.map.addControl(new mapboxgl.NavigationControl({
        showCompass: false
      }));
      this.map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 80
      }));
    }
  }, {
    key: "renderMarker",
    value: function renderMarker(coords) {
      new mapboxgl.Marker({
        element: this.setMarkerStyle(),
        anchor: 'bottom',
        offset: [0, 12] // translate cause shadow in image

      }).setLngLat(coords).addTo(this.map);
    }
  }, {
    key: "setMarkerStyle",
    value: function setMarkerStyle() {
      var el = document.createElement('div');
      el.className = 'lmc-maps__marker';
      return el;
    }
  }, {
    key: "addLayerFilter",
    value: function addLayerFilter(layer, filter) {
      if (!layer.filter) {
        layer.filter = filter;
      } else if (layer.filter[0] === 'all') {
        layer.filter.push(filter);
      } else {
        layer.filter = ['all', layer.filter, filter];
      }
    }
  }]);

  return LmcMaps;
}();

module.exports = LmcMaps;
