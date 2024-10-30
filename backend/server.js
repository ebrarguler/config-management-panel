require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert(require('./firebase-adminsdk.json')),
});

const configRoutes = require('./routes/configRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/config', configRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));