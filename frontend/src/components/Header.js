import React from 'react';

const Header = () => {
  return (
    <div>
      <header className="absolute top-0 left-0 right-0 p-4">
        <a href="/">
          <div className="logo absolute left-0 p-4 text-2xl">
            Block<span className="press">Press</span>
          </div>
        </a>
        <div className="absolute right-0 p-4">
        <a href="/#/post" className="font-poppins text-gray-500">✒️ Write</a>
        <a href="/#/module" className="ml-10 font-poppins text-gray-500">⚒️ Create</a>
        </div>
      </header>
    </div>
  );
};

export default Header;
