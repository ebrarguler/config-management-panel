const admin = require('firebase-admin');

const db = admin.firestore();
const CONFIG_COLLECTION = process.env.CONFIG_COLLECTION;

const getAllConfigs = async (req, res) => {
    try {
        const snapshot = await db.collection(CONFIG_COLLECTION).get();

        if (snapshot.empty) {
            return res.status(404).send('No configurations found');
        }

        const configs = [];
        snapshot.forEach(doc => {
            configs.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(configs);
    } catch (error) {
        res.status(500).send('Error fetching configurations: ' + error.message);
    }
};

const getConfig = async (req, res) => {
    const { id } = req.params;

    try {
        const configDoc = await db.collection(CONFIG_COLLECTION).doc(id).get();

        if (!configDoc.exists) {
            return res.status(404).send('Configuration not found');
        }

        res.status(200).json(configDoc.data());
    } catch (error) {
        res.status(500).send('Error fetching configuration: ' + error.message);
    }
};

const addConfig = async (req, res) => {
    try {
        const newConfig = req.body;

        if (!newConfig.key || !newConfig.value) {
            return res.status(400).send('Invalid configuration data. "key" and "value" fields are required.');
        }

        newConfig.createdAt = new Date().toISOString();
        newConfig.updatedAt = newConfig.createdAt;

        const configDocRef = db.collection(CONFIG_COLLECTION).doc(newConfig.key);
        await configDocRef.set(newConfig);

        res.status(201).send({ id: configDocRef.id, message: 'Configuration created successfully' });
    } catch (error) {
        res.status(500).send('Error creating configuration: ' + error.message);
    }
};

const updateConfig = async (req, res) => {
    const { id } = req.params;
    console.log("id to edit: ", id);
    try {
        const updatedConfig = req.body;
        console.log("here is the updated: ", updateConfig);
        if (!updatedConfig.value || !updatedConfig.updatedAt) {
            return res.status(400).send('Invalid configuration data. "value" and "updatedAt" fields are required.');
        }

        const configDocRef = db.collection(CONFIG_COLLECTION).doc(id);
        const currentConfig = await configDocRef.get();

        if (!currentConfig.exists) {
            return res.status(404).send('Configuration not found');
        }

        const currentData = currentConfig.data();
        console.log("current data: ", currentData)
        if (updatedConfig.updatedAt !== currentData.updatedAt) {
            return res.status(409).send('Conflict detected. Configuration has been updated by another user.');
        }

        updatedConfig.updatedAt = new Date().toISOString();
        await configDocRef.update(updatedConfig);

        res.status(200).send('Configuration updated successfully');
    } catch (error) {
        res.status(500).send('Error updating configuration: ' + error.message);
    }
};

const deleteConfig = async (req, res) => {
    const { id } = req.params;
    
    try {
        const configDocRef = db.collection(CONFIG_COLLECTION).doc(id);
        const currentConfig = await configDocRef.get();
        console.log(currentConfig);
        if (!currentConfig.exists) {
            return res.status(404).send('Configuration not found');
        }

        await configDocRef.delete();
        res.status(200).send('Configuration deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting configuration: ' + error.message);
    }
};

module.exports = { getAllConfigs, getConfig, addConfig, updateConfig, deleteConfig };