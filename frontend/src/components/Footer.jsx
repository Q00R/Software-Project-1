import React from 'react';
import logo1 from '../assets/'; // replace with the actual paths to your logo files
import logo2 from '../assets/';
// ... import the rest of your logos

const Footer = () => {
  const logos = [
    { src: logo1, link: 'http://link-to-logo1.com' },
    { src: logo2, link: 'http://link-to-logo2.com' },
    // ... the rest of your logos
  ];

  return (
    <footer className='bg-black text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex space-x-4'>
          {logos.map((logo, index) => (
            <a key={index} href={logo.link}>
              <img src={logo.src} alt={`logo ${index + 1}`} width={50} height={50} />
            </a>
          ))}
        </div>
        <p className='text-sm'>
          Some text goes here.
        </p>
      </div>
    </footer>
  );
};

export default Footer;