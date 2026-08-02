# Blog Post API

A simple Express.js API for creating and retrieving blog posts.

## Run the server

```bash
node app.js
```

The server will start on port 3000 by default.

## Endpoints

### Create a blog post
- Method: POST
- Path: /posts
- Body:

```json
{
  "title": "My First Blog Post",
  "content": "This is the content of the blog post.",
  "author": "Hira Hasan"
}
```

### Get a blog post by ID
- Method: GET
- Path: /posts/:id

## Test with cURL

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Blog Post","content":"This is the content of the blog post.","author":"Hira Hasan"}'
```

```bash
curl http://localhost:3000/posts/1
```
