"use client"
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ViewForm from './components/ViewForm';

const Home: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<'input' | 'view' | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <h1 className="text-4xl font-bold mb-6">Sistem Pencatatan Sipil</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSelectedForm('input')}
          className={`py-2 px-4 rounded ${selectedForm === 'input' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Input Akta
        </button>
        <button
          onClick={() => setSelectedForm('view')}
          className={`py-2 px-4 rounded ${selectedForm === 'view' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Cek Akta
        </button>
      </div>
      <div className="w-full max-w-4xl">
        {selectedForm === 'input' && <InputForm />}
        {selectedForm === 'view' && <ViewForm />}
      </div>
    </div>
  );
};

export default Home;
