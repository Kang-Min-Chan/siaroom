import api from './api';

export const fetchCart = async () => {
  const res = await api.get('/cart');
  return res.data;
};

export const updateCart = async (id, quantity) => {
  const res = await api.put(`/cart/${id}`, { quantity });
  return res.data;
};

export const deleteCart = async (id) => {
  const res = await api.delete(`/cart/${id}`);
  return res.data;
};

export const addCart = async (data) => {
  const res = await api.post('/cart', data);
  return res.data;
};