import { Doctor } from "../types";
import SearchBar from "./SearchBar";

interface HeaderProps {
  doctors: Doctor[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  doctors,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <SearchBar
          doctors={doctors}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </header>
  );
};

export default Header;
