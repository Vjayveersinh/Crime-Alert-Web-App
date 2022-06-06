// Function for submit contact us queries
function submit() {
    let fName = document.getElementById("fName").value;
    let lName = document.getElementById("lName").value;
    let country = document.getElementById("country").value;
    let subject = document.getElementById("subject").value;
    
    // validation

    let form = { fName, lName, country, subject };
    if (!fName) {
        alert("First Name is required");
        return;
    }
    if (!lName) {
        alert("Last Name is required");
        return;
    }
    if (!subject) {
        alert("Subject is required");
        return;
    }
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/contactUsForm');
    request.send(JSON.stringify(form));
    request.onload = () => {
        if (request.status === 200) {
            document.getElementById("fName").value = '';
            document.getElementById("lName").value = '';
            document.getElementById("country").value = 'India';
            document.getElementById("subject").value = '';
            alert("Your request has been sent!");
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}