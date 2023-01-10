const Chance = require('chance');
const bcrypt = require('bcrypt');

const transport = require('../config/emailTransport');

const chance = new Chance();

exports.generateToken = async () => {
  const verificationToken = chance
    .integer({ min: 100000, max: 999999 })
    .toString();

  const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);

  return { verificationToken, hashedVerificationToken };
};

/**
 * Send email verification token to user provided email
 * @param {String} email User email
 * @param {String} verificationToken Non hashed email verification token
 */
exports.sendVerificationEmail = async (email, verificationToken) => {
  const emailInfo = await transport.sendMail({
    from: `"Testing verification" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Testing verification',
    text: `Your token: ${verificationToken}`,
    html: `<p style="font-weight: 700">Your token:</p><h1>${verificationToken}</h1>`,
  });

  return emailInfo;
};

exports.validateVerificationToken = async (
  verificationToken,
  hashedVerificationToken
) => {
  const isTokenValid = await bcrypt.compare(
    verificationToken,
    hashedVerificationToken
  );
  return isTokenValid;
};
