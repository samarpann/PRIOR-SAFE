// Central API base URL — reads from env var, falls back to localhost for development
const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;
