import * as ActionTypes from '../actionTypes/actions';
import Axios from 'axios';

export const fetchSwapiPeople = (data, loading) => {
  return {
    type: ActionTypes.FETCH_PEOPLE,
    payload: {data, loading: false}
  }
};

export function fetchPeople(url) {
  return (dispatch) => {
    return Axios.get(url)
      .then(response => {
        dispatch(fetchSwapiPeople(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
}