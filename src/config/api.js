// Central API base URL — reads from env var, falls back to localhost for development
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_BASE;
