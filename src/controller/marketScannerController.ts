import { AxiosResponse } from 'axios';
import { EmaScanner } from '../model/scanner';

const axios = require('axios').default;

const baseURL =
  process.env.NODE_ENV !== 'development'
    ? 'http://65.151.176.228:30253'
    : 'http://localhost:8080';


export const getScannerData = (scanner: 'ema' | 'macd' | 'rsi'): Promise<EmaScanner[]> => {
  return axios
    .get(`/scanner/${scanner}`, {
      baseURL: baseURL,
    })
    .then(({ data }: AxiosResponse) => {
      return data;
    })
    .catch((error: any) => {
      throw error;
    });
};