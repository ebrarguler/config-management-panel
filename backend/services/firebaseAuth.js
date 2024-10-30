const axios = require('axios');

async function signInWithEmailAndPassword(email, password) {
    const FIREBASE_IDENTITY_TOOLKIT_URL = process.env.FIREBASE_IDENTITY_TOOLKIT_URL;
    const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
    const url = `${FIREBASE_IDENTITY_TOOLKIT_URL}:signInWithPassword?key=${FIREBASE_API_KEY}`;

    try {
        const response = await axios.post(url, {
            email,
            password,
            returnSecureToken: true
        });
        return response.data.idToken;
    } catch (error) {
        console.error('Error response from Firebase:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = {
  signInWithEmailAndPassword
};