import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { LoginRes } from '../types/services/auth.types';

const ENDPOINT = import.meta.env.VITE_API_URL;

const commonConfig: AxiosRequestConfig = {};

const axiosConfig: AxiosRequestConfig = {
  ...commonConfig,
  baseURL: `${ENDPOINT}/`,
};

const customAxios = axios.create(axiosConfig);

const interceptRequest = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem('jwt_info');
  if (token) {
    const jwtInfo: LoginRes = JSON.parse(token);
    // @ts-ignore
    config.headers['Authorization'] = `Bearer ${jwtInfo.result?.token}`;
    // @ts-ignore
    // config.headers['Accept'] = `application/json, application/xml, text/plain, text/html, *.*`;
    // // @ts-ignore
    // config.headers['Content-Type'] = `multipart/form-data`;
    // // @ts-ignore
    // config.headers['Access-Control-Allow-Origin'] = '*';
    // // @ts-ignore
    // config.headers['Access-Control-Allow-Origin'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
  }
  return config;
};

const interceptResponse = (error: Error | AxiosError<AxiosResponse<Response>>) => {
  if (axios.isAxiosError(error)) {
    const e = error?.response;

    if (e?.status === 401 && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    // unauthorized
    throw error;
  } else {
    return error;
  }
};

customAxios.interceptors.request.use(interceptRequest);
customAxios.interceptors.response.use((config) => config, interceptResponse);

export { customAxios };
