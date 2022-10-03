const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  password: String,
  tags: {
    gender: String,
    position: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

userSchema.plugin(uniqueValidator);

const User = model("User", userSchema);

module.exports = User;
