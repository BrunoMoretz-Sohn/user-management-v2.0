import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

