const request = require('supertest');
const app = require('./app');

async function runTests() {
  const createResponse = await request(app)
    .post('/posts')
    .send({
      title: 'My First Blog Post',
      content: 'This is the content of the blog post.',
      author: 'Hira Hasan'
    });

  if (createResponse.status !== 201) {
    console.error('POST /posts failed', createResponse.status, createResponse.body);
    process.exit(1);
  }

  const getResponse = await request(app).get('/posts/1');
  if (getResponse.status !== 200) {
    console.error('GET /posts/:id failed', getResponse.status, getResponse.body);
    process.exit(1);
  }

  const invalidResponse = await request(app)
    .post('/posts')
    .send({ title: 'Hi', content: 'short', author: '' });

  if (invalidResponse.status !== 400) {
    console.error('Validation check failed', invalidResponse.status, invalidResponse.body);
    process.exit(1);
  }

  console.log('All API tests passed.');
}

runTests();
