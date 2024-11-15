// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract BlockPress {
    string public version = "0.0.1";

    mapping(string => string) public modules;
    mapping(string => string) public posts;

    string[] public postKeys;
    uint public postCount;

    function post(string memory _key, string memory _value) public {
        require(bytes(posts[_key]).length == 0, "Key already taken");
        posts[_key] = _value;
        postKeys.push(_key);
        postCount += 1;
    }

    function module(string memory _key, string memory _value) public {
        require(bytes(modules[_key]).length == 0, "Key already taken");
        modules[_key] = _value;
    }

    function recentPosts(uint _count) public view returns (string[] memory) {
        uint maxPosts = _count > postCount ? postCount : _count;
        uint arraySize = maxPosts * 2;
        string[] memory recent = new string[](arraySize);
        for (uint i = 0; i < maxPosts; i++) {
            uint index = (maxPosts - 1 - i) * 2;
            recent[index] = postKeys[postCount - 1 - i];
            recent[index + 1] = posts[postKeys[postCount - 1 - i]];
        }
        return recent;
    }

}
