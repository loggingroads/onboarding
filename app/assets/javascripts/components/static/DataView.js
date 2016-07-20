'use strict';

import React from 'react';
import Fuse from 'fuse.js';

class DataView extends React.Component {

  constructor(props) {
    super();
    this.state = {
      list: []
    };
  }

  componentWillMount() {
    /* data will specify what kind of section will be rendered */
    this.props.setElementsList(this.props.data);
  }

  componentWillReceiveProps(newProps) {
    newProps.elementsList && this.setState({ list: newProps.elementsList });
    this.list = newProps.elementsList;
    this.options = {
        caseSensitive: false,
        includeScore: false,
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        keys: ['name', 'start_date', 'htag']
      };

    this.fuse = new Fuse(this.list, this.options);
  }

  search(event) {
    const token = event.target.value;

    if (token !== '') {
      const result = this.fuse.search(token);
      this.setState({ list: result });
    } else {
      this.setState({ list: this.list });
    }
  }

  render() {
    const list = this.state.list;

    return (
      <div>
        <div className="input-group col-xs-12 wrap">
          <input type="text" className="form-control search" placeholder="Search" onChange={ (event) => this.search(event) } />
          <span className="input-group-btn">
            <img src="" className="search-icon" />
          </span>
        </div>

        <table className="c-table table">
          <thead>
            <tr>
              <th className="text text-menu -dark">Start Date</th>
              <th className="text text-menu -dark">Name</th>
              <th className="text text-menu -dark">Htag</th>
            </tr>
          </thead>
          <tbody>
            { list.map((element, i) =>
              <tr key={i} className="wrap text text-desc -dark">
                <td className="text text-desc -dark">{ element.start_date }</td>
                <td className="text text-desc -dark -bold">{ element.name }</td>
                <td className="text text-desc -dark">{ element.htag }</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

DataView.propTypes = {
  data: React.PropTypes.string
};

export default DataView;
