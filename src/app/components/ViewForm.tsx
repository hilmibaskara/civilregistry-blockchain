import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import CivilRegistry from '../../../build/contracts/CivilRegistry.json';
import { decrypt } from '../utils/AES';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}


const ViewForm: React.FC = () => {
  const [nik, setNik] = useState('');
  const [birthData, setBirthData] = useState<any>(null);
  const [marriageData, setMarriageData] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }

      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = CivilRegistry.networks[networkId];
      if (networkData) {
        const abi = CivilRegistry.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        setContract(contract);
      } else {
        window.alert('Smart contract not deployed to detected network.');
      }
    };

    loadBlockchainData();
  }, []);

  const fetchBirthCertificate = async () => {
    const data = await contract.methods.getBirthCertificate(nik).call();
    const decryptedData = {
      birthRegistrationNumber: decrypt(data.birthRegistrationNumber),
      fullName: decrypt(data.fullName),
      birthPlace: decrypt(data.birthPlace),
      birthDate: decrypt(data.birthDate),
      gender: decrypt(data.gender),
      fatherName: decrypt(data.fatherName),
      motherName: decrypt(data.motherName),
    };
    setBirthData(decryptedData);
  };

  const fetchMarriageCertificate = async () => {
    const data = await contract.methods.getMarriageCertificate(nik).call();
    const decryptedData = {
      ...data,
      marriageRegistrationNumber: decrypt(data.marriageRegistrationNumber),
      fullName: decrypt(data.fullName),
      birthPlace: decrypt(data.birthPlace),
      birthDate: decrypt(data.birthDate),
      spouseName: decrypt(data.spouseName)
    };
    setMarriageData(decryptedData);
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-black">
      <h2 className="text-2xl font-bold mb-4">Cek Data Akta</h2>
      <div className="mb-4">
        <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
          NIK
        </label>
        <input
          type="text"
          id="nik"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={fetchBirthCertificate}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Cek Akta Kelahiran
        </button>
        <button
          onClick={fetchMarriageCertificate}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Cek Akta Perkawinan
        </button>
      </div>
      {birthData && (
        <div className="mt-6 bg-white p-6 rounded shadow-md w-full max-w-lg text-black">
          <h3 className="text-xl font-bold mb-4">Data Akta Kelahiran</h3>
          {Object.entries(birthData).map(([key, value]) => (
            <div key={key} className="mb-2">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value as string}
            </div>
          ))}
        </div>
      )}
      {marriageData && (
        <div className="mt-6 bg-white p-6 rounded shadow-md w-full max-w-lg text-black">
          <h3 className="text-xl font-bold mb-4">Data Akta Perkawinan</h3>
          {Object.entries(marriageData).map(([key, value]) => (
            <div key={key} className="mb-2">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value as string}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewForm;
