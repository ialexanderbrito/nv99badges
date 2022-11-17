export function formatMillions(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + ' mi';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' mil';
  }
  return num;
}
