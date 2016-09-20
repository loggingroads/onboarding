'use strict';

import React from 'react';
import GeoJsonMap from './../GeojsonMap';
import SearchBox from './../SearchBox';

class DownloadMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.setGeoms();
    this.props.setCountriesList();
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  render() {
    return (
      <div>
        <GeoJsonMap
          countries= {this.props.countries}
          geoms= {this.props.geoms}
          selectedCountry= {this.props.selectedCountry}
          setSelectedCountry= {this.props.setSelectedCountry}
        />
        <div className="download-selectors">
          <label for="">Search a country and select a format for the data</label>
          <SearchBox
            countries= {this.props.countries}
            selectedCountry= {this.props.selectedCountry}
            setSelectedCountry= {this.props.setSelectedCountry}
          />
          <a href={this.props.selectedCountry && this.props.selectedCountry.shp_url} className={ `${!this.props.selectedCountry && 'is-disabled'} bttn bttn-secondary`}>SHAPE_URL</a>
          <a href={this.props.selectedCountry && this.props.selectedCountry.geojson_url} className={`${!this.props.selectedCountry && 'is-disabled'} bttn bttn-secondary`}>GEOJSON_URL</a>
        </div>
      </div>
    )
  }
}

export default DownloadMap;
