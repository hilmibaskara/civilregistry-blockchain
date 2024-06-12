// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CivilRegistry {
    struct BirthCertificate {
        string birthRegistrationNumber;
        string fullName;
        string birthPlace;
        string birthDate;
        string gender;
        string fatherName;
        string motherName;
    }

    struct MarriageCertificate {
        string marriageRegistrationNumber;
        string fullName;
        string birthPlace;
        string birthDate;
        string spouseName;
    }

    mapping(string => BirthCertificate) public birthCertificates;
    mapping(string => MarriageCertificate) public marriageCertificates;

    function addBirthCertificate(
        string memory _nik,
        string memory _birthRegistrationNumber,
        string memory _fullName,
        string memory _birthPlace,
        string memory _birthDate,
        string memory _gender,
        string memory _fatherName,
        string memory _motherName
    ) public {
        birthCertificates[_nik] = BirthCertificate(
            _birthRegistrationNumber,
            _fullName,
            _birthPlace,
            _birthDate,
            _gender,
            _fatherName,
            _motherName
        );
    }

    function addMarriageCertificate(
        string memory _nik,
        string memory _marriageRegistrationNumber,
        string memory _fullName,
        string memory _birthPlace,
        string memory _birthDate,
        string memory _spouseName
    ) public {
        marriageCertificates[_nik] = MarriageCertificate(
            _marriageRegistrationNumber,
            _fullName,
            _birthPlace,
            _birthDate,
            _spouseName
        );
    }

    function getBirthCertificate(string memory _nik)
        public
        view
        returns (BirthCertificate memory)
    {
        return birthCertificates[_nik];
    }

    function getMarriageCertificate(string memory _nik)
        public
        view
        returns (MarriageCertificate memory)
    {
        return marriageCertificates[_nik];
    }
}
