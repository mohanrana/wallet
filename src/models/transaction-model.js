const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    balance: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    autoCreate: true
  }
);

module.exports = mongoose.model('transaction', schema);
