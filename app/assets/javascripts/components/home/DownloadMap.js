'use strict';

import React from 'react';
import GeoJsonMap from './../GeoJsonMap';
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
  }

  render() {
    const labelTxt = I18n.t('views.home.index._download.input_text');
    const shapeUrl = I18n.t('views.home.index._download.button_1');
    const geoJsonUrl = I18n.t('views.home.index._download.button_2');
    return (
      <div>
        <GeoJsonMap
          countries= {this.props.countries}
          geoms= {this.props.geoms}
          selectedCountry= {this.props.selectedCountry}
          setSelectedCountry= {this.props.setSelectedCountry}
        />
        <div className="download-selectors">
          <label className="label" for="">{labelTxt}</label>
          <div className="content">
            <div className="selector">
              <SearchBox
                countries= {this.props.countries}
                selectedCountry= {this.props.selectedCountry}
                setSelectedCountry= {this.props.setSelectedCountry}
              />
            </div>
            <div className="actions">
              <a href={this.props.selectedCountry && this.props.selectedCountry.shp_url} className={ `${!this.props.selectedCountry && 'is-disabled'} bttn bttn-secondary`}>{shapeUrl}</a>
              <a href={this.props.selectedCountry && this.props.selectedCountry.geojson_url} className={`${!this.props.selectedCountry && 'is-disabled'} bttn bttn-secondary`}>{geoJsonUrl}</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DownloadMap;
