const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  category: String,
  tags: Array,
  createdAt: String,
  updatedAt: String,
})

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post