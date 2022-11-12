export function twoDecimals(number: number) {
  if (number % 1 === 0) {
    return number;
  }

  return number.toFixed(2);
}
