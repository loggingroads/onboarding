import React from 'react';
const BASEMAP = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.activeTiles = [];

    this.firstLayersRender = true;
  }

  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate() {
    this._drawPolygons();
  }

  initMap() {
    const mapContainer = document.getElementById('map');
    this.map = L.map(mapContainer, {
      center: [39.950490, -40],
      zoom: 3,
      scrollWheelZoom: false,
      zoomControl: false
    });
    const zoomControl = L.control.zoom({
        position: 'bottomleft'
    });
    this.map.addControl(zoomControl);
    this.basemap = L.tileLayer(BASEMAP);
    this.basemap.addTo(this.map);
  }

  _drawPolygons() {
    //Create an object to manage the layers in/out the map
    this.props.layersGroups && this.props.layersGroups.map( (group) => {
      if (group.active) {
        this._addLayers(group.layers);
      } else {
        this._removeLayers(group.layers);
      }
    });
  }

  _addLayers(layers) {
    layers.map( (layer) => {
      layer.geom.addTo(this.map);
      layer.geom.bindPopup(this._popUpFor(layer));
      this.activeTiles.push(layer.geom);
    });

    if (this.firstLayersRender) {
      this._fitBounds();
      this.firstLayersRender = false;
    }

  }

  _removeLayers(layers) {
    layers.map( (layer) => {
      this.map.removeLayer(layer.geom);

      const index = this.activeTiles.indexOf(layer.geom);
      if (index > -1 ) {
        this.activeTiles.splice(index, 1)
      }
    });
  }

  _fitBounds() {
    const group = new L.FeatureGroup(this.activeTiles);
    this.map.fitBounds(group.getBounds());
  }

  _popUpFor(layer) {
    let campaignsList = '';
    let eventsList = '';
    layer.campaigns.forEach(campaign => {
      campaignsList += '<span class="text text-legend">' + campaign.name + '<a href="/campaigns/' + campaign.id + '"><svg class="icon icon-share-circle"><use xlink:href="#icon-share-circle"></use></svg></a></span>';
    });
    layer.events.forEach(event => {
      eventsList += '<span class="text text-legend">' + event.name + '<a href="/events/' + event.id + '"><svg class="icon icon-share-circle"><use xlink:href="#icon-share-circle"></use></svg></a></span>';
    });

    return `<div class="meta">
            <span class="text text-legend">${layer.name}<a href=${layer.task_manager_url}><svg class="icon icon-share-circle -orange"><use xlink:href="#icon-share-circle"></use></svg></a></span>
            <p>${layer.description}</p>
            </div>
            <div class="link-group">
              <span class="light">This task is a part of:</span>
              ${campaignsList}
              ${eventsList}
            </div>`;
  }

  render() {
    return (
      <div className="c-map" id="map"></div>
    );
  }
}

export default Map;
