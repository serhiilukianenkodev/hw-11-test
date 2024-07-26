import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '29142435-196ab0ea47673651fa34d9a29';

export async function getFotos(query) {
  const options = {
    params: {
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  const res = await axios.get(`${BASE_URL}`, options);
  return res.data;
}
