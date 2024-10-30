const admin = require('firebase-admin');

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    const idToken = authHeader.replace('Bearer ', '');
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized: Invalid token');
    }
};

module.exports = verifyFirebaseToken;