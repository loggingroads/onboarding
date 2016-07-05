import { connect } from 'react-redux';
import { setUsersActivityData } from '../../actions/static';
import UsersActivityData from '../../components/static/UsersActivityData';

const mapStateToProps = (state) => {
  return {
    usersActivityData: state.staticReducer.usersActivityData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsersActivityData: (data) => dispatch(setUsersActivityData(data))
  };
}

const UsersActivityDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersActivityData);

export default UsersActivityDataContainer;
