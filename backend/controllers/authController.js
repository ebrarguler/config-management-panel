const { signInWithEmailAndPassword } = require('../services/firebaseAuth');

const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const idToken = await signInWithEmailAndPassword(email, password);
        res.status(200).json({ idToken });
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            res.status(400).send(`Error signing in: ${error.response.data.error.message}`);
        } else {
            res.status(500).send('Error signing in: ' + error.message);
        }
    }
};

module.exports = { signIn };
