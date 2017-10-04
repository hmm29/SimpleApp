/**
 * Created by harrisonmiller on 10/3/17.
 */
const firebaseApp = require('./index.js');

export const getCurrentUser = (accessToken, callback) => {
  const ref = firebaseApp.database('users').ref();
  ref.on('value', (snap) => {
  
  });
}

export const login = (accessToken) => {
  const ref = firebaseApp.database('users').ref();
  
  
}