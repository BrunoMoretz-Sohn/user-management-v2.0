import '../pages/home/style.css';
import { useRef, useState } from 'react';
import { RiCalendar2Line, RiAccountBoxLine, RiAtLine } from "react-icons/ri";
import Button from '../components/commons/Button';
import InputField from '../components/commons/InputField';

interface FormRegisterProps {
  onSubmit: (name: string, email: string, birthDate: string) => void;
}

const FormRegister: React.FC<FormRegisterProps> = ({ onSubmit }) => {
  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputBirthDate = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => email.includes('@');

  const handleSubmit = () => {
    const name = inputName.current?.value || '';
    const email = inputEmail.current?.value || '';
    const birthDate = inputBirthDate.current?.value || '';

    if (!validateEmail(email)) {
      setError('Digite um email válido!');
      return;
    }

    onSubmit(name, email, birthDate);
    setMessage('Usuário cadastrado com sucesso!');
    setError('');

    if (inputName.current) inputName.current.value = '';
    if (inputEmail.current) inputEmail.current.value = '';
    if (inputBirthDate.current) inputBirthDate.current.value = '';

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <form>
      <header>
        <h1>Cadastro de Usuários</h1>
        <p>Preencha os campos abaixo para cadastrar um novo usuário.</p>
      </header>
      <InputField
        id="name"
        name="name"
        placeholder="Nome"
        icon={<RiAccountBoxLine className="input-icon" />}
        type="text"
        inputRef={inputName}
      />
      <InputField
        id="email"
        name="email"
        placeholder="Email"
        icon={<RiAtLine className="input-icon" />}
        type="email"
        inputRef={inputEmail}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InputField
        id="birthDate"
        name="birthDate"
        placeholder="Data de Nascimento"
        icon={<RiCalendar2Line className="input-icon" />}
        type="date"
        inputRef={inputBirthDate}
      />
      <Button type="button" onClick={handleSubmit} text="Cadastrar" />
      {message && <p>{message}</p>}
    </form>
  );
};

export default FormRegister;



