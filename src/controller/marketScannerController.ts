import { AxiosResponse } from 'axios';
import { EmaScanner } from '../model/scanner';
import { Symbol } from '../model/scanner';

const axios = require('axios').default;

const baseURL =
  process.env.NODE_ENV !== 'development'
    ? 'http://10.136.171.20:30815'
    : 'http://localhost:8080';

export const getScannerData = (
  scanner: 'ema' | 'macd' | 'rsi',
): Promise<EmaScanner[]> => {
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

export const getSymbols = (): Promise<string[]> => {
  return axios
    .get('/symbols', {
      baseURL: baseURL,
    })
    .then(({ data }: AxiosResponse) => {
      return data;
    })
    .catch((error: any) => {
      throw error;
    });
};

export const deleteSymbol = (symbol: string): Promise<void> => {
  return axios
    .delete(`/symbols/${symbol}`, {
      baseURL: baseURL,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    .then(({ data }: AxiosResponse) => {
      return;
    })
    .catch((error: any) => {
      throw error;
    });
};

export const addSymbol = (symbol: string): Promise<Symbol> => {
  return axios
    .post(
      `/symbols`,
      { name: symbol },
      {
        baseURL: baseURL,
      },
    )
    .then(({ data }: AxiosResponse) => {
      return data;
    })
    .catch((error: any) => {
      throw error;
    });
};

export const bulkAddSymbols = (symbols: string[]): Promise<Symbol[]> => {
    return axios
        .post(
            `/symbols/bulk-add`,
            { symbols },
            {
                baseURL: baseURL,
            },
        )
        .then(({ data }: AxiosResponse) => {
            return data;
        })
        .catch((error: any) => {
            throw error;
        });
};
