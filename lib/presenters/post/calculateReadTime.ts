export const calculateReadTime = (markdownFileText: string) => {
  if (!markdownFileText) return NaN
  const words = markdownFileText
    .replace(/<\/?[^>]+(>|$)/g, ' ')
    .split(' ')
    .filter((e) => ![''].includes(e))
  return Math.round(words?.length / 200)
}
