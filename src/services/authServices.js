import API from '../api'

export default async function loginUser (email, password) {
  const response = await API.post('auth/login/', { email, password });
  return response.data;
}

// Rest of need User APIs ...