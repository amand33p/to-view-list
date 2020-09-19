import axios from 'axios';
import backendUrl from '../backendUrl';

const baseUrl = `${backendUrl}/api/entries`;

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`, setConfig());
  return response.data;
};

const create = async (entryObj) => {
  const response = await axios.post(`${baseUrl}`, entryObj, setConfig());
  return response.data;
};

const update = async (id, entryObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, entryObj, setConfig());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setConfig());
  return response.data;
};

const star = async (id) => {
  const response = await axios.patch(`${baseUrl}/${id}/star`);
  return response.data;
};

const view = async (id) => {
  const response = await axios.patch(`${baseUrl}/${id}/view`);
  return response.data;
};

export default { setToken, getAll, create, update, remove, star, view };
