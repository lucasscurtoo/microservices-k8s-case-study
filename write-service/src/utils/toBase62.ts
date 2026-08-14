const alphabet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const toBase62 = (incr: number) => {
  let shortCode = '';
  let n = incr;

  do {
    const remainder = n % alphabet.length;
    shortCode = alphabet[remainder] + shortCode;
    n = Math.floor(n / alphabet.length);
  } while (n != 0);

  return shortCode;
};
