'use strict';

import React from 'react';

class CommunityData extends React.Component {

  componentWillMount() {
    this.props.setCommunityData(this.props.communityData);
  }

  render() {
    const items = ['users', 'edits', 'roads'];
    const communityItems = this.props.communityData && items.map(
      (key, i) => {
        const data = this.props.communityData;
        return(<div className="community-element" key={i}>
          <h3 className="text text-legend -primary">{key}</h3>
          <p className="text text-numeric-m -darker">{
            data[key] % 1 !== 0 ? data[key].toFixed(2) : data[key]
          }</p>
        </div>)
      }
    )

    return (
      <div className="community-data">
        {communityItems}
      </div>
    );
  }
}

export default CommunityData;
