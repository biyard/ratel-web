//TODO: This regex does not detect the string 'ATEST'.
// Please check this is the intended behavior.
export function checkString(v: string | null | undefined): boolean {
  const safeValue = v ?? '';
  return /(test|테스트)/i.test(safeValue);
}

export function validateString(v: string | null | undefined): boolean {
  const safeValue = v ?? '';
  return !/(test|테스트)/i.test(safeValue);
}
