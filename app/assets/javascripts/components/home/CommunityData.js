'use strict';

import React from 'react';

class CommunityData extends React.Component {

  componentWillMount() {
    this.props.setCommunityData();
  }

  render() {
    const communityData = this.props.communityData;

    const usersLbl = I18n.t('javascripts.components.home.community_data.users');
    const editsLbl = I18n.t('javascripts.components.home.community_data.edits');
    const roadsLbl = I18n.t('javascripts.components.home.community_data.roads');

    if (!communityData || !Object.keys(communityData).length) return <div className="community-data" />;
    return (
      <div className="community-data">
        <div className="community-element" key="users">
          <h3 className="text text-legend -primary">{usersLbl}</h3>
          <p className="text text-numeric-m -darker">{communityData && Object.keys(communityData.users).length}</p>
        </div>
        <div className="community-element" key="edits">
          <h3 className="text text-legend -primary">{editsLbl}</h3>
          <p className="text text-numeric-m -darker">{communityData && Object.keys(communityData.times).length}</p>
        </div>
        <div className="community-element" key="roads">
          <h3 className="text text-legend -primary">{roadsLbl}</h3>
          <p className="text text-numeric-m -darker">{communityData && communityData.total.roads}</p>
        </div>
      </div>
    );
  }
}

export default CommunityData;
