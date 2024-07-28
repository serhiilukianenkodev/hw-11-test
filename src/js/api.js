import axios from 'axios';

// export async function getFotos(query) {
//   const options = {
//     params: {
//       key: apiKey,
//       q: query,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//     },
//   };
//   const res = await axios.get(`${BASE_URL}`, options);
//   return res.data;
// }

export class ImagesApi {
  constructor() {
    this.page = 1;
    this.perPage = 30;
    this.query = '';
  }

  setQuery(newQuery) {
    this.query = newQuery;
    this.page = 1;
  }

  setNextPage() {
    this.page += 1;
  }

  async getData() {
    const BASE_URL = 'https://pixabay.com/api/';
    const apiKey = '29142435-196ab0ea47673651fa34d9a29';
    const options = {
      params: {
        key: apiKey,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.perPage,
      },
    };
    const res = await axios.get(`${BASE_URL}`, options);
    return res.data;
  }
}
