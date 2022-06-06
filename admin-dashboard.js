let userId = '';
let postId = '';

//function for logout
function logout() {
    window.localStorage.removeItem('admin');
    window.location.href = "home-main.html";
}

//function for users
function getAllUsers() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/getAllUsers');
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let response = JSON.parse(request.response);
            if (response?.length > 0) {
                let userTable = document.getElementById('userTable');
                let userTBody = document.getElementById('userTBody');
                if (userTBody) {
                    userTBody.innerText = '';
                } else {
                    userTBody = document.createElement('tbody');
                    userTBody.setAttribute('id', 'userTBody');
                }
                response?.forEach((element, index) => {
                    let row = document.createElement('tr');
                    let nameCell = document.createElement('td');
                    let emailCell = document.createElement('td');; 
                    let actionCell = document.createElement('td');

                    nameCell.innerHTML = element.fName + ' ' + element.lName;
                    emailCell.innerHTML = element.email;

                    let action1 = document.createElement('button');
                    action1.innerText = 'Update';
                    action1.classList.add('update');
                    action1.setAttribute('data-bs-toggle', 'modal');
                    action1.setAttribute('data-bs-target', '#userUpdateModal');
                    action1.onclick = (() => updateUser(element));
                    let action2 = document.createElement('button');

                    
                    if (!element.block) {                                       //to block suspicious user
                        action2.innerText = 'Block';
                        action2.classList.add('block');
                        action2.onclick = (() => blockUser(element.id, true));
                    } else {                                                    //to unblock user   
                        action2.innerText = 'Unblock';
                        action2.classList.add('block');
                        action2.onclick = (() => blockUser(element.id, false));
                    }
                    let action3 = document.createElement('button');
                    action3.innerText = 'Delete';                              //to delete the user
                    action3.classList.add('delete');
                    action3.onclick = (() => deleteUser(element.id));
                    actionCell.appendChild(action1);
                    actionCell.appendChild(action2);
                    actionCell.appendChild(action3);

                    row.appendChild(nameCell);
                    row.appendChild(emailCell);
                    row.appendChild(actionCell);
                    userTBody.appendChild(row);
                });
                userTable.appendChild(userTBody);
            } else {
                document.getElementById('userTable').classList.add('display-none');
                document.getElementById('userNotAvailable').classList.remove('display-none');
            }
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);     //to show error message
            alert("Something went wrong");
        }
    }
}

//Manage pending post
function getPendingPosts() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/getPendingPosts');
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let response = JSON.parse(request.response);
            if (response?.length > 0) {
                let userTable = document.getElementById('pendingPostTable');
                let userTBody = document.getElementById('pendingPostTBody');
                if (userTBody) {
                    pendingPostTBody.innerText = '';
                } else {
                    userTBody = document.createElement('tbody');
                    userTBody.setAttribute('id', 'pendingPostTBody');
                }

                response?.forEach((element, index) => {
                    let row = document.createElement('tr');
                    let nameCell = document.createElement('td');
                    let postCell = document.createElement('td');; 
                    let actionCell = document.createElement('td');

                    nameCell.innerHTML = element.userName;
                    postCell.innerHTML = element.description;

                    let action1 = document.createElement('button');
                    action1.innerText = 'Approve';
                    action1.classList.add('update');

                    //for approve the crime post
                    action1.onclick = (() => approveRejectPost(element.id, 'approved', element.userId, element.typeOfCrime, element.date));
                    let action3 = document.createElement('button');

                    //for reject the crime post
                    action3.innerText = 'Reject';
                    action3.classList.add('delete');
                    action3.onclick = (() => approveRejectPost(element.id, 'rejected', element.userId, element.typeOfCrime, element.date));
                    actionCell.appendChild(action1);
                    actionCell.appendChild(action3);

                    row.appendChild(nameCell);
                    row.appendChild(postCell);
                    row.appendChild(actionCell);
                    userTBody.appendChild(row);
                });
                userTable.appendChild(userTBody);
            } else {
                document.getElementById('pendingPostTable').classList.add('display-none');
                document.getElementById('pendingPostNotAvailable').classList.remove('display-none');
            }
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

// Function for manage crime post
function getManageCrimePosts() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/getPostsForManage');
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let response = JSON.parse(request.response);
            if (response?.length > 0) {
                let manageTable = document.getElementById('manageCrimeTable');
                let manageTBody = document.getElementById('manageTBody');
                if (manageTBody) {
                    manageTBody.innerText = '';
                } else {
                    manageTBody = document.createElement('tbody');
                    manageTBody.setAttribute('id', 'manageTBody');
                }
                response?.forEach((element, index) => {
                    let row = document.createElement('tr');
                    let nameCell = document.createElement('td');
                    let postCell = document.createElement('td');; 
                    let actionCell = document.createElement('td');

                    nameCell.innerHTML = element.userName;
                    postCell.innerHTML = element.description;

                    let action1 = document.createElement('button');
                    action1.innerText = 'Update';
                    action1.classList.add('update');
                    action1.setAttribute('data-bs-toggle', 'modal');
                    action1.setAttribute('data-bs-target', '#postUpdateModal');
                    action1.onclick = (() => updatePost(element));
                    let action3 = document.createElement('button');
                    action3.innerText = 'Delete';
                    action3.classList.add('delete');
                    action3.onclick = (() => deletePost(element.id));
                    actionCell.appendChild(action1);
                    actionCell.appendChild(action3);

                    row.appendChild(nameCell);
                    row.appendChild(postCell);
                    row.appendChild(actionCell);
                    manageTBody.appendChild(row);
                });
                manageTable.appendChild(manageTBody);
            } else {
                document.getElementById('manageCrimeTable').classList.add('display-none');
                document.getElementById('manageCrimeNotAvailable').classList.remove('display-none');
            }
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

//Function for contact Us Page to queries
function getContactUsForms() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/getAllContactUsForm');
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let response = JSON.parse(request.response);
            if (response?.length > 0) {
                let contactUsTable = document.getElementById('contactUsForms');
                let contactUsTBody = document.getElementById('contactUsTBody');
                if (contactUsTBody) {
                    contactUsTBody.innerText = '';
                } else {
                    contactUsTBody = document.createElement('tbody');
                    contactUsTBody.setAttribute('id', 'contactUsTBody');
                }
                response?.forEach((element, index) => {
                    let row = document.createElement('tr');
                    let nameCell = document.createElement('td');
                    let postCell = document.createElement('td');; 
                    let actionCell = document.createElement('td');

                    nameCell.innerHTML = element.fName;
                    postCell.innerHTML = element.subject;

                    let action1;
                    if (element.resolve) {
                        action1 = document.createElement('span');
                        action1.innerText = 'Resolved'; 
                        action1.style.color = 'green';
                    } else {
                        action1 = document.createElement('button');
                        action1.innerText = 'Resolve';
                        action1.classList.add('update');
                        action1.onclick = (() => resolve(element.id));
                    }
                    actionCell.appendChild(action1);

                    row.appendChild(nameCell);
                    row.appendChild(postCell);
                    row.appendChild(actionCell);
                    contactUsTBody.appendChild(row);
                });
                contactUsTable.appendChild(contactUsTBody);
            } else {
                document.getElementById('contactUsCrimeTable').classList.add('display-none');
                document.getElementById('contactUsCrimeNotAvailable').classList.remove('display-none');
            }
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

getAllUsers();
getPendingPosts();
getManageCrimePosts();
getContactUsForms();

//Function for update user
function updateUser(element) {
    userId = element.id;
    document.getElementById('uFName').value = element.fName;
    document.getElementById('uLName').value = element.lName;
    document.getElementById('uGender').value = element.gender;
    document.getElementById('uEmail').value = element.email;
    document.getElementById('uCity').value = element.city;
    document.getElementById('uProvince').value = element.province;
    document.getElementById('uCountry').value = element.country;
    document.getElementById('uPostalCode').value = element.postalCode;
}

// Function for block user
function blockUser(id, block) {
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/blockUnblockUser');
    request.send(JSON.stringify({ id, block }));
    request.onload = () => {
        if (request.status === 200) {
            getAllUsers();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}
// For delete user


function deleteUser(id) {
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/deleteUser');
    request.send(JSON.stringify({ id }));
    request.onload = () => {
        if (request.status === 200) {
            let user = localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                if (user.id === id) {
                    localStorage.removeItem('user');
                }
            }
            getAllUsers();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

// Function for approve and Reject crime post
function approveRejectPost(id, status, userId, crimeType, date) {
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/approveRejectPost');
    request.send(JSON.stringify({ id, status, userId, crimeType, date, updatedAt: new Date() }));
    request.onload = () => {
        if (request.status === 200) {
            getPendingPosts();
            getManageCrimePosts();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

// Function for update crime post
function updatePost(post) {
    postId = post.id;
    document.getElementById('uLocation').value = post.location;
    let typeOfCrime = '1';
    post.typeOfCrime === 'Theft' ? typeOfCrime = '1' : post.typeOfCrime === 'Homicide' ? typeOfCrime = '2' : post.typeOfCrime === 'Domestic Violence' ? typeOfCrime = '3' : post.typeOfCrime === 'Traffic Offense' ? typeOfCrime = '4' : post.typeOfCrime === 'Cyber Crime' ? typeOfCrime = '5' : typeOfCrime = '6';
    document.getElementById('uTypeOfCrime').value = typeOfCrime;
    document.getElementById('uDate').value = post.date;
    document.getElementById('uDescription').value = post.description;

    let status = post.stage === 'Active' ? '1' : post.stage === 'On Going Investigation' ? '2' : '3';
    document.getElementById('uCrimeStatus').value = status;
}

// Function for delete crime post

function deletePost(id) {
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/deletePost');
    request.send(JSON.stringify({ id }));
    request.onload = () => {
        if (request.status === 200) {
            getManageCrimePosts();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

// Function for report crime

let locationType = 1;
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
        let userName = 'Admin';
        let userId = 'Admin';
        let time = new Date();
    
        let request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:3000/addCrime');
        request.send(JSON.stringify({ location, typeOfCrime, date, description, userId, userName, time, status: 'approved', stage: 'Active', updatedAt: time }));
        request.onload = () => {
            if (request.status === 200) {
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
        getPendingPosts();
        document.getElementById("closeButton").click();
    }
}

// Function for save user
function saveUser() {
    let fName = document.getElementById('uFName').value;
    let lName = document.getElementById('uLName').value;
    let gender = document.getElementById('uGender').value;
    let email = document.getElementById('uEmail').value;
    let city = document.getElementById('uCity').value;
    let province = document.getElementById('uProvince').value;
    let country = document.getElementById('uCountry').value;
    let postalCode = document.getElementById('uPostalCode').value;

    let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email address");
        return;
    }

    if (!fName || !lName || !gender || !email || !city || !province || !country || !postalCode) {
        alert('Please fill in all the fields');
        return;
    }

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/updateUser');
    request.send(JSON.stringify({ fName, lName, gender, email, city, province, country, postalCode, id: userId }));
    request.onload = () => {
        if (request.status === 200) {
            getAllUsers();
            document.getElementById('userModalCloseButton').click();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

// Function save Crime post
function savePost() {

    if (!document.getElementById("uLocation").value) {
        alert("Please enter location");
        return;
    }

    if (!document.getElementById("uTypeOfCrime").value) {
        alert("Please select type of crime.");
        return;
    }

    if (!document.getElementById("uDate").value) {
        alert("Please select date.");
        return;
    }

    if (!document.getElementById("uCrimeStatus").value) {
        alert("Please enter description.");
        return;
    }

    let location = document.getElementById('uLocation').value;
    let typeOfCrime = document.getElementById('uTypeOfCrime').value;
    typeOfCrime === '1' ? typeOfCrime = 'Theft' : typeOfCrime === '2' ? typeOfCrime = 'Homicide' : typeOfCrime === '3' ? typeOfCrime = 'Domestic Violence' : typeOfCrime === '4' ? typeOfCrime = 'Traffic Offense' : typeOfCrime === '5' ? typeOfCrime = 'Cyber Crime' : typeOfCrime = 'Other';
    let date = document.getElementById('uDate').value;
    let description = document.getElementById('uDescription').value;
    let status = document.getElementById('uCrimeStatus').value;
    status === '1' ? status = 'Active' : status === '2' ? status = 'On Going Investigation' : status = 'Resolved';

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/updatePost');
    request.send(JSON.stringify({ location, typeOfCrime, date, description, id: postId, stage: status }));
    request.onload = () => {
        if (request.status === 200) {
            getManageCrimePosts();
            document.getElementById('postModalCloseButton').click();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

// Function for resolve query
function resolve(id) {
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/resolveForm');
    request.send(JSON.stringify({ resolve: true, id }));
    request.onload = () => {
        if (request.status === 200) {
            getContactUsForms();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}