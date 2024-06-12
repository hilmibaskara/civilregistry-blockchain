import React, { useState } from 'react';

const MarriageCertificateForm: React.FC = () => {
  const [marriageData, setMarriageData] = useState({
    nik: '',
    marriageRegistrationNumber: '',
    fullName: '',
    birthPlace: '',
    birthDate: '',
    spouseName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarriageData({ ...marriageData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simpan data atau kirim ke backend
    console.log(marriageData);
  };

  const setDefaultValues = () => {
    setMarriageData({
      nik: '1234567890123456',
      marriageRegistrationNumber: 'MRN1234567890',
      fullName: 'John Doe',
      birthPlace: 'Jakarta',
      birthDate: '1990-01-01',
      spouseName: 'Jane Doe',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      {Object.keys(marriageData).map((key) => (
        <div key={key} className="mb-4">
          <label htmlFor={key} className="block text-sm font-medium text-gray-700">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={(marriageData as any)[key]}
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

export default MarriageCertificateForm;