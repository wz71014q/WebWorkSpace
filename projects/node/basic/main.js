const axios = require('axios');

axios.get('https://api.douban.com/v2/movie/top250')
  .then(response => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });
