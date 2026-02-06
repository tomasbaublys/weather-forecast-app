import { METEO_BASE_URL, fetchJson } from '../helper.js';
import db from '../db/sqlite.js';

export const getPlaces = async (req, res) => {
  try {
    const data = await fetchJson(`${METEO_BASE_URL}/places`);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'Unknown error' });
  }
};

export const getLongTermForecast = async (req, res) => {
  try {
    const { placeCode } = req.params;

    const data = await fetchJson(
      `${METEO_BASE_URL}/places/${encodeURIComponent(placeCode)}/forecasts/long-term`
    );

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'Unknown error' });
  }
};

export const logCitySelected = async (req, res) => {
  const { placeCode, placeName } = req.body ?? {};

  if (!placeCode || typeof placeCode !== 'string') {
    return res.status(400).json({ error: 'placeCode is required' });
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    null;

  const userAgent = req.headers['user-agent'] ?? null;

  const stmt = db.prepare(`
    INSERT INTO city_selections
    (place_code, place_name, ip, user_agent)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(placeCode, placeName ?? null, ip, userAgent);

  console.log(`[CITY_SELECTED][DB] ${placeName ?? '-'} (${placeCode})`);

  return res.status(200).json({ ok: true });
};