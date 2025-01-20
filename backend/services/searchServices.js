const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { MongoClient } = require('mongodb');

const PROTO_PATH = './proto/search.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const searchProto = grpc.loadPackageDefinition(packageDefinition).search;

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'SpeakX';
const COLLECTION_NAME = 'ABC';

async function fetchQuestionsByCategory(call, callback) {
  const { category, page } = call.request;
  const client = new MongoClient(MONGO_URL);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const pageSize = 9;
    const skip = (page - 1) * pageSize;

    const questions = await collection
      .find({ type: category })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await collection.countDocuments({ type: category });
    const totalPages = Math.ceil(totalCount / pageSize);

    callback(null, { questions, totalPages });
  } catch (error) {
    callback(error, null);
  } finally {
    await client.close();
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(searchProto.Search.service, { fetchQuestionsByCategory });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server running on http://localhost:50051');
    server.start();
  });
}

main();
