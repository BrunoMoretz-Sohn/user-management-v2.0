import { useState } from 'react';
import { RiCalendar2Line, RiAccountBoxLine, RiAtLine } from "react-icons/ri";
import { useMutation } from 'react-query';
import { createUser } from '../services/userService';
import Button from '../components/commons/Button';
import InputField from '../components/commons/InputField';
import { z } from 'zod';
import { FormContainer, Form } from '../styles/home/form'; // Importando os estilos de form.ts

const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  birthDate: z.string().min(10, 'Data de nascimento é obrigatória'),
});

const FormRegister: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', birthDate: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { mutate: createUserMutation, isLoading } = useMutation(
    async (newUser: { name: string; email: string; birthDate: string }) => {
      return await createUser(newUser); 
    },
    {
      onSuccess: () => {
        setMessage('Usuário cadastrado com sucesso!');
        setFormData({ name: '', email: '', birthDate: '' });
      },
      onError: (err: any) => {
        setError(err.message || 'Erro ao cadastrar usuário.');
        if (err.message === 'E-mail já cadastrado') {
          alert('Este e-mail já está cadastrado. Tente com outro.');
        }
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (message) setMessage(''); 
  };

  const handleSubmit = () => {
    if (isLoading) return; 
    try {
      userSchema.parse(formData); 
      createUserMutation(formData); 
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map((err) => err.message).join(', ')); 
      }
    }
  };

  return (
    <FormContainer> {/* Usando o styled-component FormContainer */}
      <Form> {/* Usando o styled-component Form */}
        <header>
          <h1>Cadastro de Usuários</h1>
          <p>Preencha os campos abaixo para cadastrar um novo usuário.</p>
        </header>
        <InputField
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome"
          icon={<RiAccountBoxLine className="input-icon" />}
          type="text"
        />
        <InputField
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          icon={<RiAtLine className="input-icon" />}
          type="email"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <InputField
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          placeholder="Data de Nascimento"
          icon={<RiCalendar2Line className="input-icon" />}
          type="date"
        />
        <Button
          type="button"
          onClick={handleSubmit}
          text={isLoading ? 'Carregando...' : 'Cadastrar'}
          disabled={isLoading || !formData.name || !formData.email || !formData.birthDate} 
        />
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </Form>
    </FormContainer>
  );
};

export default FormRegister;
