const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const path = require('path');

// Load the .proto file
const PROTO_PATH = path.join(__dirname, 'search.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition);

// MongoDB connection and model
mongoose.connect('mongodb://localhost:27017/SpeakX', { useNewUrlParser: true, useUnifiedTopology: true });
const Question = mongoose.model('Question', {
  questionText: String,
  category: String
});

// Search function with pagination
function searchQuestions(call, callback) {
  const { searchTerm, category, page } = call.request;
  const skip = (page - 1) * 5;

  const query = category ? { questionText: { $regex: searchTerm, $options: 'i' }, category } : { questionText: { $regex: searchTerm, $options: 'i' } };

  Question.find(query)
    .skip(skip)
    .limit(5)
    .exec((err, questions) => {
      if (err) {
        callback(err);
      } else {
        Question.countDocuments(query, (err, totalCount) => {
          if (err) {
            callback(err);
          } else {
            callback(null, {
              questions: questions.map((q) => ({
                questionId: q._id,
                questionText: q.questionText,
                category: q.category
              })),
              totalCount
            });
          }
        });
      }
    });
}

// Create the gRPC server
const server = new grpc.Server();
server.addService(proto.QuestionService.service, { searchQuestions });

// Start the server
server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://localhost:50051');
server.start();
