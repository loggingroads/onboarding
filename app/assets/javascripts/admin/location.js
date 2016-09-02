$(document).ready(function () {

  const loadMap = function () {
    const BASEMAP = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';

    // create a map in the "map" div, set the view to a given place and zoom
    const map = L.map('map').setView([39.950490, -98.746077], 5);

    // add an OpenStreetMap tile layer
    L.tileLayer(BASEMAP, {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.scrollWheelZoom.disable();

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const Marker = L.Icon.extend({
      options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12, 12),
        iconSize: new L.Point(24, 24),
        iconUrl: 'marker-icon.png'
      }
    });

    // Create two sets of controls to prevent multiple polygons
    const drawControlFull = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: {
          selectedPathOptions: {
            maintainColor: true,
            opacity: 0.3
          },
          shapeOptions: {
            color: '#ff5349'
          },
          allowIntersection: false,
          drawError: {
            color: 'orange',
            timeout: 1000
          },
          showArea: true,
          metric: false,
          repeatMode: false
        },
        polyline: false,
        rectangle: {
          selectedPathOptions: {
            maintainColor: true,
            opacity: 0.3
          },
          shapeOptions: {
            color: '#ff5349'
          },
          allowIntersection: false,
          drawError: {
            color: 'orange',
            timeout: 1000
          },
          showArea: true,
          metric: false,
          repeatMode: false
        },
        circle: false,
        marker: {
          icon: new Marker()
        }
      },
      edit: {
        featureGroup: drawnItems
      }
    });

    const drawControlEditOnly = new L.Control.Draw({
      position: 'topright',
      draw: false,
      edit: {
        featureGroup: drawnItems
      }
    });

    // Load GeoJSON from form if exists and set controls
    const initLocation = $('#location_map').val();

    if ( initLocation.length > 0 ) {
      const initLocationParsed = JSON.parse(initLocation);
      if (initLocationParsed.geometry.type === "Marker") {
        marker = L.marker(initLocationParsed.geometry.coordinates);
        drawnItems.addLayer(marker);
      } else {
        const geoJsonLayer = L.geoJson(initLocationParsed);
        geoJsonLayer.setStyle({color: '#ff5349'});
        map.setView(geoJsonLayer.getBounds().getCenter());
        map.fitBounds(geoJsonLayer.getBounds());
        geoJsonLayer.eachLayer(function (layer) {
          drawnItems.addLayer(layer);
        });
      }
      map.addControl(drawControlEditOnly);
    } else {
      map.addControl(drawControlFull);
    }

    // On initial draw save to form
    map.on('draw:created', function (e) {
    const type = e.layerType,
      layer = e.layer;

      drawControlFull.removeFrom(map);
      drawControlEditOnly.addTo(map)

      if (type === 'marker') {
        const markerLat = layer._latlng.lat;
        const markerLng = layer._latlng.lng;
        const shape = {
          "type":"Feature",
          "properties":{},
          "geometry":{
            "type":"Marker",
            "coordinates":[markerLat, markerLng]
          }
        };
        $('#location_map').val(JSON.stringify(shape));
      } else {
        const shape = layer.toGeoJSON();
        $('#location_map').val(JSON.stringify(shape));
      }

      drawnItems.addLayer(layer);
    });

    // On Editing Completion update layer and form
    map.on('draw:edited', function (e) {
      const layers = e.layers;

      layers.eachLayer(function (layer) {
        if (layer instanceof L.Marker){
          const markerLat = layer._latlng.lat;
          const markerLng = layer._latlng.lng;
          const shape = {
            "geometry": {
              "type": "Marker",
              "coordinates": [ markerLat, markerLng ]
            }
          };
          $('#location_map').val(JSON.stringify(shape));
        } else {
          const shape = layer.toGeoJSON()
          $('#location_map').val(JSON.stringify(shape));
        }
      });
    });

    // On delete polygon, reset draw controls and clear form
    map.on("draw:deleted", function (e) {
      if (drawnItems.getLayers().length === 0) {
        drawControlEditOnly.removeFrom(map);
        drawControlFull.addTo(map);
        $('#location_map').val('');
      }
    });
  };

  if ($('#map').length) {
    loadMap();
  }

  $(function () {
    $('.chzn-select').chosen();
  });

  $(document).ready(function () {
    $('.datepicker').datepicker({
      format: 'yyyy-mm-dd'
    });
  });
});
