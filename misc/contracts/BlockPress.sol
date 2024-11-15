// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract BlockPress {
    string public version = "0.0.1";

    mapping(string => string) public data;

    function store(string memory _key, string memory _value) public {
        require(bytes(data[_key]).length == 0, "Key already taken");
        data[_key] = _value;
    }

    function fetch(string memory _key) public view returns (string memory) {
        return data[_key];
    }
}
