import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="absolute bottom-0 left-0 p-4 bg-white">
        <div className="text-gray-500">
          <span className="logo text-sm">Block<span className="press">Press</span></span><span className="text-xs"> - Open Source Permissionless Publishing</span>
        </div>
        <div>
          <a href="/" className="font-poppins text-gray-500">Home</a> |
          <a href="https://github.com/jamesbachini/BlockPress" className="font-poppins text-gray-500"> Github</a> |
          <a href="/#/docs" className="font-poppins text-gray-500"> Docs</a> |
          <a href="/#/post" className="font-poppins text-gray-500"> Write</a> |
          <a href="/#/module" className="font-poppins text-gray-500"> Create</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
