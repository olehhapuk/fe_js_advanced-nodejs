const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
      default: 0,
    },
    actors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'actor',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('movie', movieSchema);
