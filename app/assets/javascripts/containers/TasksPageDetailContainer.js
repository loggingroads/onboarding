import { connect } from 'react-redux';
import { setTasksList } from '../actions/tasksActions';
import TasksPageDetailView from '../components/pages/TasksPageDetailView';

const mapStateToProps = (state) => {
  return {
    tasksList: state.tasksReducer.tasksList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTasksList: () => dispatch(setTasksList())
  };
}

const TasksDetailViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksPageDetailView);

export default TasksDetailViewContainer;
