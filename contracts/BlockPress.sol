// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/*
 *  _____ _         _   _____                 
 * | __  | |___ ___| |_|  _  |___ ___ ___ ___ 
 * | __ -| | . |  _| '_|   __|  _| -_|_ -|_ -|
 * |_____|_|___|___|_,_|__|  |_| |___|___|___|
 *   Open Source Permissionless Publishing
*/

contract BlockPress {
    string public version = "0.1.3";

    struct Module {
        string slug;
        string title;
        string description;
        string format;
        string code;
    }

    struct Post {
        string slug;
        string title;
        string image;
        string format;
        string content;
    }

    mapping(string => Module) public modules;
    mapping(string => Post) public posts;
    string[] public moduleKeys;
    string[] public postKeys;
    uint public moduleCount;
    uint public postCount;

    function post(
        string memory _slug,
        string memory _title,
        string memory _image,
        string memory _format,
        string memory _content
    ) public {
        require(bytes(posts[_slug].slug).length == 0, "Slug already taken");
        require(bytes(_slug).length > 0, "Slug must not be empty");
        posts[_slug] = Post({
            slug: _slug,
            title: _title,
            image: _image,
            format: _format,
            content: _content
        });
        postKeys.push(_slug);
        postCount += 1;
    }

    function module(
        string memory _slug,
        string memory _title,
        string memory _description,
        string memory _format,
        string memory _code
    ) public {
        require(bytes(modules[_slug].slug).length == 0, "Slug already taken");
        require(bytes(_slug).length > 0, "Slug must not be empty");
        modules[_slug] = Module({
            slug: _slug,
            title: _title,
            description: _description,
            format: _format,
            code: _code
        });
        moduleKeys.push(_slug);
        moduleCount += 1;
    }

    function recentPosts(uint _count) public view returns (Post[] memory) {
        uint maxPosts = _count > postCount ? postCount : _count;
        Post[] memory recent = new Post[](maxPosts);
        for (uint i = 0; i < maxPosts; i++) {
            string memory slug = postKeys[postCount - 1 - i];
            recent[i] = posts[slug];
        }
        return recent;
    }
    
    function recentModules(uint _count) public view returns (Module[] memory) {
        uint maxModules = _count > moduleCount ? moduleCount : _count;
        Module[] memory recent = new Module[](maxModules);
        for (uint i = 0; i < maxModules; i++) {
            string memory slug = moduleKeys[moduleCount - 1 - i];
            recent[i] = modules[slug];
        }
        return recent;
    }
}
