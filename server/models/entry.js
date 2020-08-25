const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 40,
      unique: true,
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
    tags: [{ type: String }],
    starred: {
      type: Boolean,
      default: 'false',
    },
    viewed: {
      type: Boolean,
      default: 'false',
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
