import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="absolute bottom-0 p-4 bg-white">
        <a href="https://github.com/jamesbachini/BlockPress" className="font-poppins text-gray-500">Github</a> |
        <a href="/#/docs" className="font-poppins text-gray-500"> Docs</a> |
        <a href="/#/post" className="font-poppins text-gray-500"> Write</a> |
        <a href="/#/module" className="font-poppins text-gray-500"> Create</a>
      </footer>
    </div>
  );
};

export default Footer;
