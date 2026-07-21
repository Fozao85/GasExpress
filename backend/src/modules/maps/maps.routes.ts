import { Router } from 'express';
import * as mapsController from './maps.controller';

export const mapsRouter = Router();

mapsRouter.get('/geocode', mapsController.geocode);
mapsRouter.get('/reverse-geocode', mapsController.reverseGeocode);
mapsRouter.get('/distance', mapsController.getDistance);
mapsRouter.get('/directions', mapsController.getDirections);
