/**
 * Move the comma of the decimal number by the given offset
 * @param {number} n
 * @param {number} offset
 */
export function shiftDecimal(n: number, offset: number) {
  const naturalNumberLength = n.toString().indexOf(".") - offset + 1;
  return n/Math.pow(10, naturalNumberLength);
}
