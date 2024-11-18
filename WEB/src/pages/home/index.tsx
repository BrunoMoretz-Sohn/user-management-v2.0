import { useState, useEffect } from 'react';
import FormRegister from '../../components/FormRegister';
import FormSearch from '../../components/FormSearch';
import FormEdit from '../../components/FormEdit';
import dayjs from 'dayjs';
import { TbUserEdit, TbTrash } from 'react-icons/tb';
import Logo from '../../assets/Logo.png';
import { useUserActions } from '../../hooks/useUserActions';
import { User } from '@types';
import GlobalStyles from '../../styles/home/global';

const { Container, ImgLogo, Heading, Title, Paragraph } = GlobalStyles;


function Home(): JSX.Element {
  const [searchParam, setSearchParam] = useState<string>('');
  const { users, userToEdit, createUserMutation, updateUserMutation, deleteUserMutation } = useUserActions();

  useEffect(() => {
    if (createUserMutation.isSuccess) {
      createUserMutation.reset();
    }
  }, [createUserMutation]);

  const handleCreateUser = async (
    name: string,
    email: string,
    birthDate: string
  ): Promise<void> => {
    try {
      await createUserMutation.mutateAsync({ name, email, birthDate });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  const handleGetUser = (param: string): User[] => {
    setSearchParam(param);
    return users.filter(
      (user: User) =>
        user.name.toLowerCase().includes(param.toLowerCase()) ||
        user.email.toLowerCase().includes(param.toLowerCase())
    );
  };

  const handleUpdateUser = async (user: User | null): Promise<void> => {
    if (user) {
      await updateUserMutation.mutateAsync(user);
    }
  };

  const handleDeleteUser = async (id: string): Promise<void> => {
    await deleteUserMutation.mutateAsync(id);
  };

  return (
    <Container>
      <ImgLogo>
        <img src={Logo} alt="Logo" className="Logo" title="User Management Logo" />
        <Heading>USER MANAGEMENT</Heading>
      </ImgLogo>

      <Title>Gerenciamento de Usuários</Title>
      <Paragraph>
        Utilize o sistema para buscar usuários, cadastrar novos perfis e gerenciar informações.
      </Paragraph>

      <div className="form-container">
        <FormRegister onSubmit={handleCreateUser} />
        <FormSearch searchParam={searchParam} setSearchParam={setSearchParam} onSearch={handleGetUser} />
        {userToEdit && (
          <FormEdit
            user={userToEdit}
            onSave={handleUpdateUser}
            onCancel={() => handleUpdateUser(null)}
          />
        )}
      </div>

      <div className="users-container">
        <header>
          <h2>Perfis Ativos</h2>
          <p>Utilize as opções de edição e exclusão para gerenciar os dados.</p>
        </header>
        <div className="users-list">
          {users.length > 0 ? (
            users.map((user: User) => (
              <div key={user.id} className="card">
                <div>
                  <p>Nome: <span>{user.name}</span></p>
                  <p>Email: <span>{user.email}</span></p>
                  <p>Data de Nascimento: <span>{dayjs(user.birthDate).format('DD-MM-YYYY')}</span></p>
                  <p>ID: <span>{user.id}</span></p>
                </div>
                <div className="user-button">
                  <button onClick={() => handleUpdateUser(user)}>
                    <TbUserEdit id="edit-icon" className="user-icon" />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <TbTrash id="delete-icon" className="user-icon" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Home;










