const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', authController.register);
router.post('/verify/:verificationToken', authController.verify);
router.post('/resend-verification', authController.resendVerification);
router.post('/send-test', authController.sendTestEmail);
router.delete('/:email', authController.deleteUser);

module.exports = router;
