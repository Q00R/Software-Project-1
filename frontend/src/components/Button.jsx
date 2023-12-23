import React from 'react';

const FancyButton = () => {
  return (
    
    <button class="w-40 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out">
    <span class="font-medium text-[#333] group-hover:text-white">Hover me</span>
   </button>
  );
};

export default FancyButton;

{/*<button 
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '30px',
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease 0s',
        color: '#fff',
        backgroundColor: '#2D9CDB'
      }}
      onClick={() => alert('Button clicked!')}
    >
      Click me
    </button>*/}