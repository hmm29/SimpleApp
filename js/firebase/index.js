/**
 * Created by harrisonmiller on 10/3/17.
 */
/*
 * define Firebase
 */

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBHABlwpkj9CID3flsVXPE_bv1geR3l9cg",
  authDomain: "simpleapp-13064.firebaseapp.com",
  databaseURL: "https://simpleapp-13064.firebaseio.com",
};

const firebaseApp = firebase.initializeApp(config);

module.exports = firebaseApp;