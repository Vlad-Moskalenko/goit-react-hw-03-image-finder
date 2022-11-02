import axios from 'axios';

export default async function fetchGetImage(searchQuery, currentPage = 1, perPage = 12) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '30819476-f9247b8148545f328aa332668';

  const params = new URLSearchParams({
    key: API_KEY,
    page: currentPage,
    per_page: perPage,
    q: searchQuery,
    image_type: "photo",
    orientation: "horizontal"
  });

  return axios.get(`${BASE_URL}?${params}`)
    .then(response => {
      if(response.data.hits.length > 0) return response.data.hits;
      new Error()
    })
}
