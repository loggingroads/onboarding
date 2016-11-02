import { connect } from 'react-redux';
import { setEventDetail } from '../actions/eventsActions';
import EventsDetailPageView from '../components/pages/EventsDetailPageView';

const mapStateToProps = (state) => {
  return {
    eventDetail: state.eventsReducer.eventDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEventDetail: (id) => dispatch(setEventDetail(id)),
  };
}

const EventsDetailPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsDetailPageView);

export default EventsDetailPageContainer;
