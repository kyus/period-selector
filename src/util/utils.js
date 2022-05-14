export const dateForm = (date, format) => {
  const Y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const H = date.getHours();
  const i = date.getMinutes();
  return format.replace('Y', Y)
    .replace('m', m)
    .replace('d', d)
    .replace('H', H)
    .replace('i', i)
}
