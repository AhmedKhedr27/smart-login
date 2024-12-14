let signUpName = document.getElementById('regName');
let signUpEmail = document.getElementById('regEmail');
let signUpPassword = document.getElementById('regPassword');
let logInEmail = document.getElementById('logInEmail');
let logInPassword = document.getElementById('logInPassword');
let nameReg = /\b([A-Z][-,a-z. ']+[ ]*)+/;
let emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


let signUpArray = []
if (localStorage.getItem('users') !== null) {
    signUpArray = JSON.parse(localStorage.getItem('users'))

} 

function isEmpty() {

    if (signUpName.value == '' || signUpEmail.value == '' || signUpPassword.value == '') {
        return false;
    } else {
        return true;
    }
}

function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
            return false;
        }
    }
}

function isLoginEmpty() {

    if (logInPassword.value == "" || logInEmail.value == "") {
        return false
    } else {
        return true
    }
}

function signUp() {
    let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (isEmpty() == false) {
        document.getElementById('fail').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false;
    }
     if (isEmailExist() == false) {
        document.getElementById('fail').innerHTML = '<span class="text-danger m-3">email already exists</span>';
        return false;

    }
    if(nameReg.test(signUpName.value) == false){
         document.getElementById('fail').innerHTML = '<span class="text-danger m-3">Please insert a valid name</span>';
        return false;
    }
    if(emailReg.test(signUpEmail.value) == false){
         document.getElementById('fail').innerHTML = '<span class="text-danger m-3">Please insert a valid Email</span>';
        return false;
    }
    if(passwordReg.test(signUpPassword.value) == false){
         document.getElementById('fail').innerHTML = '<div class="text-danger text-start m-3">Password must <ul> <li> contains at least 8 digits </li> <li> contains numbers, letters and special characters </li> <li> start with capital letter </li></div>';
         console.log(signUpPassword.value);
         return false;
    }
    
        var signUp = {
            name: signUpName.value,
            email: signUpEmail.value,
            password: signUpPassword.value,
        }
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('fail').innerHTML = '<span class="text-success m-3">Success</span>'
        return true

    


}

function logIn() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
   
   
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == logInEmail.value.toLowerCase() && signUpArray[i].password.toLowerCase() == logInPassword.value.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
            window.open("welcome.html" , "_self");
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}
let userName = localStorage.getItem('sessionUsername')
if (userName) {
    document.getElementById('welcome').innerHTML = "Welcome " + userName
}

function logOut() {
    localStorage.removeItem('sessionUsername');
    window.open("index.html" , "_self");

}
