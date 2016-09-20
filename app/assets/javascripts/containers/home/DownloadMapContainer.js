import {connect} from 'react-redux';
import {setGeoms, setCountriesList, setSelectedCountry} from '../../actions/static';
import DownloadMap from '../../components/home/DownloadMap';

const mapStateToProps = state => ({
  geoms: state.staticReducer.geoms,
  countries: state.staticReducer.countries,
  selectedCountry: state.staticReducer.selectedCountry,
});

const mapDispatchToProps = dispatch => ({
  setGeoms: data => {
    dispatch(setGeoms(data));
  },
  setCountriesList: data => {
    dispatch(setCountriesList(data));
  },
  setSelectedCountry: data => {
    dispatch(setSelectedCountry(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadMap);
