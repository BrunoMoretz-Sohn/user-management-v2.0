import '../pages/home/style.css';
import { RiSearchLine } from "react-icons/ri";
import Button from '../components/commons/Button';
import InputField from '../components/commons/InputField';

interface FormSearchProps {
  onSearch: (param: string) => void;
  searchParam: string;
  setSearchParam: (param: string) => void;
}

const FormSearch: React.FC<FormSearchProps> = ({ onSearch, searchParam, setSearchParam }) => {
  const handleSearch = () => {
    onSearch(searchParam);
    setSearchParam('');
  };

  return (
    <form>
      <header>
        <h1>Buscar Usuários</h1>
        <p>Efetue a busca digitando uma das informações abaixo.</p>
      </header>
      <InputField 
        id="searchParam" 
        name="searchParam" 
        value={searchParam} 
        onChange={(e) => setSearchParam(e.target.value)} 
        placeholder="ID, Nome ou Email" 
        icon={<RiSearchLine className="input-icon" />} 
        type="text"
      />
      <Button onClick={handleSearch} type="button" text="Buscar" />
    </form>
  );
};

export default FormSearch;




