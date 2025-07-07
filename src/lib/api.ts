import axios from 'axios';

const BASE_URL = 'http://localhost:5009/api';

export const signup = (userData: { username: string; email: string; password: string }) =>
  axios.post(`${BASE_URL}/auth/signup`, userData);



export const login = ({ email, password }: { email: string; password: string }) =>
  axios.post('http://localhost:5009/api/auth/login', { email, password }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Only needed if backend sets cookies
  });
export const createProject = (data: {
    title: string;
    url: string;
    category?: string;
  }) =>
    axios.post(`http://localhost:5009/api/projects`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
  export const getProjects = () =>
    axios.get(`http://localhost:5009/api/projects`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
  export const deleteProject = (id: string) =>
    axios.delete(`http://localhost:5009/api/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  