const Router = require('express').Router;
const router = Router();

const itemsController = require('../controllers/items');

router.get('/test-connection', itemsController.setItem);

module.exports = router;