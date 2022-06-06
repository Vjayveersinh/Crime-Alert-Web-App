// Function for registration
function createAccount() {
    let fName = document.getElementById("fName").value;
    let lName = document.getElementById("lName").value;
    let gender = document.getElementById("gender").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cPassword = document.getElementById("cPassword").value;

    let city = document.getElementById("city").value;
    let province = document.getElementById("province").value;
    let country = document.getElementById("country").value;
    let postalCode = document.getElementById("cPassword").value;
    let question1 = document.getElementById("question1").value;
    let ansQue1 = document.getElementById("ansQue1").value;
    let question2 = document.getElementById("question2").value;
    let ansQue2 = document.getElementById("ansQue2").value;

    // Password Expression

    let passwordRegex = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
    //Email Expression
    let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //validation
    if (!password) {
        alert("Password is required");
        return;
    }

    if (!cPassword) {
        alert("Confirm password is required");
        return;
    }

    if (password !== cPassword) {
        alert("Password not match!");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Password must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Email is invalid");
        return;
    }

    if (!fName) {
        alert("First Name is required");
        return;
    }

    if (!lName) {
        alert("Last Name is required");
        return;
    }

    if (!gender) {
        alert("Please select your gender");
        return;
    }

    if (!email) {
        alert("Email is required");
        return;
    }

    if (!city) {
        alert("City is required");
        return;
    }

    if (!province) {
        alert("Province is required");
        return;
    }

    if (!country) {
        alert("Country is required");
        return;
    }

    if (!postalCode) {
        alert("Postal Code is required");
        return;
    }

    if (!question1) {
        alert("Question 1 is required");
        return;
    }

    if (!ansQue1) {
        alert("Answer 1 is required");
        return;
    }

    if (!question2) {
        alert("Question 2 is required");
        return;
    }

    if (!ansQue2) {
        alert("Answer 2 is required");
        return;
    }

    //user register
    let register = { fName, lName, gender, email, password, city, province, country, postalCode, question1, ansQue1, question2, ansQue2, createdAt: new Date() };
    
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/register');
    request.send(JSON.stringify(register));
    request.onload = () => {
        if (request.status === 200) {
            alert("Account created successfully");
            window.location.href = "home-main.html";
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
            window.location.href = "Home.html";
        }
    }
}

function validation(type) {
    validate(type);
}

function validationRemove(type) {
    validate(type);
}

function validate(type) {
    let input = document.getElementById(type).value;
    let err = document.getElementById(`${type}Err`);
    if (!input || (type === "gender" && input === '0') || (type === "question1" && input === '0') || (type === "question2" && input === '0')) {
        document.getElementById(type).style.border = "1px solid red";
        err.classList.remove("display-none");
    } else {
        document.getElementById(type).style.border = "1px solid #CCC";
        err.classList.add("display-none");
    }

    let passwordRegex = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
    let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (type === "email") {
        if (!emailRegex.test(input)) {
            document.getElementById(type).style.border = "1px solid red";
        } else {
            document.getElementById(type).style.border = "1px solid #CCC";
        }
    }

    if (type === "password") {
        if (!passwordRegex.test(input)) {
            document.getElementById(type).style.border = "1px solid red";
        } else {
            document.getElementById(type).style.border = "1px solid #CCC";
        }
    }
}