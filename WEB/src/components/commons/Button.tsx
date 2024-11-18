import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
  type?: 'button' | 'submit';
  disabled?: boolean;  // Nova prop para controlar o estado de desabilitado
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type = 'button', disabled = false }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled} 
    >
      {text}
    </button>
  );
};

export default Button;


