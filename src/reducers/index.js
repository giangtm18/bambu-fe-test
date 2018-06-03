import {combineReducers} from 'redux';
import update from 'immutability-helper';
import * as ActionTypes from '../actionTypes/actions';

const initialState = {
  PeopleData: [],
  loading: true
}

export const Data = (state = initialState, action) => {
  if (action.type === ActionTypes.FETCH_PEOPLE) {
      return update(state, {
        PeopleData: {
          $set: action.payload.data.results.sort(function (a, b) {
          return a.url - b.url})
        },
        next: {
          $set: action.payload.data.next
        },
        previous: {
          $set: action.payload.data.previous
        },
        loading: {
          $set: action.payload.loading
        }
      })
    }
    else
      return state;
  };

const rootReducer = combineReducers({data: Data});
export default rootReducer;
