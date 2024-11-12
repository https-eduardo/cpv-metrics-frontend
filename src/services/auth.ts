import { AxiosInstance } from "axios";

export class AuthService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  setAuthorizationToken(token: string) {
    this.api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  async login(identifier: string, password: string) {
    try {
      const response = await this.api.post('/auth/local', {
        identifier,
        password,
      });

      const { jwt } = response.data;

      if (jwt) {
        localStorage.setItem('token', jwt);
        this.setAuthorizationToken(jwt);
      }
      return response.data;

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userData')
    this.setAuthorizationToken('');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}