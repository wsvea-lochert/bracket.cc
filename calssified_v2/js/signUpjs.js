window.onload = initializer;


function initializer(){
   (function() {

       //initialize Firebase and firestore
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

        // End on initialization
   
        // get all elements
        const txtUsername = document.getElementById('username');
        const txtEmail = document.getElementById('email');
        const txtPassword = document.getElementById('password');
        const btnSignUp = document.getElementById('signUp');
        const btnSignOut = document.getElementById('signOut');
        //form to get values
        const form = document.querySelector("#signupForm");

        //add signUp event on submit
   
        form.addEventListener('submit', e => {
            e.preventDefault();

            //get email and password 
            // TODO: CHECK for real email
            const email = txtEmail.value;
            const password = txtPassword.value;
            const auth = firebase.auth();
            console.log(form.firstname.value);
   
            //signs user in
            const promise = auth.createUserWithEmailAndPassword(email, password);
            promise.catch(e => console.log(e.message))
        });
   
        // Add a real time listner for change
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                
                //sucsess full account creation
                var user = firebase.auth().currentUser;
                
                    //update profile username and sets avatar to defult null
                    user.updateProfile({
                    displayName: txtUsername.value,
                    photoURL: ""
                })
                .then(function(){
                    //update successful
                })
                .catch(function(error){
                    //error with account creation
                    console.log(error);
                });
            
                db.collection("users").doc(user.uid).set({
                    firstname: form.firstname.value,
                    lastname: form.lastname.value,
                    email: form.email.value,
                    username: form.username.value
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", user.uid);
                    window.location.replace("../login.html");
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            
                console.log(firebaseUser);
                console.log("logged in");
                //btnSignOut.classList.remove('hide');
            }
            else {
                console.log("not logged in");
                //btnSignOut.classList.add('hide');
           }
        });
    }());

}
