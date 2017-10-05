/**
 * Created by harrisonmiller on 10/3/17.
 */
export const setPreference = (preference) => {
  return {
    type: 'SET_PREFERENCE',
    preference
  };
}

export const clearPreferences = () => {
  return {
    type: 'CLEAR_PREFERENCES'
  }
}