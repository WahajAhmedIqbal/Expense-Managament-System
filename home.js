console.log('fire base -----> ' , firebase);

function signup(e) {
    e.preventDefault();   
    const fullname = document.getElementById('fullname').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password1').value
    const password2 = document.getElementById('password1').value

    console.log("fname" , fullname , 'emai' , email , 'password1' , password , 'pas' , password2);

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user)
    {
        alert("successful")
        window.location.replace('./login/login.html');
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage)
      });
}