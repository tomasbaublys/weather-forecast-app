import express from 'express';
import { getPlaces, getLongTermForecast, logCitySelected } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/places', getPlaces);
router.get('/places/:placeCode/forecasts/long-term', getLongTermForecast);
router.post('/log/city-selected', logCitySelected);

export default router;