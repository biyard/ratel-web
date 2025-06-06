export function checkLowerAlphaNumeric(str: string): boolean {
  return /^[a-z0-9_-]+$/.test(str);
}
