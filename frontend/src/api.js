import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'https://user-management-dashboard-5g3w.onrender.com/' });

export const fetchUsers = () => API.get('/users');
export const fetchUser = (id) => API.get(`/users/${id}`);
export const createUser = (data) => API.post('/users', data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
