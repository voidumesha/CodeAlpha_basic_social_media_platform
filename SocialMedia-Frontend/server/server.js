const express = require('express');
const app = express();
const port = 3000;


const posts = [
  {
    id: '669210b425b689baa8de66e7',
    userId: '668bc8e7c6a77a12345fc00e',
    desc: 'I am  chavi here',
    likes: [],
    createdAt: '2024-07-13T05:29:24.431+00:00',
    updatedAt: '2024-07-13T05:29:24.431+00:00',
  },
  
  // Add more post objects as needed
];

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/posts/:userId/timeline', (req, res) => {
  const userId = req.params.userId;
  const userPosts = posts.filter(post => post.userId === userId);
  res.json(userPosts);
});

app.listen(port, () => {yield
  console.log(`Server running at http://localhost:${port}`);
});
