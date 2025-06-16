export function checkString(v: string): boolean {
  return /(?:^|\s)(test|테스트)\w*/i.test(v);
}
