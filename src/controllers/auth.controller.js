const Chance = require('chance');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const User = require('../models/User');
const transport = require('../config/emailTransport');

const chance = new Chance();

exports.sendTestEmail = async (req, res, next) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const fakeTransport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const emailInfo = await fakeTransport.sendMail({
      from: `"Test account" <${testAccount.user}>`,
      to: 'bar@example.com',
      subject: 'Testing email service',
      text: 'Verification code: 123456',
      html: '<p>Verification code:</p><h1>123456</h1>',
    });

    const emailUrl = nodemailer.getTestMessageUrl(emailInfo);

    res.json({
      emailInfo,
      emailUrl,
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email } = req.body;

    const verificationToken = chance
      .integer({ min: 100000, max: 999999 })
      .toString();

    const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);

    const emailInfo = await transport.sendMail({
      from: `"Testing verification" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Testing verification',
      text: `Your token: ${verificationToken}`,
      html: `<p style="font-weight: 700">Your token:</p><h1>${verificationToken}</h1>`,
    });

    console.log(emailInfo);

    const user = await User.create({
      email,
      verificationToken: hashedVerificationToken,
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const isTokenValid = await bcrypt.compare(
      verificationToken,
      user.verificationToken
    );

    if (!isTokenValid) {
      res.status(401).send('Invalid verification token');
      return;
    }

    user.verificationToken = null;
    user.isVerified = true;
    await user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    if (user.isVerified) {
      res.status(400).send('This user is already verified');
      return;
    }

    const verificationToken = chance
      .integer({ min: 100000, max: 999999 })
      .toString();

    const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);

    const emailInfo = await transport.sendMail({
      from: `"Testing verification" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Testing verification',
      text: `Your token: ${verificationToken}`,
      html: `<p style="font-weight: 700">Your token:</p><h1>${verificationToken}</h1>`,
    });

    user.verificationToken = hashedVerificationToken;
    await user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    await User.findOneAndDelete({
      email,
    });

    res.send('User deleted');
  } catch (error) {
    next(error);
  }
};
