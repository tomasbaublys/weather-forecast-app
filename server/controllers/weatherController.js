import { METEO_BASE_URL, fetchJson } from '../helper.js';

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
  const { placeCode, placeName } = req.body || {};
  const when = new Date().toISOString();

  console.log(`[CITY_SELECTED] ${when} | ${placeName ?? '-'} (${placeCode ?? '-'})`);

  return res.status(200).json({ ok: true });
};