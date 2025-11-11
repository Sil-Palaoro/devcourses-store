import axios, { AxiosInstance } from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

class Api {
    client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE,
            headers: { "Content-type": "application/json" },
        });

        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem("dc_token");
            if(token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    get<T>(url: string) {
        return this.client.get<T>(url).then(res => res.data);
    }

    post<T>(url: string, payload?: any) {
        return this.client.post<T>(url, payload).then(res => res.data);
    }

    patch<T>(url: string, payload?: any) {
        return this.client.patch<T>(url, payload).then(res => res.data);
    }

    delete<T>(url: string) {
        return this.client.delete<T>(url).then(res => res.data);
    }
}

export default new Api();