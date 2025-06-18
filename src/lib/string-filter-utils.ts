export function checkString(v: string | null | undefined): boolean {
  const safeValue = v ?? '';
  return /(?:^|\s)(test|테스트)\w*/i.test(safeValue);
}
