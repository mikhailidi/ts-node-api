export const objectKeysEmpty = (obj: Object): boolean => {
  return !Object.values(obj).some(e => Boolean(e));
}
