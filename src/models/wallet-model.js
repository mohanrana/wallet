const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    balance: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    autoCreate: true
  }
);

module.exports = mongoose.model('wallet', schema);
