import { Dish } from './types';
import rawProducts from '../data/products.json';

export const DISHES_DATA: Dish[] = (rawProducts as unknown) as Dish[];

export const DISH_MAP: Record<string, Dish> = {};
DISHES_DATA.forEach(d => {
  DISH_MAP[d.id] = d;
});

export function getDishById(id: string): Dish | undefined {
  return DISH_MAP[id];
}

// Backward-compatible alias
export const getProductById = getDishById;
