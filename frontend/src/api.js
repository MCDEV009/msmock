import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const API = axios.create({ baseURL: API_URL });

export const getTests = (search = '') => API.get('/tests', { params: { search } });
export const getTest = (id) => API.get(`/tests/${id}`);
export const getPrivateTest = (code) => API.get(`/tests/private/${code}`);
export const getQuestions = (testId) => API.get(`/questions/test/${testId}`);
export const createUser = (data) => API.post('/users', data);
export const getUser = (id) => API.get(`/users/${id}`);
export const saveAnswer = (userId, questionId, selected) =>
  API.patch(`/users/${userId}/answer`, { questionId, selected });
export const finishTest = (userId) => API.patch(`/users/${userId}/finish`);
export const searchUsers = (query) => API.get(`/users/search/${query}`);
