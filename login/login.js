console.log('firebase=--->', firebase.firestore)

function login(e) {
    e.preventDefault();

    const email = document.getElementById('email').value
    const password = document.getElementById('password1').value
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(usereResponse) {
        const userId = usereResponse.user.uid
        localStorage.setItem('userId' , userId)
        alert("login successful"); 
        window.location.href = './dashbord/dashboard.html';
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage)
      });
}