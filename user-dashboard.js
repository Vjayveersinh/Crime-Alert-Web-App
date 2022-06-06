let locationType = 1;
let userId = '';

// For get user
function getUser() {
    if (localStorage.getItem('user')) {
        let user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('userName').innerText = user.fName + ' ' + user.lName;
        document.getElementById('userEmail').innerText = user.email;
        userId = user.id;
    }
}

getUser();

// Function for Notification

function setNotifications() {
    if (localStorage.getItem('user')) {
        let user = JSON.parse(localStorage.getItem('user'));
        let notifications = document.getElementById('notifications');

        notifications.innerHTML = '';
        if (user.notifications && user.notifications.length > 0) {
            user.notifications.reverse();
            for (let i = 0; i < user.notifications.length; i++) {
                let notification = user.notifications[i];
                let notificationDiv = document.createElement('li');
                notificationDiv.className = 'notification';
                notificationDiv.innerHTML = `<p>${notification.message}</p>`;
                notifications.appendChild(notificationDiv);
            }
        } else {
            document.getElementById('notifications').classList.add('display-none');
            document.getElementById('noUserNotifications').classList.remove('display-none');
        }
    }
}
setNotifications();

// Function for send notification to all users
function getAllUserNotifications() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/getAllUserNotifications');
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let notificationsDiv = document.getElementById('globalNotifications');
            let notifications = JSON.parse(request.responseText).allNotifications;
            if (notifications && notifications.length > 0) {
                notifications.reverse();
                for (let i = 0; i < notifications.length; i++) {
                    let notification = notifications[i];
                    let notificationDiv = document.createElement('li');
                    notificationDiv.className = 'notification';
                    notificationDiv.innerHTML = `<p>${notification.message}</p>`;
                    notificationsDiv.appendChild(notificationDiv);
                }
            } else {
                document.getElementById('globalNotifications').classList.add('display-none');
                document.getElementById('noGlobalNotifications').classList.remove('display-none');
            }
            // setNotifications();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}
getAllUserNotifications();

//Function for insert SOS number
function setSosNumber() {
    if (localStorage.getItem('user')) {
        let user = JSON.parse(localStorage.getItem('user'));
        let sos = document.getElementById('sosList');

        sos.innerHTML = '';
        if (user.sosNumbers) {
            user.sosNumbers.forEach((number, index) => {
                if (number.name) {
                    let mainDiv = document.createElement('div');
                    mainDiv.style.marginTop = '10px';
                    let profileDiv = document.createElement('div');
                    profileDiv.style.display = 'inline-block';
                    let nameDiv = document.createElement('div');
                    nameDiv.style.fontWeight = 'bold';
                    nameDiv.innerText = number.name;
                    let numberDiv = document.createElement('div');
                    numberDiv.innerText = number.number;

                    let deleteButton = document.createElement('div');
                    deleteButton.style.display = 'inline-block';
                    deleteButton.style.float = 'right';
                    let button = document.createElement('button');
                    button.classList.add('button-blue');
                    button.style.marginTop = '5px';
                    button.innerText = 'Delete';
                    button.onclick = () => {
                        deleteSosNumber(index);
                    }
                    deleteButton.appendChild(button);

                    profileDiv.appendChild(nameDiv);
                    profileDiv.appendChild(numberDiv);
                    mainDiv.appendChild(profileDiv);
                    mainDiv.appendChild(deleteButton);
                    sos.appendChild(mainDiv);
                }
            });
        }
    }
}

setSosNumber();

//For report post
function apply() {
    if (locationType === 1) {
        if (!document.getElementById("location").value) {
            alert("Please enter location");
            return;
        }

        locationType = 2;
        document.getElementById("location-title").classList.add('display-none');
        document.getElementById("location-details").classList.remove('display-none');
        document.getElementById("selectedLocation").innerText = document.getElementById("location").value;
    } else if (locationType === 2) {
        if (!document.getElementById("typeOfCrime").value) {
            alert("Please select type of crime.");
            return;
        }

        if (!document.getElementById("date").value) {
            alert("Please select date.");
            return;
        }

        if (!document.getElementById("description").value) {
            alert("Please enter description.");
            return;
        }

        let location = document.getElementById("location").value;
        let typeOfCrime = document.getElementById("typeOfCrime").value;
        typeOfCrime === '1' ? typeOfCrime = 'Theft' : typeOfCrime === '2' ? typeOfCrime = 'Homicide' : typeOfCrime === '3' ? typeOfCrime = 'Domestic Violence' : typeOfCrime === '4' ? typeOfCrime = 'Traffic Offense' : typeOfCrime === '5' ? typeOfCrime = 'Cyber Crime' : typeOfCrime = 'Other';
        let date = document.getElementById("date").value;
        let description = document.getElementById("description").value;
        let userName = '';
        let userId = '';
        let time = new Date();
    
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            userId = user.id;
            userName = user.fName + ' ' + user.lName;
        }
    
        let request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:3000/addCrime');
        request.send(JSON.stringify({ location, typeOfCrime, date, description, userId, userName, time, status: 'pending', stage: 'Active', updatedAt: time }));
        request.onload = () => {
            if (request.status === 200) {
                let response = JSON.parse(request.responseText);
                let user = JSON.parse(localStorage.getItem('user'));
                user.notifications = response;
                localStorage.setItem('user', JSON.stringify(user));
                setNotifications();

                locationType = 3;
                document.getElementById("buttonText").innerText = 'Ok';
                document.getElementById("modalForm").classList.add('display-none');
                document.getElementById("alert").classList.remove('display-none');
            } else {
                console.log(`Error ${request.status} ${request.statusText}`);
                alert("Something went wrong");
            }
        }
    } else {
        locationType = 1;
        document.getElementById("closeButton").click();
    }
}

//Function for logout
function logout() {
    window.localStorage.removeItem('user');
    window.location.href = "home-main.html";
}

//Function for add sos 

function addSosNumber() {
    document.getElementById('sosList').classList.add('display-none');
    document.getElementById('addSosButton').classList.add('display-none2');
    document.getElementById('sosForm').classList.remove('display-none');
}

//Function for cancel sos
function cancelSosForm() {
    document.getElementById('sosList').classList.remove('display-none');
    document.getElementById('addSosButton').classList.remove('display-none2');
    document.getElementById('sosForm').classList.add('display-none');
}

//Function for save sos
function saveSosNumber() {
    let name = document.getElementById('sosName').value;
    let number = document.getElementById('sosNumber').value;

    let request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:3000/saveSosNumber');
        request.send(JSON.stringify({ name, number, id: userId }));
        request.onload = () => {
            if (request.status === 200) {
                let user = JSON.parse(localStorage.getItem('user'));
                user.sosNumbers.push({ name, number });
                localStorage.setItem('user', JSON.stringify(user));
                setSosNumber();
                cancelSosForm();
            } else {
                console.log(`Error ${request.status} ${request.statusText}`);
                alert("Something went wrong");
            }
        }
}

//function for delete sos

function deleteSosNumber(id) {
    let user = JSON.parse(localStorage.getItem('user'));
    let sosNumbers = user.sosNumbers;
    sosNumbers.splice(id, 1);

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/updateSosNumbers');
    request.send(JSON.stringify({ sosNumbers, id: user.id }));
    request.onload = () => {
        if (request.status === 200) {
            let user = JSON.parse(localStorage.getItem('user'));
            user.sosNumbers = sosNumbers;
            localStorage.setItem('user', JSON.stringify(user));
            setSosNumber();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

//For update profile
let updateUserId = '';
function updateUser() {
    let element = localStorage.getItem('user');
    if (element) {
        element = JSON.parse(element);
        updateUserId = element.id;
        document.getElementById('uFName').value = element.fName;
        document.getElementById('uLName').value = element.lName;
        document.getElementById('uGender').value = element.gender;
        document.getElementById('uEmail').value = element.email;
        document.getElementById('uCity').value = element.city;
        document.getElementById('uProvince').value = element.province;
        document.getElementById('uCountry').value = element.country;
        document.getElementById('uPostalCode').value = element.postalCode;
    }
}
//for save profile of user

function saveUser() {
    let fName = document.getElementById('uFName').value;
    let lName = document.getElementById('uLName').value;
    let gender = document.getElementById('uGender').value;
    let email = document.getElementById('uEmail').value;
    let city = document.getElementById('uCity').value;
    let province = document.getElementById('uProvince').value;
    let country = document.getElementById('uCountry').value;
    let postalCode = document.getElementById('uPostalCode').value;

    //Email expression

    let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email address");
        return;
    }

    //validation
    if (!fName || !lName || !gender || !email || !city || !province || !country || !postalCode) {
        alert('Please fill in all the fields');
        return;
    }

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/updateUser');
    request.send(JSON.stringify({ fName, lName, gender, email, city, province, country, postalCode, id: updateUserId }));
    request.onload = () => {
        if (request.status === 200) {
            updateUserId = '';

            let user = localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                user.fName = fName;
                user.lName = lName;
                user.gender = gender;
                user.email = email;
                user.city = city;
                user.province = province;
                user.country = country;
                user.postalCode = postalCode;

                localStorage.setItem('user', JSON.stringify(user));
                document.getElementById('userModalCloseButton').click();
                getUser();
            }

        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}