const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // For parsing JSON requests

// MongoDB connection string
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

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Search Route with fixed block shuffling
app.get('/api/search', async (req, res) => {
  try {
    const { query, category } = req.query;

    const filter = {};
    if (query) {
      filter.title = { $regex: query, $options: 'i' }; // Match by title
    }
    if (category) {
      filter.type = category; // Filter by selected category (MCQs, Anagrams, or Read Along)
    }

    // Fetch questions matching the filter
    let questions = await Question.find(filter).limit(50);

    // Shuffle the blocks for anagrams
    questions = questions.map((question) => {
      if (question.type === 'Anagrams' && question.blocks) {
        // Shuffle blocks for anagram type questions
        question.blocks = shuffleArray(question.blocks); 
      }
      return question;
    });

    res.json(questions); // Send the results to the frontend
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
