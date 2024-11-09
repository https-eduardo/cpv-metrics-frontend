import axios from "axios";
import { AuthService } from "./auth";
import { CustomerService } from "./customer";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export const authService = new AuthService(api);
export const customersService = new CustomerService(api);
