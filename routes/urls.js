const express =  require('express');
const router = express.Router();
const {handleGenerateShortId, handleAnalytics} = require('../controllers/urls');

router.post('/',handleGenerateShortId)
.get('/analytics/:shortid',handleAnalytics);

module.exports = router;