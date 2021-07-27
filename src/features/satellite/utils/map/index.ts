import {shiftDecimal} from "utils/math/number";

/**
 * Parses large numbers to acceptable numbers for MapBoxGL (min: -90, max: 90)
 * @param x
 * @param y
 */
export function parseLngLat(x: number, y: number): { lng: number, lat: number } {
  const shiftThreeDecimal = (n: number) => shiftDecimal(n, 2);
  return {lat: shiftThreeDecimal(x), lng: shiftThreeDecimal(y)};
}
