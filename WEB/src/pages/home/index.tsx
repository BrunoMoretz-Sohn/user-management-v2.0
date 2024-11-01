import { useState, useEffect } from 'react';
import { getUsers, createUser, getUser, updateUser, deleteUser, User } from '../../services/userService';
import FormRegister from '../../components/FormRegister';
import FormSearch from '../../components/FormSearch';
import FormEdit from '../../components/FormEdit';
import dayjs from 'dayjs';
import { TbUserEdit, TbTrash } from 'react-icons/tb';
import Logo from '../../assets/Logo.png';

function Home(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [searchParam, setSearchParam] = useState<string>('');
  const [editName, setEditName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editBirthDate, setEditBirthDate] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await getUsers();
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao buscar usuários. Tente novamente mais tarde.');
      }
    }
    fetchData();
  }, []);

  const handleCreateUser = async (name: string, email: string, birthDate: string) => {
    try {
      await createUser(name, email, birthDate);
      const usersData = await getUsers();
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário. Tente novamente.');
    }
  };

  const handleGetUser = async () => {
    try {
      const user = await getUser(searchParam);
      if (user) {
        setUsers([user]);
        setUserToEdit(user);
        setEditName(user.name);
        setEditEmail(user.email);
        setEditBirthDate(dayjs(user.birthDate).format('YYYY-MM-DD'));
      } else {
        setUsers([]);
        setUserToEdit(null);
        alert('Nenhum usuário encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      alert('Erro ao buscar usuário. Verifique os dados e tente novamente.');
    }
  };

  const handleUpdateUser = async () => {
    if (userToEdit) {
      try {
        await updateUser(userToEdit.id, editName, editEmail, editBirthDate);
        const usersData = await getUsers();
        setUsers(Array.isArray(usersData) ? usersData : []);
        setUserToEdit(null);
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        alert('Erro ao atualizar usuário. Tente novamente.');
      }
    }
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditBirthDate(dayjs(user.birthDate).format('YYYY-MM-DD'));
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      const usersData = await getUsers();
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário. Tente novamente.');
    }
  };

  return (
    <>
      <div className='img-logo'>
        <img src={Logo} alt="Logo" className='Logo' title="User Management Logo" />
        <h3>USER MANAGEMENT</h3>
      </div>
      <div className='container'>
        <div className='form-container'>
          <FormRegister onSubmit={handleCreateUser} />
          <FormSearch searchParam={searchParam} setSearchParam={setSearchParam} onSearch={handleGetUser} />
          {userToEdit && (
            <FormEdit
              user={userToEdit}
              editName={editName}
              setEditName={setEditName}
              editEmail={editEmail}
              setEditEmail={setEditEmail}
              editBirthDate={editBirthDate}
              setEditBirthDate={setEditBirthDate}
              onSave={handleUpdateUser}
              onCancel={() => setUserToEdit(null)}
            />
          )}
        </div>
        <div className='users-container'>
          <div className="intro-container">
            <div className="intro-text">
              <h4>Utilize o sistema para buscar usuários, cadastrar novos perfis e gerenciar informações.</h4>
              <p>A função de busca permite localizar rapidamente um usuário, enquanto o cadastro e a edição facilitam a atualização de dados conforme necessário.</p>
            </div>
            <img src={Logo} alt="Logo-intro" className='Logo-intro' title="Main Logo" />
          </div>
          <div className='list-container'>
            <header>
              <h2>Perfis Ativos</h2>
              <p>Utilize as opções de edição e exclusão para gerenciar os dados.</p>
            </header>
            <div className='users-list'>
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user.id} className="card">
                    <div>
                      <p>Nome: <span>{user.name}</span></p>
                      <p>Email: <span>{user.email}</span></p>
                      <p>Data de Nascimento: <span>{dayjs(user.birthDate).format('DD-MM-YYYY')}</span></p>
                      <p>ID: <span>{user.id}</span></p>
                    </div>
                    <div className="user-button">
                      <button onClick={() => handleEditUser(user)}>
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
        </div>
      </div>
    </>
  );
}

export default Home;

