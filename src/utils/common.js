export const getRandomFloat = (min, max) => {
  const rand = Math.random() * (max - min + 0.1);
  return rand.toFixed(1);
};

export const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
