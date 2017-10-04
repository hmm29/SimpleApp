/**
 * Created by harrisonmiller on 10/3/17.
 */
export const login = (currentUserId, currentUserEmail) => {
  return {
    type: 'LOGIN',
    currentUserId,
    currentUserEmail
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};