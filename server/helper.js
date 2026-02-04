export const METEO_BASE_URL = 'https://api.meteo.lt/v1';

export const fetchJson = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Meteo.lt request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
};