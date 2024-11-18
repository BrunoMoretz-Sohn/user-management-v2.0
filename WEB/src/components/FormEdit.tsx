import { useState, useContext } from 'react';
import { RiCalendar2Line, RiAccountBoxLine, RiAtLine } from "react-icons/ri";
import { useMutation } from 'react-query';
import { User, deleteUser } from '../services/userService';
import Button from '../components/commons/Button';
import InputField from '../components/commons/InputField';
import { UserContext } from '../context/UserContext';
import { z } from 'zod';
import { FormContainer, Form, InputContainer} from '../styles/home/form'; 

const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  birthDate: z.string().min(10, 'Data de nascimento é obrigatória'),
});

interface FormEditProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const FormEdit: React.FC<FormEditProps> = ({ user, onSave, onCancel }) => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('UserContext não está disponível no FormEdit.');
  }

  const { setUserToEdit } = context;
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editBirthDate, setEditBirthDate] = useState(user.birthDate);
  const [message, setMessage] = useState('');

  const { mutate: deleteUserMutation } = useMutation(() => deleteUser(user.id), {
    onSuccess: () => {
      setMessage('Exclusão efetuada com sucesso!');
      setUserToEdit(null);
    },
  });

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esse cadastro?')) {
      deleteUserMutation();
    }
  };

  const handleSubmit = () => {
    try {
      userSchema.parse({ name: editName, email: editEmail, birthDate: editBirthDate });
      onSave({ id: user.id, name: editName, email: editEmail, birthDate: editBirthDate });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors.map((err) => err.message).join(', '));
      }
    }
  };

  return (
    <FormContainer> 
      <Form> 
        <header>
          <h1>Editar Usuário</h1>
          <p>Confirme as alterações clicando em &quot;Atualizar&quot;.</p>
        </header>
        <InputContainer> 
          <InputField
            id="editName"
            name="editName"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Nome"
            icon={<RiAccountBoxLine className="input-icon" />}
            type="text"
          />
        </InputContainer>
        <InputContainer> 
          <InputField
            id="editEmail"
            name="editEmail"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email"
            icon={<RiAtLine className="input-icon" />}
            type="email"
          />
        </InputContainer>
        <InputContainer> 
          <InputField
            id="editBirthDate"
            name="editBirthDate"
            value={editBirthDate}
            onChange={(e) => setEditBirthDate(e.target.value)}
            placeholder="Data de Nascimento"
            icon={<RiCalendar2Line className="input-icon" />}
            type="date"
          />
        </InputContainer>
        <Button onClick={handleSubmit} type="button" text="Atualizar" />
        <Button onClick={onCancel} type="button" text="Cancelar" />
        <Button onClick={handleDelete} type="button" text="Excluir" />
        {message && <p>{message}</p>}
      </Form>
    </FormContainer>
  );
};

export default FormEdit;















