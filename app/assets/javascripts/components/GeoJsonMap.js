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
    this.props.countries && this.props.geoms !== prev.geoms && this._drawLayer()
    this.props.selectedCountry && this.setSelectedCountry();
  }

  _initMap() {
    const mapContainer = document.getElementById('mapDownload');
    var mapOptions = {
      zoom: 2,
      center: [25, 0],
      scrollWheelZoom: false,
      dragging: false,
      zoomControl: false
    };

    this.map = new L.Map(mapContainer, mapOptions);
  }

  _drawLayer() {
    this.geoJson = L.geoJson(this.props.geoms, {
      style: this._getStyles.bind(this),
      onEachFeature: this._setEvents.bind(this)
    }).addTo(this.map);

    console.log(this.map)
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
    let opacity;

    this.props.countries.map(function(c) {
      opacity = c.iso === d.iso_a3 ? .5 : .2;
    });

    return opacity;
  }

  getColor(d) {
    return d.selected ? '#2a5a3a' : '#151515';
  }

  highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        fillColor: '#ffffff',
        fillOpacity: 0.2
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  resetHighlight(e) {
    var layer = e.target ? e.target : e;
    this.geoJson.resetStyle(layer);
  }

  unSelectPrevious() {
    this.selectedLayer && (this.selectedLayer.feature.properties.selected = false);
    this.selectedLayer && this.resetHighlight(this.selectedLayer);
  }

  setSelectedCountry() {
    this.unSelectPrevious();
    const selectedCountry = this.props.selectedCountry;
    const layers = this.map._layers;

    Object.keys(layers).map((i) => {

      const layer = layers[i].options
      // console.log(layer)
    })
  }

  selectCountry(e) {
    //Unselect previous layer
    this.unSelectPrevious();

    //Select new layer
    var layer = e.target;
    console.log(layer)
    layer.feature.properties.selected = true;
    var name = layer.feature.properties.admin

    this.selectedLayer = layer;

    const country = {
      name: layer.feature.properties.admin,
      iso: layer.feature.properties.iso_a3
    }

    this.props.setSelectedCountry(country);

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
