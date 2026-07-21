import { Request, Response, NextFunction } from 'express';
import * as mapsService from './maps.service';
import {
  geocodeQuerySchema,
  reverseGeocodeQuerySchema,
  distanceQuerySchema,
  directionsQuerySchema,
} from './maps.validation';
import { ValidationError } from '../../common/exceptions/app-error';

function parseLatLng(value: string): { lat: number; lng: number } {
  const parts = value.split(',').map((s) => parseFloat(s.trim()));
  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) {
    throw new ValidationError([
      { field: 'coordinates', message: 'Invalid coordinates format. Use lat,lng' },
    ]);
  }
  return { lat: parts[0], lng: parts[1] };
}

function validate(schema: any, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e: any) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    throw new ValidationError(errors);
  }
  return result.data;
}

export async function geocode(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = validate(geocodeQuerySchema, { query: req.query });
    const results = await mapsService.geocode(query.q);
    res.json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
}

export async function reverseGeocode(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = validate(reverseGeocodeQuerySchema, { query: req.query });
    const result = await mapsService.reverseGeocode(query.lat, query.lng);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getDistance(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = validate(distanceQuerySchema, { query: req.query });
    const origin = parseLatLng(query.origin);
    const dest = parseLatLng(query.destination);
    const result = await mapsService.getDistance(origin.lat, origin.lng, dest.lat, dest.lng);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getDirections(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = validate(directionsQuerySchema, { query: req.query });
    const origin = parseLatLng(query.origin);
    const dest = parseLatLng(query.destination);
    const result = await mapsService.getDirections(origin.lat, origin.lng, dest.lat, dest.lng);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
