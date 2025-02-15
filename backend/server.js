const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://arora99:Asca99*+@shivamarora99.aiuceoc.mongodb.net/SpeakX?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.get('/api/search', async (req, res) => {
  try {
    const { query, category } = req.query;

    const filter = {};
    if (query) {
      filter.title = { $regex: query, $options: 'i' }; 
    }
    if (category) {
      filter.type = category;
    }

    let questions = await Question.find(filter).limit(50);

    questions = questions.map((question) => {
      if (question.type === 'Anagrams' && question.blocks) {
        question.blocks = shuffleArray(question.blocks); 
      }
      return question;
    });

    res.json(questions);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
