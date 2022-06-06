function checkUser() {
    let user = localStorage.getItem('user');
    if (user) {
        window.location.href = "user-dashboard.html";
    }
}
checkUser();

// Function for user login
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // validation

    if (!email) {
        alert("Email is required");
        return;
    }

    if (!password) {
        alert("Password is required");
        return;
    }

    let login = { email, password, type: 'user' };

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/login');
    request.send(JSON.stringify(login));
    request.onload = () => {
        if (request.status === 200) {
            let response = JSON.parse(request.response);
            // blocked user
            if (response.block) {
                alert("Your account has been blocked. Please contact admin");;
                return;
            } else {
                // valid user
                localStorage.setItem('user', JSON.stringify(response));
                window.location.href = "user-dashboard.html";
            }
        } else if (request.status === 400) {
            alert("Username or password is incorrect");
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}