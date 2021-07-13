const base32chars = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r',
  't', 'u', 'v', 'w', 'x', 'y', '0', '1',
  '2', '3', '4', '5', '6', '7', '8', '9',
];

export function randomReference() {
  const randChar = () => base32chars[Math.floor(Math.random() * base32chars.length)];
  return Array.from({ length: parseInt(process.env.REFERENCE_LENGTH) }, randChar).join('');
}

// TODO: sanitizeReference - clean and correct to the base32chars
