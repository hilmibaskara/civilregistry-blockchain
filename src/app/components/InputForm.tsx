import React, { useState } from 'react';
import BirthCertificateForm from './BirthCertificateForm';
import MarriageCertificateForm from './MarriageCertificateForm';

const InputForm: React.FC = () => {
  const [formType, setFormType] = useState<'birth' | 'marriage' | null>(null);

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg justify-center">
      <h2 className="text-2xl font-bold mb-4 text-black">Input Data Akta</h2>
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
      {formType === 'birth' && <BirthCertificateForm />}
      {formType === 'marriage' && <MarriageCertificateForm />}
    </div>
  );
};

export default InputForm;
