import { connect } from 'react-redux';
import { setElementsList } from '../../actions/static';
import DataView from '../../components/static/DataView';

const mapStateToProps = (state) => {
  return {
    elementsList: state.staticReducer.elementsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setElementsList: (data) => dispatch(setElementsList(data))
  };
}

const DataViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataView);

export default DataViewContainer;
