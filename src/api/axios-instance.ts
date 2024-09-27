import { ID_TOKEN } from '@psycron/utils/tokens';
import axios from 'axios';

// Cria a instância do Axios com a baseURL
const apiClient = axios.create({
	baseURL: import.meta.env.VITE_PSYCRON_BASE_API_URL, // URL base correta
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // Para enviar cookies, se necessário
});

// Interceptor de requisição para sempre pegar o token do localStorage
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(ID_TOKEN); // Obtém o token atual
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`; // Define o token no cabeçalho
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Interceptor de resposta para capturar erros
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const errorMessage =
			error.response?.data?.message || 'Unknown error occurred';
		const statusCode = error.response?.status || 500;
		return Promise.reject({ message: errorMessage, statusCode });
	}
);

export default apiClient;
