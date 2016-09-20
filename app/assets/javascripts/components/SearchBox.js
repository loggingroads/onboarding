'use strict';

import React from 'react';
import Fuse from 'fuse.js';

class SearchBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillReceiveProps(newProps) {

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

    if (token !== '') {
      const result = this.fuse.search(token);
      this.setState({ data: result });
    } else {
      this.setState({ data: this.data });
    }
  }

  render() {

    return (
      <div>
        <input type="text" className="download-input" value={this.props.selectedCountry && this.props.selectedCountry.name ||'' }
          onChange={ (event) => this.search(event) }
        />
        <ul>
          {this.state.data && this.state.data.map((country, i) => {
            return <li key={i} onClick={()=> {this.props.setSelectedCountry(country)}}>{country.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default SearchBox;
