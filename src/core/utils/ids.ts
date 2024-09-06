export function cuidToHumanReadableId(cuidString: string): string {
  const ID_LENGTH = 7
  if (cuidString.length < ID_LENGTH) {
    throw new Error('Cannot shorten an invalid cuid')
  }
  return cuidString.slice(-ID_LENGTH).toUpperCase()
}
