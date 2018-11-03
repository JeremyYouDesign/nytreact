import axios from 'axios';

const apiKey = 'f4ba7a80f43d4a23a88e7b52d78f35e4';
const queryUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + apiKey + '&q=';

export default {
  nytSearch: function(queryTerms) {
    return axios.get(`${queryUrl}${queryTerms}`);
  },
  getSavedArticles: function() {
    return axios.get('/api/saved/');
  },
  deleteArticle: function(id) {
    return axios.delete('/api/saved/' + id);
  },
  saveArticle: function(articleData) {
    return axios.post('/api/saved', articleData);
  }
};