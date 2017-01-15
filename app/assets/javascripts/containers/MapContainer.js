import React from 'react';
import Map from './../components/Map';
import LayerSwitcher from './../components/LayerSwitcher';
import { connect } from 'react-redux';

const taskGroups = [
  {
    slug: 'type1',
    type: 1,
    title: I18n.t('javascripts.containers.map_container.tasking_manager'),
    color: '#ffffff',
    active: true,
    style: {
      color: '#ffffff'
    }
  },
  {
    slug: 'type2',
    type: 2,
    title: I18n.t('javascripts.containers.map_container.to_fix'),
    color: '#ff5d33',
    active: true,
    style: {
      color: '#ff5d33'
    }
  }
];

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskGroups: taskGroups
    };
  }

  componentWillReceiveProps(nextProps) {
    nextProps.tasksList && this._createLayerGroups(nextProps.tasksList);
  }

  _createLayerGroups(tasksList) {
    //Groups layers by type to be able to switch on an off by groups.
    let groups = [];

    this.state.taskGroups.map( (group) => {
      const type = group.type;

      let layersGroup = {};
      layersGroup.slug = group.slug;
      layersGroup.active = group.active;
      layersGroup.type = group.type;
      layersGroup.layers = [];

      tasksList.map( (task) => {
        if (task.task_type === type && task.location) {
          task.geom = L.geoJson(task.location, { style: group.style });
          layersGroup.layers.push(task);
        }
      });

      groups.push(layersGroup);
    });

    this.setState({ layersGroups: groups });
  }

  toggleLayerFn(info) {
    //Handle switchers
    this.state.taskGroups.map( (layer) => {
      if (layer.type === info.type) {
        layer.active = info.active;
      }
    })
    //Handle groups
    this.state.layersGroups.map( (group) => {
      if (group.type === info.type) {
        group.active = info.active;
      }
    });

    const newGroups = this.state.layersGroups;
    const newLayerList = this.state.taskGroups;
    this.setState({ layersGroups: newGroups, taskGroups: newLayerList });
  }

  render() {
    return (
      <div>
        <Map
          tiles={this.state.tilesList}
          layersGroups={this.state.layersGroups}
          tasksList={this.state.tasksList}
          campaignId={this.props.campaignId}
          eventId={this.props.eventId}
        />
        <LayerSwitcher
          taskGroups={this.state.taskGroups}
          toggleLayers={(layer) => this.toggleLayerFn(layer)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
