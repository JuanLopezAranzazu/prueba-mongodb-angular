const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postSchema = new Schema({
  content: String,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

postSchema.plugin(uniqueValidator);

const Post = model("Post", postSchema);

module.exports = Post;
