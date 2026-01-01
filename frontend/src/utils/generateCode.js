export const generateUserCode = () => {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split('')
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .join('');
};

export const generatePrivateCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};
