import { AiOutlineSearch } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

export default function SearchButton() {
  return (
    // <a>やhrefなどでページ遷移を指定するとリロードが発生する
    <NavLink style={({ isActive }) => (isActive ? { color: 'pink' } : undefined)} to="/search" target="_blank">
      <Button>
        <AiOutlineSearch />
      </Button>
    </NavLink>
  );
}
