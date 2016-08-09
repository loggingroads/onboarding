'use strict';

import React from 'react';
import DataTableView from './../DataTableView'

class CampaingView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: "tab1"
    };
  }

  componentDidMount() {
    /* data will specify what kind of section will be rendered */
    this.props.setEventsList();
    this.props.setTasksList();
  }

  changeTab(tab) {
    this.setState({activeTab: tab});
  }

  render() {
    const mapathonTable = (
      <DataTableView
        data={this.props.eventsList}
        columns={[
          { title: "Start / End Date", slug: "start_date" },
          { title: "Campaign Name", slug: "name" },
          { title: "Tags", slug: "htag" }
        ]}
      />
    );

    const taskTable = (
      <DataTableView
        data={this.props.tasksList}
      />
    )

    return (
      <div className="l-tabs">
        <div className="c-tabs">
          <ul className="tabs">
            <div className="wrap row">
              <div className="col-md-12">
                <li className={`tab ${this.state.activeTab === "tab1" ? "-is-active" : ""}`} onClick={this.changeTab.bind(this, "tab1")}>Mapathon</li>
                <li className={`tab ${this.state.activeTab === "tab2" ? "-is-active" : ""}`} onClick={this.changeTab.bind(this, "tab2")}>Task</li>
              </div>
            </div>
          </ul>
          <div className="tabs-content">
            <div className={`tabs-panel ${this.state.activeTab === "tab1" ? "-is-active" : ""}`}>
              {mapathonTable}
            </div>
            <div className="tabs-panel" className={`tabs-panel ${this.state.activeTab === "tab2" ? "-is-active" : ""}`}>
              {taskTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CampaingView;
