# Civil Registry Blockchain with AES

## Overview Proyek
Proyek ini adalah sistem registrasi sipil menggunakan teknologi blockchain yang aman dari manipulasi dan enkripsi AES sebagai perlindungan data. Sistem ini menyimpan data pribadi seperti akta kelahiran dan akta nikah. Pengguna dapat memasukkan dan memeriksa akta kelahiran dan akta nikah dengan aman pada jaringan blockchain.

## Kreator Proyek
18221072 - Hilmi Baskara Radanto

## Fitur
- Pengguna dapat melakukan input data akta kelahiran dan akta perkawinan
- Pengguna dapat melihat data yang sudah diinput berdasarkan NIK

## Technologies yang Digunakan
- **Frontend:** Next.js, Tailwind CSS
- **Blockchain:** Ethereum, Truffle
- **Smart Contracts:** Solidity
- **Cryptography Algorithm:** AES (Advanced Encryption Standard)

## Deployment
### Website Deployment
https://civilregistry-blockchain.vercel.app/

### Blockchain Deployment
https://sepolia.etherscan.io/address/0x989B1A6A4Fadb97cb83300F7Aa891a1Ab755d457

## Cara Menggunakan
1. **Buat Wallet Crypto** 
2. **Gunakan Jaringan Sepolia Testnet**
3. **Masukkan Sertifikat:** Buka halaman input dan isi informasi yang diperlukan untuk akta kelahiran atau akta nikah.
4. **Periksa Sertifikat:** Gunakan fungsi pencarian untuk memverifikasi keaslian sertifikat.

## Cara Menjalankan Secara Lokal
Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1. **Clone repository:**
    ```sh
    git clone https://github.com/hilmibaskara/civilregistry-blockchain
    cd civilregistry-blockchain-master
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Compile smart contracts:**
    ```sh
    truffle compile
    ```

4. **Deploy smart contracts:**
    ```sh
    truffle migrate --network sepolia
    ```

5. **Jalankan development server:**
    ```sh
    npm run dev
    ```

6. **Akses website:**
    - Buka browser Anda dan navigasi ke `http://localhost:3000`

## Makalah
Makalah dapat diakses pada link 