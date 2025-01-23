const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // For parsing JSON requests

// MongoDB connection string (replace with your actual password)
const mongoURI = "mongodb+srv://arora99:Asca99*+@shivamarora99.aiuceoc.mongodb.net/SpeakX?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema and model for Questions
const questionSchema = new mongoose.Schema({
  title: String,
  type: String,
  anagramType: String,
  blocks: [
    {
      text: String,
      showInOption: Boolean,
      isAnswer: Boolean
    }
  ],
  siblingId: String,
  solution: String
});

const Question = mongoose.model('Question', questionSchema);

// Search Route
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;

    // Fetch questions with all fields including 'blocks'
    const questions = await Question.find({ title: { $regex: query, $options: 'i' } })
      .limit(5); // Get first 5 results

    res.json(questions);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
