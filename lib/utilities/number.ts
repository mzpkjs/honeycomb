export const clamp = (number: number, [ minimum, maximum ]: [ number, number ]) => {
  return number <= minimum
    ? minimum
    : number >= maximum
      ? maximum
      : number
}

export default {
  clamp
}