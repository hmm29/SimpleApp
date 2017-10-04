/**
 * Created by harrisonmiller on 10/3/17.
 */
const defaultState = {
    pickupDistanceTimeInMinutes: 5,
    lowestPassengerRatingAllowed: 5,
    alwaysActiveApp: 'Lyft',
    secondaryAppOnlineCondition: 'Always'
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_PREFERENCE':
      return Object.assign({}, state, action.preference);
    default:
      return state;
  }
}