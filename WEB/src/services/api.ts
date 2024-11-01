import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

interface ApiError {
  message?: string;
}

api.interceptors.response.use(
  response => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      console.error('Erro na resposta do servidor:', error.response.data);
      alert(`Erro: ${error.response.data.message || 'Ocorreu um erro inesperado.'}`);
    } else if (error.request) {
      console.error('Erro na requisição:', error.request);
      alert('Erro: O servidor não respondeu. Tente novamente mais tarde.');
    } else {
      console.error('Erro:', error.message);
      alert('Erro: Ocorreu um erro inesperado. Tente novamente.');
    }
    return Promise.reject(error);
  }
);

export default api;

