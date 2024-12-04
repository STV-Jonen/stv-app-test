import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyB0S6kityP5K4eCaSaCx1WroldWR3Rrt5w',
  authDomain: 'stv-app-test.firebaseapp.com',
  projectId: 'stv-app-test',
  storageBucket: 'stv-app-test.firebasestorage.app',
  messagingSenderId: '419057809607',
  appId: '1:419057809607:web:abb266c14b271c0892a6e2',
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
