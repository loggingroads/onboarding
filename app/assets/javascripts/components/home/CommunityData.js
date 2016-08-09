'use strict';

import React from 'react';

class CommunityData extends React.Component {

  componentWillMount() {
    this.props.setCommunityData(this.props.data);
  }

  render() {
    const title = this.props.communityData && this.props.communityData.title;
    const quantity = this.props.communityData && this.props.communityData.quantity;
    const precemtage = this.props.communityData && this.props.communityData.percentage && '%';

    return (
      <div className="community-element">
        <h3 className="text text-legend -primary">{title}</h3>
        <p className="text text-numeric-m -darker">{quantity}%</p>
      </div>
    );
  }
}

export default CommunityData;
