import api from './api';
import { UrlItem } from './types';

type AuthResponse = {
  access_token: string;
};

// URLS
export const getUrls = async (): Promise<UrlItem[]> => {
    const res = await api.get('/urls');
    return res.data;
  };

// CREATE url
export async function createUrl(originalUrl: string): Promise<UrlItem> {
    const res = await api.post<UrlItem>('/urls/shorten/', {originalUrl});
    return res.data;
  }

// DELETE URL
export const deleteUrl = async (shortCode: string): Promise<UrlItem[]> => {
    const res = await api.delete(`/urls/${shortCode}`);
    return res.data;
};

// DELETE URL
export const increaseUrlClickCount = async (id: string): Promise<UrlItem> => {
    const res = await api.put(`/urls/${id}/increase-click-count`);
    return res.data;
};