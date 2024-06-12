import React, { useState } from 'react';
import { encrypt, decrypt } from '@/app/utils/AES';

const BirthCertificateForm: React.FC = () => {
  const [birthData, setBirthData] = useState({
    nik: '',
    birthRegistrationNumber: '',
    fullName: '',
    birthPlace: '',
    birthDate: '',
    gender: '',
    fatherName: '',
    motherName: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthData({ ...birthData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encrypted_birthData = encrypt(JSON.stringify(birthData));
    const decrypted_birthData = decrypt(encrypted_birthData);
    console.log(encrypted_birthData);
    console.log(decrypted_birthData);
  };

  const setDefaultValues = () => {
    setBirthData({
      nik: '1234567890123456',
      birthRegistrationNumber: 'BRN1234567890',
      fullName: 'John Doe',
      birthPlace: 'Jakarta',
      birthDate: '1990-01-01',
      gender: 'Male',
      fatherName: 'Father Name',
      motherName: 'Mother Name',
      address: '123 Main St, Jakarta',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      {Object.keys(birthData).map((key) => (
        <div key={key} className="mb-4">
          <label htmlFor={key} className="block text-sm font-medium text-gray-700">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={(birthData as any)[key]}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
        Submit
      </button>
      <button type="button" onClick={setDefaultValues} className="bg-gray-500 text-white py-2 px-4 rounded">
        Set Default Values
      </button>
    </form>
  );
};

export default BirthCertificateForm;