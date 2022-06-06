function checkUser() {
    let user = localStorage.getItem('admin');
    if (user) {
        window.location.href = "admin-dashboard.html";
    }
}
checkUser();

// Function for login
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Validation

    if (!email) {
        alert("Email is required");
        return;
    }

    if (!password) {
        alert("Password is required");
        return;
    }

    let login = { email, password, type: 'Admin' };

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/login');
    request.send(JSON.stringify(login));
    request.onload = () => {
        if (request.status === 200) {
            let response = JSON.parse(request.responseText);
            if(response.userType === 'Admin') {
                localStorage.setItem('admin', JSON.stringify(response));
                window.location.href = "admin-dashboard.html";
            } else {
                alert("You are not an admin");
            }
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}