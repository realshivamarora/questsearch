import { SearchRequest } from './proto/search_pb';
import { QuestionServiceClient } from './proto/SearchServiceClientPb';

const client = new QuestionServiceClient('http://localhost:8080', null, null);

export const searchQuestions = (searchTerm, category, page) => {
  const request = new SearchRequest();
  request.setSearchTerm(searchTerm);
  request.setCategory(category);
  request.setPage(page);

  return new Promise((resolve, reject) => {
    client.searchQuestions(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.getQuestionsList());
      }
    });
  });
};
