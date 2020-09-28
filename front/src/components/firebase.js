
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
const firebaseConfig = {
  apiKey: "AIzaSyC2HEykNUqhKOManxjPz7sATQ__khcfhPU",
  authDomain: "facebook-74415.firebaseapp.com",
  databaseURL: "https://facebook-74415.firebaseio.com",
  projectId: "facebook-74415",
  storageBucket: "facebook-74415.appspot.com",
  messagingSenderId: "267753251418",
  appId: "1:267753251418:web:088eb5acbae78df4406e63",
  measurementId: "G-4EZNRNY1E3"
};


  class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig)
      this.auth = app.auth()
      this.db = app.firestore()
    }
  
    login(email, password) {
      return this.auth.signInWithEmailAndPassword(email, password)
    }
  
    logout() {
      return this.auth.signOut()
    }
  
    async register(firstname, lastname,email, password,birthday,gender) {
      await this.auth.createUserWithEmailAndPassword(email, password)
      return this.auth.currentUser.updateProfile({
        displayFirstname: firstname,
        displayLastname: lastname,
        displayBirthday: birthday,
        displayGender: gender
        
      })
    }
  
    
    isInitialized() {
      return new Promise(resolve => {
        this.auth.onAuthStateChanged(resolve)
      })
    }
  
    getCurrentUsername() {
      return this.auth.currentUser && this.auth.currentUser.displayName
    }
  
   
  }
  export default new Firebase()