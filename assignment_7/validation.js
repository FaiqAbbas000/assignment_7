document.addEventListener("DOMContentLoaded", function () {
    var signupForm_1 = document.getElementById("signupForm");
    var name = document.getElementById("name");
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");
    var nameError = document.getElementById("nameError");
    var userNameError = document.getElementById("userNameError");
    var passwordError = document.getElementById("passwordError");
    var confirmPasswordError = document.getElementById("confirmPasswordError");


    signupForm_1.addEventListener("submit", function (event) {
        event.preventDefault();

        var uName = name.value;
        var usernameinput = usernameInput.value;
        var passwordinput = passwordInput.value;
        var confirmpassword = confirmPassword.value;

        database = JSON.parse(localStorage.getItem("database")) || [];
        var nweUser = { Name: uName, User_Name: usernameinput, Password: passwordinput };
        if (uName === "") {
            nameError.innerHTML = "Please enter your name";
            return false;
        }
        else {
            nameError.innerHTML = "";
        }
        if (usernameinput === "") {
            userNameError.innerHTML = "Please enter your username";
            return false;
        }
        else {
            userNameError.innerHTML = "";
        }
        if (passwordinput === "") {
            passwordError.innerHTML = "Please enter your password";
            return false;
        }
        else {
            passwordError.innerHTML = "";
        }
        if (confirmpassword === "") {
            confirmPasswordError.innerHTML = "Please confirm your password";
            return false;
        }
        else {
            confirmPasswordError.innerHTML = "";
        }
        if (passwordinput !== confirmpassword) {
            confirmPasswordError.innerHTML = "Passwords do not match";
            return false;
        }
        else {
            confirmPasswordError.innerHTML = "";
        }
        if (database.find(function (user) {
            return user.User_Name === usernameinput;
        })) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username already exists!',
            });
            // alert("Username already exists");
            return false;
        }
        else {
            database.push(nweUser);
            localStorage.setItem("database", JSON.stringify(database));
            name.value = "";
            usernameInput.value = "";
            passwordInput.value = "";
            confirmPassword.value = "";

            Swal.fire({
                icon: 'success',
                title: '):',
                text: 'User created successfully',
            });
            return true;
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("loginForm");
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var userNameError = document.getElementById("userNameError");
    var passwordError = document.getElementById("passwordError");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var usernameinput = usernameInput.value;
        var passwordinput = passwordInput.value;

        var database = JSON.parse(localStorage.getItem("database")) || [];
        var user = database.find(function (user) {
            return user.User_Name === usernameinput;
        });
        localStorage.setItem("currentUser", JSON.stringify(user));
        if (usernameinput === "") {
            userNameError.innerHTML = "Please enter your username";
            return false;
        }
        if (passwordinput === "") {
            passwordError.innerHTML = "Please enter your password";
            return false;
        }

        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User does not exist!',
            });
            usernameInput.value = "";
            passwordInput.value = "";
            return false;
        }

        if (user.Password !== passwordinput) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password is incorrect!',
                
            });
            passwordInput.value = "";
            return false;
        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Login successfully',
                
            });
            location.replace("dashboard.html");
            usernameInput.value = "";
            passwordInput.value = "";
            return true;
        }
    });
})


document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById("header").value;
    result =  JSON.parse(localStorage.getItem("currentUser"));
    header.innerHTML = "Welcome " + result.Name;
    console.log(result.Name);
});






