const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 250,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    isStarred: {
      type: Boolean,
      default: 'false',
    },
    isViewed: {
      type: Boolean,
      default: 'false',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

entrySchema.plugin(uniqueValidator);

// replaces _id with id, convert id to string from ObjectID and deletes __v
entrySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Entry', entrySchema);
