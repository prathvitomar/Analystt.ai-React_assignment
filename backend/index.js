// import express from 'express'
// import cors from 'cors'


// const app = express();
// const PORT = process.env.PORT || 3001; // Set your preferred port
// app.use(cors())
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// server.js

import express from 'express'
import cors from 'cors'
import axios from 'axios';
const app = express();
app.use(cors())
const PORT = process.env.PORT || 3001;

// Define a route to fetch data from the API
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
