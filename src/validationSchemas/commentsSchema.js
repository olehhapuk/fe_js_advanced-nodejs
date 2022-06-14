const yup = require('yup');

exports.create = yup.object().shape({
  username: yup.string().min(3).max(255).required(),
  text: yup.string().min(3).required(),
  parentPostId: yup.string().required(),
});
