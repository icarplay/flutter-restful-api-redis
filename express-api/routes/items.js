const Router = require('express').Router;
const router = Router();

const itemsController = require('../controllers/items');

router.post('/create-card', itemsController.createCard);
router.post('/create-card-date', itemsController.createCardDate);

router.post('/delete-card', itemsController.deleteCard);
router.post('/delete-card-date', itemsController.deleteCardDate);

module.exports = router;