import axios from 'axios';

const BASER_URL = process.env.NEXT_PUBLIC_API_URL;

export default axios.create({
  baseURL: BASER_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosAuth = axios.create({
  baseURL: BASER_URL,
  headers: { 'Content-Type': 'application/json' },
});
