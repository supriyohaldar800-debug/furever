import axios from 'axios';

const appwriteClient = axios.create({
  baseURL: 'https://cloud.appwrite.io/v1', // Or 'http://localhost/v1' for self-hosted
  headers: {
    'X-Appwrite-Project': '68bfcb1000205e7ebf41', // Replace with your Appwrite Project ID
    'X-Appwrite-Key': import.meta.env.VITE_API_KEY, // Replace with your API Key (server-side use only)
    'Content-Type': 'application/json',
  },
});

export default appwriteClient;