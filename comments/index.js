const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')
const { stat } = require('fs/promises')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByIdPosts = {}

//get a paticular comment by id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByIdPosts[req.params.id] || [])
})

//post a new comment
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body

  const comments = commentsByIdPosts[req.params.id] || []
  comments.push({ id: commentId, content, status: 'pending' }) //comments created
  commentsByIdPosts[req.params.id] = comments

  //sent request to the event bus
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  })

  res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
  console.log('Event Received', req.body.type)

  const { type, data } = req.body

  if (type === 'CommentModerated') {
    const { id, postId, status, content } = data
    const comments = commentsByIdPosts[postId]

    const comment = comments.find(comment => {
      return comment.id === id
    })
    comment.status = status

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content
      }
    })
  }

  res.send({ status: {} })
})

app.listen(4001, () => {
  console.log('Listening on port 4001')
})
