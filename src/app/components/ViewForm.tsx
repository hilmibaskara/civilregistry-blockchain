import React, { useState } from 'react';
import { decrypt } from '../utils/AES';

const ViewForm: React.FC = () => {
  const [nik, setNik] = useState('');
  const [birthData, setBirthData] = useState<any>(null);
  const [marriageData, setMarriageData] = useState<any>(null);
  const [message, setMessage] = useState('');

  const handleFetch = async () => {
    // Reset state
    setBirthData(null);
    setMarriageData(null);
    setMessage('');

    // Simulate fetching data from the backend
    const fetchedBirthData = nik === '1234567890' ? "U2FsdGVkX18u/u/pzmKSrip+XvMC97l+AQY4rS6DfhnGs2oiwjKgR0UMq3p8EjKoEAlWnbL3qaAaiplOhsttOKbnCMCG92WqELG+1oTtyxIzWem5GBT9PW2EsCP7S/L+oaG0kOHKHnVFkz45RItHy1YRLPSUfdVwloyVm3xqFmm6nJroouDPnXE5i4gzdghuAP7tVQP3ks33zOClPOzk3+ehrWbG6tyvA+E1g0BPB2GJDKfaPXQDq6Ml5GG3eRcYyXu5pmcXJLnWicpkBzTXywHDH4IxL1X2CdsDSrvy/Ex5l1rHw/Kp99tTVdOa1MxdSbLpGjd5WRG1laVicDHf9GcfmeEB3Pj/G7pJ7yrnmXs="
    : null;

    const fetchedMarriageData = nik === '1234567890' ? {
      nik: '1234567890',
      marriageRegistrationNumber: 'MRN123456',
      fullName: 'John Doe',
      birthPlace: 'Jakarta',
      birthDate: '2000-01-01',
      spouseName: 'Jane Doe',
    } : null;

    // Update state based on fetched data
    if (fetchedBirthData && fetchedMarriageData) {
      setBirthData(JSON.parse(decrypt(fetchedBirthData)));
      setMarriageData(fetchedMarriageData);
    } else if (fetchedBirthData) {
      setBirthData(fetchedBirthData);
    } else if (fetchedMarriageData) {
      setMarriageData(fetchedMarriageData);
    } else {
      setMessage('NIK tidak memiliki data catatan sipil!');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Cek Akta</h2>
      <div className="mb-4">
        <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
          NIK
        </label>
        <input
          type="text"
          id="nik"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
        />
      </div>
      <button onClick={handleFetch} className="bg-blue-500 text-white py-2 px-4 rounded">
        Fetch Data
      </button>

      {message && <div className="mt-6 text-red-500">{message}</div>}

      {birthData && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-black">Data Akta Kelahiran</h3>
          {Object.entries(birthData).map(([key, value]) => (
            <div key={key} className="mb-2 text-black">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value as string}
            </div>
          ))}
        </div>
      )}

      {marriageData && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-black">Data Akta Pernikahan</h3>
          {Object.entries(marriageData).map(([key, value]) => (
            <div key={key} className="mb-2 text-black">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value as string}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewForm;