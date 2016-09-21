'use strict';

import React from 'react';
import Fuse from 'fuse.js';

class SearchBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    this.setState({ selectedCountry : newProps.selectedCountry && newProps.selectedCountry.name || '' });

    this.options = {
      caseSensitive: false,
      includeScore: false,
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      keys: ['name']
    };

    this.fuse = new Fuse(newProps.countries, this.options);
  }

  search(event) {
    const token = event.target.value;

    this.setState({selectedCountry : token});

    if (token !== '') {
      const result = this.fuse.search(token);
      this.setState({ data: result });
    } else {
      this.setState({ data: this.data });
    }
  }

  setSelectedCountry(country) {
    this.props.setSelectedCountry(country);
    this.setState({data: null});
  }

  render() {

    return (
      <div className="c-search-box">
        <input type="text" className="download-input" value={this.state.selectedCountry}
          onChange={ (event) => {this.search(event)} }
        />
        <ul className="list">
          {this.state.data && this.state.data.map((country, i) => {
            return <li className="item" key={i} onClick={()=> this.setSelectedCountry(country)}>{country.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default SearchBox;
