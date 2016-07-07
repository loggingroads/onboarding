'use strict';

import React from 'react';

class UsersActivityData extends React.Component {

  componentWillMount() {
    this.props.setUsersActivityData(this.props.data);
  }

  render() {
    const title = this.props.data && this.props.data.split('-').join(' ');
    const users = this.props.usersActivityData ? this.props.usersActivityData : [];

    return (
      <div className="users-activity-element">
        <h3 className="text text-p-title -light">{title}</h3>
        <table className="activity-table">
          <tbody>
          { users.map( (user, i) => {
            return (
              <tr key={i}>
                { title === "ranking" && <td className="rank text text-legend -light">{i+1}</td> }
                <td className="user text text-legend -light">{user.name}</td>
                <td className="road text text-legend -light">{user.roads} roads</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

UsersActivityData.propTypes = {
  usersActivityData: React.PropTypes.array
};

export default UsersActivityData;
