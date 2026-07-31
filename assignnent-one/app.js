const express = require('express');
const { z } = require('zod');

const app = express();
app.use(express.json());

class BlogPost {
  constructor({ id, title, content, author, createdAt }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
  }
}

const posts = [];

function sanitizeInput(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/<[^>]*>/g, '').trim();
}

const blogPostSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters long'),
  content: z.string().trim().min(10, 'Content must be at least 10 characters long'),
  author: z.string().trim().min(1, 'Author is required')
});

app.post('/posts', (req, res) => {
  const sanitizedBody = {
    title: sanitizeInput(req.body?.title),
    content: sanitizeInput(req.body?.content),
    author: sanitizeInput(req.body?.author)
  };

  const result = blogPostSchema.safeParse(sanitizedBody);

  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || 'Invalid blog post data';
    return res.status(400).json({ error: errorMessage });
  }

  const newPost = new BlogPost({
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title: result.data.title,
    content: result.data.content,
    author: result.data.author,
    createdAt: new Date().toISOString()
  });

  posts.push(newPost);

  return res.status(201).json({
    message: 'Blog post created successfully',
    post: newPost
  });
});

app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Post ID must be a valid integer' });
  }

  const post = posts.find((entry) => entry.id === id);

  if (!post) {
    return res.status(404).json({ error: `Blog post with ID ${id} not found` });
  }

  return res.status(200).json(post);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
