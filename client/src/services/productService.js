import api from './api';

export const fetchProductDetail = async (productId) => {
  const res = await api.get(`/products/${productId}`);
  return res.data;
};