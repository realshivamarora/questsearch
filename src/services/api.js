import { SearchClient } from './proto/SearchServiceClientPb';
import { FetchQuestionsByCategoryRequest } from './proto/search_pb';

const client = new SearchClient('http://localhost:50051');

export async function fetchQuestionsByCategory(category, page) {
  const request = new FetchQuestionsByCategoryRequest();
  request.setCategory(category);
  request.setPage(page);

  return new Promise((resolve, reject) => {
    client.fetchQuestionsByCategory(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          questions: response.getQuestionsList().map((q) => ({
            title: q.getTitle(),
            solution: q.getSolution(),
          })),
          totalPages: response.getTotalpages(),
        });
      }
    });
  });
}
