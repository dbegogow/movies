const firebaseConfig = {
    apiKey: "AIzaSyBDAP7s9vanyyx-InZqGVUODveqYwn83jY",
    authDomain: "movies-3dc8a.firebaseapp.com",
    databaseURL: "https://movies-3dc8a-default-rtdb.firebaseio.com",
    projectId: "movies-3dc8a",
    storageBucket: "movies-3dc8a.appspot.com",
    messagingSenderId: "578959934985",
    appId: "1:578959934985:web:fb6f9d391aad4f54be5ad8"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function setUserEmail(email) {
    sessionStorage.setItem('userInfo', JSON.stringify({ email }));
}

export function getUserEmail() {
    const userInfo = sessionStorage.userInfo;

    return userInfo
        ? JSON.parse(userInfo).email
        : null;
}

export async function registerUser(email, password) {
    await auth.createUserWithEmailAndPassword(email, password);

    setUserEmail(email);
}

export async function loginUser(email, password) {
    await auth.signInWithEmailAndPassword(email, password);

    setUserEmail(email);
}

export function logoutUser() {
    sessionStorage.removeItem('userInfo');
}




