// Firebase config key by which we will access our firebase database
const firebaseConfig = {
  apiKey: "AIzaSyCG7l8aGepjaIwpsAxFyMC8rg09wgsGRfg",
  authDomain: "petmed-b39c6.firebaseapp.com",
  databaseURL: "https://petmed-b39c6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "petmed-b39c6",
  storageBucket: "petmed-b39c6.appspot.com",
  messagingSenderId: "224121657618",
  appId: "1:224121657618:web:b1c6068aa185da28a3bbcb",
  measurementId: "G-ZNT58DVBDS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

//signup function
function signUp() {
  let email = document.getElementById("floatingInput");
  let password = document.getElementById("floatingPassword");
  let if_user_is_vet = document.getElementById("vetCheckBox");

  auth.createUserWithEmailAndPassword(email.value, password.value)
    .then(function (working) {
      alert("Account created successfully"); if (if_user_is_vet.checked == true) { window.location = "vetinfo.html" } else { window.location = "vets.html"; }
    })

    .catch(function (error) {

      let errorCode = error.code;

    //Debug functions
    // console.log(error.Message);
    // alert(error.code)
    // // email.value = "";
    // // password.value = "";
    // if (if_user_is_vet.checked == true){window.location="vetinfo.html";}// If checkbox is checked then redirect to vetinfo.html
    // else {window.location="vets.html";}// If checkbox is not checked then redirect to vets.html
  });
  // if (if_user_is_vet.checked == true){window.location="vetinfo.html";}// If checkbox is checked then redirect to vetinfo.html
  // else {window.location="vets.html";}// If checkbox is not checked then redirect to vets.html
}



//signIN function
function signIn() {
  let email = document.getElementById("floatingInput");
  let password = document.getElementById("floatingPassword");
  auth.signInWithEmailAndPassword(email.value, password.value).catch(function (error) {

    // var errorCode = error.code;
    console.log(error.Message);
    alert("An error occured, please try again");
    email.value = "";
    password.value = "";
  }
  );
  auth.onAuthStateChanged(user => {
    if (user) {
      window.location = 'vets.html'; //After successful login, user will be redirected to vets.html
    }
  });
}


//signOut

function signOut() {
  auth.signOut();
  alert("Signed out successfully");
}

//active user to homepage
firebase.auth().onAuthStateChanged((user) => {


  if (user) {

    let email = user.email;
    // console.log("outside redired")
    if (location.href.split("/").slice(-1) == "signin.html" || location.href.split("/").slice(-1) == "signup.html") {
      // console.log(window.location.href)
      // console.log("redirect")
      window.location = 'vets.html';
      alert("Signed in with: " + email);
    }

  } else {
    console.log("No Active User");
  }
})

