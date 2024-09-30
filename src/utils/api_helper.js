import axios from 'axios';
const HOST = 'http://localhost:3002';

const fetchAllProducts = () => {
  return axios.get(`${HOST}/products?_sort=quantity&_order=desc&_expand=genre`);
};

const createProducts = product => {
  return axios.post(`${HOST}/products`, { ...product });
};

const searchProducts = ({ name, genreId }) => {
  let q = `${HOST}/products?_sort=quantity&_order=desc&_expand=genre`;
  if (name) q += `&name_like=${name}`;
  if (genreId && genreId * 1 !== 0) q += `&genreId=${genreId}`;
  return axios.get(q);
};

const fetchAllGenres = () => {
  return axios.get(`${HOST}/genres`);
};

export default {
  fetchAllGenres,
  fetchAllProducts,
  createProducts,
  searchProducts,
};
