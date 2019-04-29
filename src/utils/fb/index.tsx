import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import prodConfig from './prod'
import devConfig from './dev'

let config = prodConfig
if ( process.env.REACT_APP_SECRET_CODE === 'dev' ) config = devConfig

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase
export const store = firebase.firestore()
export const auth = firebase.auth
