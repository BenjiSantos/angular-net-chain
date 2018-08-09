pragma solidity ^0.4.22;

contract UserRegister {
        uint public employeeId;
        string public firstName;
        string public lastName;
        string public empCode;
        string public position;
        string public office;

        constructor(string initialUser) public {
            firstName = initialUser;
        }

        function setUser(uint _employeeId, string _firstName,
        string _lastName, string _empCode, string _position, string _office) public {
            employeeId = _employeeId;
            firstName = _firstName;
            lastName = _lastName;
            empCode = _empCode;
            position = _position;
            office = _office;
        }

}
