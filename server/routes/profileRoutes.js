const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const verifyJWT = require('../middleware/verifyJWT')


router.route('/')
    .post(profileController.signUp);

router.route('/email')
    .post(profileController.matchEmail);

router.use(verifyJWT);

router.route('/:id')
    .get(profileController.getProfile)
    .patch(profileController.updateProfile)
    .delete(profileController.deleteProfile);

module.exports = router;