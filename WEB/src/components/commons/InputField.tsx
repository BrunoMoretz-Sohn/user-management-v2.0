import React, { RefObject } from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  type: string;
  inputRef?: RefObject<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  icon,
  type,
  inputRef
}) => {
  return (
    <div className="input-container">
      {icon}
      <input 
        id={id} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        type={type}
        ref={inputRef}
        autoComplete="off"
      />
    </div>
  );
};

export default InputField;



