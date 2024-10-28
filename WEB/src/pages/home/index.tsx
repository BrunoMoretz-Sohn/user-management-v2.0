import { useState, useEffect } from 'react';
import { getUsers, createUser, getUser, updateUser, deleteUser } from '../../services/userService';
import FormRegister from '../../components/FormRegister';
import FormSearch from '../../components/FormSearch';
import FormEdit from '../../components/FormEdit';
import dayjs from 'dayjs';
import { TbUserEdit, TbTrash } from 'react-icons/tb';
import Logo from '../../assets/Logo.png';

function Home(): JSX.Element {
  const [users, setUsers] = useState<any[]>([]);
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [searchParam, setSearchParam] = useState<string>('');
  const [editName, setEditName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editBirthDate, setEditBirthDate] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const usersData = await getUsers();
      setUsers(usersData);
    }
    fetchData();
  }, []);

  const handleCreateUser = async (name: string, email: string, birthDate: string) => {
    await createUser(name, email, birthDate);
    const usersData = await getUsers();
    setUsers(usersData);
  };

  const handleGetUser = async () => {
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
  };

  const handleUpdateUser = async () => {
    if (userToEdit) {
      await updateUser(userToEdit.id, editName, editEmail, editBirthDate);
      const usersData = await getUsers();
      setUsers(usersData);
      setUserToEdit(null);
    }
  };

  const handleEditUser = (user: any) => {
    setUserToEdit(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditBirthDate(dayjs(user.birthDate).format('YYYY-MM-DD'));
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
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
              {users.map((user) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
