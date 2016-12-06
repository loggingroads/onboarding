import {connect} from 'react-redux';
import {setCommunityData} from '../../actions/static';
import CommunityData from '../../components/home/CommunityData';

const mapStateToProps = state => ({
  communityData: state.staticReducer.communityData
});

const mapDispatchToProps = dispatch => ({
  setCommunityData: () => {
    dispatch(setCommunityData());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityData);
