/**
 * Created by harrisonmiller on 10/3/17.
 */
const defaultState = {
  currentUserId: ""
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        currentUserId: action.currentUserId,
        currentUserEmail: action.currentUserEmail
      });
    case 'LOGOUT':
      return Object.assign({}, state, {
        currentUserId: "",
        currentUserEmail: ""
      });
    default:
      return state;
  }
}