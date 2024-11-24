import axios from 'axios';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const response = await axios.post('/api/contact', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
    throw new Error('An unexpected error occurred');
  }
}