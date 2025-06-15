export function checkString(v: string): boolean {
  return /(^|\s)(test|테스트)(\s|$)/i.test(v);
}
