/**
 * Created by harrisonmiller on 10/3/17.
 */
const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_PREFERENCE':
      return Object.assign({}, state, action.preference);
    case 'CLEAR_PREFERENCES':
      return {};
    default:
      return state;
  }
}