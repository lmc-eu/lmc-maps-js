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

var LmcMaps =
/*#__PURE__*/
function () {
  function LmcMaps(container, coords, zoom) {
    _classCallCheck(this, LmcMaps);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "map", void 0);

    _defineProperty(this, "coords", []);

    _defineProperty(this, "zoom", 0);

    this.container = container;
    this.coords = coords;
    this.zoom = zoom;
    this.init();
  }

  _createClass(LmcMaps, [{
    key: "init",
    value: function init() {
      this.map = new mapboxgl.Map({
        container: this.container,
        style: 'http://gis-tileserver-common-stable.service.dev1-services.consul:26452/styles/klokantech-basic/style.json',
        minZoom: 6,
        center: this.coords,
        zoom: this.zoom,
        renderWorldCopies: false,
        pitchWithRotate: false
      });
      this.setControls();
      this.renderMarker(this.coords);
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
  }]);

  return LmcMaps;
}();

module.exports = LmcMaps;
