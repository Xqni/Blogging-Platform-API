// initiate router
const postRouter = require('express').Router()
// import the model
const Post = require('../models/post')

// fetching all posts with filtering
postRouter.get('/', async (request, response) => {
  const term = request.query.term
  if (term) {
    const posts = await Post.aggregate([
      {
        $search: {
          index: "postSearch",
          text: {
            query: term,
            path: {
              wildcard: "*"
            }
          }
        }
      },
      {
        $project: {
          id: "$_id",
          _id: 0,
          title: 1,
          content: 1,
          category: 1,
          tags: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ])

    if (posts) {
      response.status(200).json(posts)
    } else {
      response.status(404).json({ error: 'Search failed' })
    }
  } else {
    const posts = await Post.find({})
    if (posts) {
      response.status(200).json(posts)
    } else {
      response.status(404).json({ error: 'Posts not found' })
    }
  }
})

// fetching a specific post
postRouter.get('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id)
  if (post) {
    response.status(200).json(post)
  } else {
    response.status(404).json({ error: 'Post not found' })
  }
})

// making a new post
postRouter.post('/', async (request, response) => {
  const body = request.body
  const post = new Post({
    title: body.title,
    content: body.content,
    category: body.category,
    tags: body.tags,
    createdAt: Date().toString(),
    updatedAt: Date().toString()
  })

  const savedPost = await post.save()
  response.status(201).json(savedPost)
})

// updating a post
postRouter.put('/:id', async (request, response) => {
  const prevPost = await Post.findById(request.params.id)
  if (prevPost) {
    const post = new Post({
      title: request.body.title || prevPost.title,
      content: request.body.content || prevPost.content,
      category: request.body.category || prevPost.category,
      tags: request.body.tags || prevPost.tags, // will replace every previous tag with new ones
      updatedAt: Date().toString()
    })
    const savedPost = await post.save()
    await Post.findByIdAndDelete(request.params.id)
    response.status(201).json(savedPost)
  } else {
    response.status(404).json({ error: 'Post not found' })
  }
})

// deleting a post
postRouter.delete('/:id', async (request, response) => {
  await Post.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// export the route
module.exports = postRouter