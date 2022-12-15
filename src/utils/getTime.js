export const getCorrectTime = (date) =>
  `${date.getDate()}.${date.getUTCMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
