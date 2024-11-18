import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { getUser } from '../services/userService';
import InputField from '../components/commons/InputField';
import Button from '../components/commons/Button';
import { User } from '@types';
import { FormContainer, Form } from '../styles/home/form'; 

interface FormSearchProps {
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (param: string) => void;
}

const FormSearch: React.FC<FormSearchProps> = ({ searchParam, setSearchParam, onSearch }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  const { isError, isLoading } = useQuery(
    ['searchUser', searchParam],
    () => getUser(searchParam),
    {
      enabled: !!searchParam,
      onError: () => setError('Usuário não encontrado ou erro na busca.'),
      onSuccess: (data) => setUser(data),
    }
  );

  const handleSearch = () => {
    setError('');
    if (!searchParam) {
      setError('Por favor, insira um nome ou email.');
    } else {
      onSearch(searchParam);
    }
  };

  return (
    <FormContainer> {/* Usando o styled-component FormContainer */}
      <Form> {/* Usando o styled-component Form */}
        <header>
          <h1>Busca de Usuário</h1>
          <p>Pesquise um usuário por nome ou email.</p>
        </header>
        <InputField
          id="searchParam"
          name="searchParam"
          placeholder="Nome ou E-mail"
          icon={<RiSearchLine className="input-icon" />}
          type="text"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
        <Button type="button" onClick={handleSearch} text="Buscar" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {isLoading && <p>Carregando...</p>}
        {isError && <p style={{ color: 'red' }}>Erro na busca</p>}
        {user && (
          <div>
            <h3>Resultado:</h3>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Data de Nascimento:</strong> {user.birthDate}</p>
          </div>
        )}
      </Form>
    </FormContainer>
  );
};

export default FormSearch;









