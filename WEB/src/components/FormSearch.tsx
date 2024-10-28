import '../pages/home/style.css';
import { RiSearchLine } from "react-icons/ri";

interface FormSearchProps {
  onSearch: () => void;
  searchParam: string;
  setSearchParam: (param: string) => void;
}

const FormSearch: React.FC<FormSearchProps> = ({ onSearch, searchParam, setSearchParam }) => {
  const handleSearch = () => {
    onSearch();
    setSearchParam('');
  };

  return (
    <form>
      <header>
        <h1>Buscar Usuários</h1>
        <p>Efetue a busca digitando uma das informações abaixo.</p>
      </header>
      <div className="input-container">
        <RiSearchLine className="input-icon" />
        <input
          placeholder="ID, Nome ou Email"
          id="searchParam"
          name="searchParam"
          type='text'
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </div>
      <button type='button' onClick={handleSearch}>Buscar</button>
    </form>
  );
};

export default FormSearch;


