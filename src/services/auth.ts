import { AxiosInstance } from "axios";

export class AuthService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  setAuthorizationToken(token: string) {
    this.api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  async login() {
    return this.api.post("login");
  }

  async logout() {
    return this.api.post("logout");
  }
}
