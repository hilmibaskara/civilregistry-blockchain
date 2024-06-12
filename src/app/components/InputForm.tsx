import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import CivilRegistry from '../../../build/contracts/CivilRegistry.json';
import BirthCertificateForm from './BirthCertificateForm';
import MarriageCertificateForm from './MarriageCertificateForm';
import { Networks } from '../types/ContractTypes';
import { encrypt } from '../utils/AES';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const InputForm: React.FC = () => {
  const [formType, setFormType] = useState<'birth' | 'marriage' | null>(null);
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

  const addBirthCertificate = async (birthData: any) => {
    const encryptedData = {
      birthRegistrationNumber: encrypt(birthData.birthRegistrationNumber),
      fullName: encrypt(birthData.fullName),
      birthPlace: encrypt(birthData.birthPlace),
      birthDate: encrypt(birthData.birthDate),
      gender: encrypt(birthData.gender),
      fatherName: encrypt(birthData.fatherName),
      motherName: encrypt(birthData.motherName),
    };

    console.log(encryptedData);
    
    await contract.methods
      .addBirthCertificate(
        birthData.nik,
        encryptedData.birthRegistrationNumber,
        encryptedData.fullName,
        encryptedData.birthPlace,
        encryptedData.birthDate,
        encryptedData.gender,
        encryptedData.fatherName,
        encryptedData.motherName
      )
      .send({ from: account });
  };

  const addMarriageCertificate = async (marriageData: any) => {
    const encryptedData = {
      marriageRegistrationNumber: encrypt(marriageData.marriageRegistrationNumber),
      fullName: encrypt(marriageData.fullName),
      birthPlace: encrypt(marriageData.birthPlace),
      birthDate: encrypt(marriageData.birthDate),
      spouseName: encrypt(marriageData.spouseName)
    };
    
    await contract.methods
      .addMarriageCertificate(
        marriageData.nik,
        encryptedData.marriageRegistrationNumber,
        encryptedData.fullName,
        encryptedData.birthPlace,
        encryptedData.birthDate,
        encryptedData.spouseName
      )
      .send({ from: account });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Input Data Akta</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setFormType('birth')}
          className={`py-2 px-4 rounded ${formType === 'birth' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Akta Kelahiran
        </button>
        <button
          onClick={() => setFormType('marriage')}
          className={`py-2 px-4 rounded ${formType === 'marriage' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Akta Perkawinan
        </button>
      </div>
      {formType === 'birth' && <BirthCertificateForm onSubmit={addBirthCertificate} />}
      {formType === 'marriage' && <MarriageCertificateForm onSubmit={addMarriageCertificate} />}
    </div>
  );
};

export default InputForm;
