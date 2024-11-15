// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract BlockPress {
    string public version = "0.0.1";

    mapping(string => string) public modules;
    mapping(string => string) public posts;

    string[] public postArray;
    uint public postCount;

    function post(string memory _key, string memory _value) public {
        require(bytes(posts[_key]).length == 0, "Key already taken");
        posts[_key] = _value;
        postArray[postCount] = _key;
        postCount += 1;
    }

    function module(string memory _key, string memory _value) public {
        require(bytes(modules[_key]).length == 0, "Key already taken");
        modules[_key] = _value;
    }


}
