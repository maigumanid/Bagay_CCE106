const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

// localhost supports Expo web on the API computer. Native devices should set
// EXPO_PUBLIC_API_URL in .env.local to the computer's reachable LAN URL.
export const API_BASE_URL = (configuredApiUrl || 'http://localhost:3000').replace(/\/+$/, '');

// Expected endpoints:
// POST /login
// GET /students
// GET /students/{id}
// GET /profile
