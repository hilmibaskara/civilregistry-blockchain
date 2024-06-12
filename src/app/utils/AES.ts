import CryptoJS from 'crypto-js';

const SECRET_KEY = 'kunci-rahasia'; // Gantilah dengan kunci rahasia Anda

// Fungsi untuk mengenkripsi teks
export const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

// Fungsi untuk mendekripsi teks
export const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};