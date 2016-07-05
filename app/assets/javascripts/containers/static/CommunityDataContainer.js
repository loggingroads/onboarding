import { connect } from 'react-redux';
import { setCommunityData } from '../../actions/static';
import CommunityData from '../../components/static/CommunityData';

const mapStateToProps = (state) => {
  return {
    communityData: state.staticReducer.communityData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCommunityData: (data) => dispatch(setCommunityData(data))
  };
}

const CommunityDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityData);

export default CommunityDataContainer;
