'use strict';

import React from 'react';

class CommunityData extends React.Component {

  componentWillMount() {
    this.props.setCommunityData(this.props.communityData);
  }

  render() {
    const communityData = this.props.communityData;
 
    console.log(communityData);

    if (communityData && !Object.keys(communityData).length) return <div className="community-data" />;
    return (
      <div className="community-data">
        <div className="community-element" key="users">
          <h3 className="text text-legend -primary">users</h3>
          <p className="text text-numeric-m -darker">{communityData && communityData.users.length}</p>
        </div>
        <div className="community-element" key="edits">
          <h3 className="text text-legend -primary">edits</h3>
          <p className="text text-numeric-m -darker">{communityData && communityData.length}</p>
        </div>
        <div className="community-element" key="roads">
          <h3 className="text text-legend -primary">roads</h3>
          <p className="text text-numeric-m -darker">{communityData && communityData.times.roads}</p>
        </div>
      </div>
    );
  }
}

export default CommunityData;
