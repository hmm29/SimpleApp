/**
 * Created by harrisonmiller on 10/3/17.
 */
import { combineReducers } from 'redux';
import auth from './auth';
import preferences from './preferences';

const rootReducer = combineReducers({
  auth, preferences
});

export default rootReducer;