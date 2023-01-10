const express = require('express');

const authController = require('../controllers/auth.controller');
const { auth } = require('../middlewares');

const router = express.Router();

router.post('/register', authController.register);
router.post('/verify/:verificationToken', auth, authController.verify);
router.post('/resend-verification', auth, authController.resendVerification);
router.delete('/:email', auth, authController.deleteUser);

module.exports = router;
