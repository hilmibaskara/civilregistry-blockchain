import React, { useState } from 'react';

interface Props {
  onSubmit: (data: any) => void;
}

const MarriageCertificateForm: React.FC<Props> = ({ onSubmit }) => {
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
    onSubmit(marriageData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Input Akta Perkawinan</h2>
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default MarriageCertificateForm;
