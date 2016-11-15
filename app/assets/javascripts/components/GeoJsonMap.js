import React from 'react';
import $ from 'jquery';

class GeoJsonMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate(prev) {
    if (this.props.countries && this.props.geoms && !this.geoJson) {
      this._drawLayer();
      this.setSelectedCountry();
    }

    if (this.props.selectedCountry !== prev.selectedCountry) {
      this.setSelectedCountry();
    }
  }

  shouldComponentUpdate(props) {
    const shouldUpdate = props.countries !== this.props.countries ||
      props.geoms !== this.props.geoms ||
      props.selectedCountry !== this.props.selectedCountry;
    return shouldUpdate;
  }

  _initMap() {
    const mapContainer = document.getElementById('mapDownload');
    let geoZoom;
    if (window.innerWidth < 768) {
      geoZoom = 0;
    } else if (window.innerWidth < 1024) {
      geoZoom = 1;
    } else {
      geoZoom = 2;
    }
    var mapOptions = {
      zoom: geoZoom,
      center: [25, 0],
      scrollWheelZoom: false,
      dragging: false,
      zoomControl: false
    };

    this.map = new L.Map(mapContainer, mapOptions);
  }

  _drawLayer() {
    this._setInteractivity();
    this.geoJson = L.geoJson(this.props.geoms, {
      style: this._getStyles.bind(this),
      onEachFeature: this._setEvents.bind(this)
    }).addTo(this.map);
  }

  _setInteractivity() {
    this.props.geoms.map( (g) => {
      this.props.countries.map((c) => {
        if (c.iso === g.properties.iso_a3) {
          g.properties.interactivity = true;
          g.properties.shp_url = c.shp_url;
          g.properties.geojson_url = c.geojson_url;
        }
      });
    });
  }

  _getStyles(feature) {
    var style = {
      fillColor: this.getColor(feature.properties),
      fillOpacity: this.getOpacity(feature.properties),
      weight: 1,
      opacity: 1,
      color: '#ff5d33'
    }

    return style;
  }

  getOpacity(d) {
    return d.selected ? 1 :
           d.interactivity ? .5 :
           .2;
  }

  getColor(d) {
    return d.selected ? '#ffffff' : '#151515';
  }

  highlightFeature(e) {
    var layer = e.target;

    if (layer.feature.properties.interactivity) {
      layer.setStyle({
          fillColor: '#ffffff',
          fillOpacity: 0.2
      });

      this.map.getContainer().style.cursor = 'pointer';

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }
  }

  resetHighlight(e) {
    var layer = e.target ? e.target : e;
    this.geoJson.resetStyle(layer);
    this.map.getContainer().style.cursor = 'default';
  }

  unSelectPrevious() {
    const layers = this.geoJson;

    layers.eachLayer((layer) => {
      if (layer.feature && layer.feature.properties.selected === true) {
        layer.feature.properties.selected = false;

        layer.setStyle({
          fillColor: '#151515',
          fillOpacity: .5
        });
      }
    });
  }

  setSelectedCountry() {
    this.unSelectPrevious();

    const selectedCountryIso = this.props.selectedCountry &&
      this.props.selectedCountry.iso ? this.props.selectedCountry.iso : '';
    const layers = this.geoJson;

    layers.eachLayer((layer) => {
      if (layer.feature && layer.feature.properties.iso_a3 === selectedCountryIso) {
        layer.feature.properties.selected = true;

        layer.setStyle({
          fillColor: '#ffffff',
          fillOpacity: 1
        });
      }
    });
  }

  selectCountry(e) {
    //Select new layer
    var layer = e.target;

    if (layer.feature.properties.interactivity) {
      layer.feature.properties.selected = true;
      var name = layer.feature.properties.admin

      const country = {
        name: layer.feature.properties.admin,
        iso: layer.feature.properties.iso_a3,
        shp_url: layer.feature.properties.shp_url,
        geojson_url: layer.feature.properties.geojson_url
      }

      this.props.setSelectedCountry(country);
    }
  }

  _setEvents(feature, layer) {
    layer.on({
      mouseover: this.highlightFeature.bind(this),
      mouseout: this.resetHighlight.bind(this),
      click: this.selectCountry.bind(this)
    });
  }

  render() {
    return (
      <div id="mapDownload" className="c-home-map"></div>
    );
  }
}

export default GeoJsonMap;
