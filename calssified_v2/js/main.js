 window.onload = initializer;


 function initializer(){
    (function() {

      //initialize Firebase
      const config = {
        apiKey: "AIzaSyD_Y89vstjZfhwo4k0V3ciqZZ-bY6IkygQ",
        authDomain: "bracket-1bcba.firebaseapp.com",
        databaseURL: "https://bracket-1bcba.firebaseio.com",
        projectId: "bracket-1bcba",
        storageBucket: "bracket-1bcba.appspot.com",
        messagingSenderId: "641161953628"
      };
      firebase.initializeApp(config);

      // Initialize Cloud Firestore through Firebase
      var db = firebase.firestore();

      // Disable deprecated features
      db.settings({
          timestampsInSnapshots: true
      });
    
      // get all elements
    
      const txtEmail = document.getElementById('email');
      const txtPassword = document.getElementById('password');
      const btnSignIn = document.getElementById('signIn');
      const btnSignUp = document.getElementById('signUp');
      const btnSignOut = document.getElementById('signOut');
    
      // login event
      btnSignIn.addEventListener('click', e =>{
        //get email and password 
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();

        //sign In
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message))
      });
    
      //sign out
      btnSignOut.addEventListener('click', e =>{
          firebase.auth().signOut();
          window.location.replace("../login.html")
      });
    
      // Add a realTime listner
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          console.log(firebaseUser);
          console.log("logged in")

          var user = firebase.auth().currentUser;

          /*db.collection("users").doc(user.uid).get().then((snapshot) => {

          });*/
    
          

          //btnSignOut.classList.remove('hide');
        }
        else {
          console.log("not logged in");
          //btnSignOut.classList.add('hide');
        }
      });

    }());
 }
 