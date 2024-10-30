const express = require('express');
const router = express.Router();
const verifyFirebaseToken = require('../middlewares/authMiddleware');
const { getAllConfigs, getConfig, addConfig, updateConfig, deleteConfig } = require('../controllers/configController');

router.get('/', verifyFirebaseToken, getAllConfigs);

router.get('/:id', verifyFirebaseToken, getConfig);

router.post('/', verifyFirebaseToken, addConfig);

router.put('/:id', verifyFirebaseToken, updateConfig);

router.delete('/:id', verifyFirebaseToken, deleteConfig);

module.exports = router;