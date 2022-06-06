const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
// Middle ware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: 'crime-book-5fb84',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCgGsqEDLL1F5KE\nDH9+DF3UlCHnH9Non7PlyZADWpI5KZH14fNXLd1NabUQdltgce31LJg7ASCtL8t5\nTPF2y6F6X1LgHXv3yvoKEgErlC/XcekgmodTJPlxXfTxeXtV0UhmAlxqLtKLZjP/\nryFiGcqNqDa3yb4mwT8GpyWPLvUPo3tcOeMGC2Se/mSnNxHMSoRbh0EpL9rqklaC\nnOX2A6HMbsqxAfsEsiNm+7ixD+Xj/la8ZdAnGFuF5HffQ3FrgpASzcN+KtkC0xYF\nGdUUKgbGMRNVqltYkxDBTna5S+V5WY7YC26+WD/XCuFxco5JZ4Hoj0DSuA/CoyLW\n0n/4mCgHAgMBAAECggEATCeSLq9vrB8TRRZAym8NbqErYymDQJ++TU3L35yEMwZv\n9BoOymf5fOoMAxGZM03d1yHoIyDNLzOtwDv2GwCPBYsz+4BqyBnXR1T7E4SAISWA\ns05tkgHjWKZNbVLQdKiAnG0BEkzFPyNVFohyA5yq+SiLJm6isQJ4fSyiM/ItBMuI\nrKJDPqCa90FW/cbs6epz8gJPISAsSCcAG6EvZPxSuBwFJQU1ihjqB+4lV1HYaT8m\n0XPZGXSARCns/eOwg7KGiUrjLZlXT2jZAoJdSNZC25Msu6A6NN4o+kXs7mnmL55m\nGtPlXgunmXP4GCL3KditIJMp1A7WMjDIfqvDCsmHmQKBgQDO2glEq5nS8Sa0R4xy\n850CPVa8lMDJQ9rwsoIhFa7bBGH2hC2dtnZNqM10eXmDOwQKc7mKJIzbZ+d31baN\nY9DsZAcRrKbN3mz3SHye+2Nd9S0pB/6Mis67sxPgX73RDhdrQvLUOFfbqWuckNov\nEmksmqpjIDJJd+aktxITrAf3/QKBgQDGJVF6Cil8Q0DgoLl4g1MzECtNTtMQ5J4v\nGyVDmyltMMyfm7dpaG1SIG4yTWwYNySwYtTnMGF0wyrnvz2OpwkbIZRoP81F1DBP\nX/oeNsVU4WxOgKURJDS1sZATMpj48/iI9ej+5NP5aPm7BIXzDZKBvRXVDmde7J/P\nVtyiaccVUwKBgHOq2rnqlyassK7ov3HcJfUFpcXoDHG/HuOvfjLP9CoGplz6BqQF\nTtwYQ2MZNkiarKTHl33W+GkMDhQljmI76az2Njm86L1/3kDc6Mrh2evFWM5z6PRf\n/kBZYAj8oKERFylkk3L2WrK7ZzByk3709Zj6l8K8U0Jf6Lo8oMAdV4tlAoGAKlPu\ng9OH6TO0uEedV1E2hMH/fhRIomM0J3v1CewrfVffXnk1RR85u0GSSMyhOssM22FB\neeGr7/WBROBllgO4vkL+IQcAItqhN1OZarrojKlbKanxmSfS2r2DuZYld4kmnptp\nmonnfnAeaQUeWD2d/nkWIN1i17RUr0Yu+8L89GECgYBUhaDGGBNRFvtzuilexuHq\nvtwc0dTHPvl+hOxF+PVayyE1UiQVvLpYjDo978TFJeRgqIvmiT34vq2mxN1iAsbS\nL7kNpH82qZzfgQ1tSRJHhXuvWa2GzhSyLHAd8Ho8elPbBtZfHcjugOzX4bUBHY9j\n8+aqz91yVCt+TkPCGV4AeA==\n-----END PRIVATE KEY-----\n',
        clientEmail: 'firebase-adminsdk-brvb2@crime-book-5fb84.iam.gserviceaccount.com'
    }),
    databaseURL: 'https://crime-book-5fb84.firebaseio.com'
});

app.get('/', async(req, res) => {
    res.status(200).send('Hello World');
});

// for register user

app.post('/register', async (req, res) => {
    const { fName, lName, gender, email, password, city, province, country, postalCode, question1, ansQue1, question2, ansQue2, createdAt } = JSON.parse(req.body);
    admin.firestore().collection('users').add({ fName, lName, gender, email, password, city, province, country, postalCode, question1, ansQue1, question2, ansQue2, sosNumbers: [], notifications: [], createdAt }).then((snapshot) => {
        res.status(200).send(snapshot.id);
    });
});

// For login

app.post('/login', async (req, res) => {
    const { email, password, type } = JSON.parse(req.body);

    //For Admin login

    if (type === 'Admin') { 
        if (email === 'Admin' && password === 'Admin') {
            res.status(200).send(JSON.stringify({userType: 'Admin'}));
        } else {
            res.status(200).send(JSON.stringify({userType: 'None'}));
        }
    } 

    // For User login
    else {
        const result = await admin.firestore().collection('users').where('email', '==', email).where('password', '==', password);
        result.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data()
            }))
            if(data && data.length > 0) {
                if (data[0].block) {
                    res.status(200).send(JSON.stringify({block: true}));
                } else {
                    res.status(200).send(data[0]);
                }
            } else {
                res.status(400).send(data);
            }
        });
    }
});

// For Add crime
app.post('/addCrime', async (req, res) => {
    const { location, typeOfCrime, date, description, userId, userName, time, status, stage, updatedAt } = JSON.parse(req.body);
    admin.firestore().collection('crimes').add({ location, typeOfCrime, date, description, userId, userName, time, status, stage, updatedAt }).then((snapshot) => {
        if (userId !== 'Admin') {
            let message = `Your post for crime ${typeOfCrime} on ${date} is pending by Admin.`;
            saveNotification(message, userId, res);
        } else {
            res.status(200).send(true);
        }
    });
});

// for save notification

async function saveNotification(message, id, res, globalMessage = '', isSaveAllNotifications = false) {
    await admin.firestore().collection('users').doc(id).get().then((snapshot) => {
        if (isSaveAllNotifications) {
            saveGlobalNotification(globalMessage)
        }

        if (snapshot.data()) {
            let notifications = snapshot.data().notifications;
            notifications.push({ message });
            const user = admin.firestore().collection('users').doc(id);
            user.update({ notifications }).then((data) => {
                res.status(200).send(notifications);
            });
        } else {
            res.status(200).send(true);
        }
    });
}

// For global notifation 
async function saveGlobalNotification(message) {
    await admin.firestore().collection('notifications').doc('1').get().then((snapshot) => {
        let notifications = snapshot.data().allNotifications;
        notifications.push({ message });
        const user = admin.firestore().collection('notifications').doc('1');
        user.update({ allNotifications: notifications });
    });
}

// For get crime

app.get('/getCrime', async (req, res) => {
    const result = await admin.firestore().collection('crimes').where('userId', '==', req.query.id);
    result.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data()
        }))
        res.status(200).send(data);
    });
});

// for get all crime
app.get('/getAllCrime', async (req, res) => {
    const result = await admin.firestore().collection('crimes');
    result.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data()
        }))
        res.status(200).send(data);
    });
});

// for get category wise crime
app.get('/getTypeWiseCrime', async (req, res) => {
    const result = await admin.firestore().collection('crimes').where('typeOfCrime', '==', req.query.crimeType).where('status', '==', 'approved');
    result.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data()
        }))

        data.sort(function(a, b) {
            var c = new Date(a.updatedAt);
            var d = new Date(b.updatedAt);
            return d-c;
        });
        
        res.status(200).send(data);
    });
});

// for get all users
app.get('/getAllUsers', async (req, res) => {
    const result = await admin.firestore().collection('users');
    result.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data()
        }))

        data.sort(function(a, b) {
            var c = new Date(a.createdAt);
            var d = new Date(b.createdAt);
            return d-c;
        });

        res.status(200).send(data);
    });
});

// for get pending crime post

app.get('/getPendingPosts', async (req, res) => {
    const result = await admin.firestore().collection('crimes').where('status', '==', 'pending');
    result.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data()
        }));

        data.sort(function(a, b) {
            var c = new Date(a.updatedAt).getTime();
            var d = new Date(b.updatedAt).getTime();
            return d-c;
        });

        res.status(200).send(data);
    });
});

// for manage post
app.get('/getPostsForManage', async (req, res) => {
    const result = await admin.firestore().collection('crimes').where('status', '==', 'approved');
    result.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data()
        }))
        data.sort(function(a, b) {
            var c = new Date(a.updatedAt).getTime();
            var d = new Date(b.updatedAt).getTime();
            return d-c;
        });
        res.status(200).send(data);
    });
});

// for block and unblock user
app.post('/blockUnblockUser', async (req, res) => {

    const { block, id } = JSON.parse(req.body);

    const user = admin.firestore().collection('users').doc(id);
    user.update({ block }).then(() => {
        res.status(200).send('Updated');
    });
});

// for delete user

app.post('/deleteUser', async (req, res) => {

    const { id } = JSON.parse(req.body);

    const user = admin.firestore().collection('users').doc(id).delete();
    user.then(() => {
        res.status(200).send('Deleted');
    });
});

// for approve and reject crime post
app.post('/approveRejectPost', async (req, res) => {

    const { status, id, userId, crimeType, date, updatedAt } = JSON.parse(req.body);

    const user = admin.firestore().collection('crimes').doc(id);
    user.update({ status, updatedAt }).then(() => {
        let message = `Your post for crime ${crimeType} on ${date} is ${status}.`;
        let globalMessage = `New ${crimeType} crime posted on ${formatDate(new Date())}.`;
        saveNotification(message, userId, res, globalMessage, true);
        // res.status(200).send('Updated');
    });
});

// For date 
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// for delete post

app.post('/deletePost', async (req, res) => {

    const { id } = JSON.parse(req.body);

    const crime = admin.firestore().collection('crimes').doc(id).delete();
    crime.then(() => {
        res.status(200).send('Deleted');
    });
});

// for update user profile
app.post('/updateUser', async (req, res) => {
    const { fName, lName, gender, email, city, province, country, postalCode, id } = JSON.parse(req.body);
    const user = admin.firestore().collection('users').doc(id);
    user.update({ fName, lName, gender, email, city, province, country, postalCode }).then(() => {
        res.status(200).send('Updated');
    });
});

// for update crime post
app.post('/updatePost', async (req, res) => {
    const { location, typeOfCrime, date, description, stage, id } = JSON.parse(req.body);
    const user = admin.firestore().collection('crimes').doc(id);
    user.update({ location, typeOfCrime, date, description, stage }).then(() => {
        res.status(200).send('Updated');
    });
});

// for update sos number
app.post('/saveSosNumber', async (req, res) => {
    const { name, number, id } = JSON.parse(req.body);
    await admin.firestore().collection('users').doc(id).get().then((snapshot) => {
        let sosNumbers = snapshot.data().sosNumbers
        sosNumbers.push({ name, number });
        const user = admin.firestore().collection('users').doc(id);
        user.update({ sosNumbers }).then(() => {
            res.status(200).send('Updated');
        });
    });
});

// for update sos number

app.post('/updateSosNumbers', async (req, res) => {
    const { sosNumbers, id } = JSON.parse(req.body);
    const user = admin.firestore().collection('users').doc(id);
    user.update({ sosNumbers }).then(() => {
        res.status(200).send('Updated');
    });
});

// for contact us page
app.post('/contactUsForm', async (req, res) => {
    const { fName, lName, country, subject } = JSON.parse(req.body);
    admin.firestore().collection('contactUs').add({ fName, lName, country, subject, resolved: false }).then((snapshot) => {
        res.status(200).send(snapshot.id);
    });
});

// for get queries from contact us page
app.get('/getAllContactUsForm', async (req, res) => {
    const result = await admin.firestore().collection('contactUs');
    result.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data()
        }))
        res.status(200).send(data);
    });
});

// for resolve query
app.post('/resolveForm', async (req, res) => {
    const { resolve, id } = JSON.parse(req.body);
    const user = admin.firestore().collection('contactUs').doc(id);
    user.update({ resolve }).then(() => {
        res.status(200).send('Updated');
    });
});

// for get notification to all users

app.get('/getAllUserNotifications', async (req, res) => {
    const result = await admin.firestore().collection('notifications').doc('1');
    result.get().then((snapshot) => {
        res.status(200).send(snapshot.data());
    });
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});