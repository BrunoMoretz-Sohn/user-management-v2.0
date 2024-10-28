import '../pages/home/style.css';
import { useState } from 'react';
import { RiCalendar2Line, RiAccountBoxLine, RiAtLine } from "react-icons/ri";
import { deleteUser } from '../services/userService';

interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
}

interface FormEditProps {
  user: User;
  editName: string;
  setEditName: (name: string) => void;
  editEmail: string;
  setEditEmail: (email: string) => void;
  editBirthDate: string;
  setEditBirthDate: (birthDate: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const FormEdit: React.FC<FormEditProps> = ({
  user,
  editName,
  setEditName,
  editEmail,
  setEditEmail,
  editBirthDate,
  setEditBirthDate,
  onSave,
  onCancel,
}) => {
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    const confirmation = window.confirm('Tem certeza que deseja excluir esse cadastro?');
    if (confirmation) {
      await deleteUser(user.id);
      setMessage('Exclusão efetuada com sucesso!');
    }
  };

  return (
    <form className="edit-form">
      <header>
        <h1>Editar Usuário</h1>
        <p>Confirme as alterações clicando em &quot;Atualizar&quot;.</p>
      </header>
      <div className="input-container">
        <RiAccountBoxLine className="input-icon" />
        <input
          type='text'
          id="editName"
          name="editName"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder='Nome'
        />
      </div>
      <div className="input-container">
        <RiAtLine className="input-icon" />
        <input
          type='email'
          id="editEmail"
          name="editEmail"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
          placeholder='Email'
        />
      </div>
      <div className="input-container">
        <RiCalendar2Line className="input-icon" />
        <input
          type='date'
          id="editBirthDate"
          name="editBirthDate"
          value={editBirthDate}
          onChange={(e) => setEditBirthDate(e.target.value)}
          placeholder='Data de Nascimento'
        />
      </div>
      <button type='button' onClick={onSave}>Atualizar</button>
      <button type='button' onClick={onCancel}>Cancelar</button>
      <button type='button' onClick={handleDelete}>Excluir</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default FormEdit;





