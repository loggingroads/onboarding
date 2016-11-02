'use strict';

import React from 'react';
import Fuse from 'fuse.js';
import $ from 'jquery';

class DataTableView extends React.Component {

  constructor(props) {
    super();
    this.state = {
      data: [],
      direction: 0,
      keySorted: 'date',
      offset: 0
    };
    this.keySorted = 'date';
  }

  componentWillReceiveProps(newProps) {
    newProps.data && this.setState({ data: newProps.data });
    this.data = newProps.data;
    this.options = {
      caseSensitive: false,
      includeScore: false,
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      keys: this.props.columns.map((column) => {return column.slug})
    };

    this.fuse = new Fuse(this.data, this.options);
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

  sortIndex(a, b) {
    const keySorted = this.keySorted;

    if (a[keySorted] < b[keySorted])
      return -1;
    if (a[keySorted] > b[keySorted])
      return 1;
    return 0;
  }

  sortBy(keySorted) {
    let sortdata = this.props.data;
    this.keySorted = keySorted;
    const direction = this.state.direction < 2 ? this.state.direction + 1 : 0;

    if (direction !== 0) {
      sortdata = sortdata.sort(this.sortIndex.bind(this));
    } else {
      this.keySorted = 'create_at';
      sortdata = sortdata.sort(this.sortIndex.bind(this)).reverse();
    }

    if (direction === 2) {
      sortdata = sortdata.reverse();
    }

    this.setState({ data: sortdata, direction });
  }

  render() {
    const data = this.state.data;
    return (
      <div className="l-table">
        <div className="wrap">
          <div className="c-search col-xs-12">
            <input type="text" className="search-input" placeholder="Search" onChange={ (event) => this.search(event) } />
            <svg className="icon icon-search" >
              <use xlinkHref="#icon-search"></use>
            </svg>
          </div>
        </div>

        <table className="c-table table">
          <thead>
            <tr>
              { this.props.columns && this.props.columns.map((column, i) =>
                <th key={i} className="text text-menu -dark">{column.title}
                  <div className="sort" onClick={ () => this.sortBy(`${column.slug}`) }>
                    <svg className="icon icon-TriangleDown sort-arrow" >
                      <use xlinkHref="#icon-TriangleDown"></use>
                    </svg>
                    <svg className="icon icon-TriangleDown sort-arrow" >
                      <use xlinkHref="#icon-TriangleDown"></use>
                    </svg>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>

            { data.map((element, i) =>
              <tr key={i} className="text text-desc -dark">
                  { this.props.columns && this.props.columns.map((column, i) => {
                    const key = column.slug;
                    if (key === "name") {return <td key={i} className="text text-desc -dark -bold"><a href={`${this.props.base_url}/${element.id}`}>{element[key]}</a></td>}
                    if (key === "htag") {return <td key={i} className="text text-desc -dark"><span>{column.title}</span><button className="c-tag">{element[key]}</button></td>}
                    return (<td key={i} className="text text-desc -dark"><span>{column.title}</span>{ element[key] }</td>)
                  }
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTableView;
