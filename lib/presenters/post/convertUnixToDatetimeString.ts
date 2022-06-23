export const convertUnixToDatetimeSting = (unix: number) => {
  return new Date(unix * 1000).toDateString()
}
