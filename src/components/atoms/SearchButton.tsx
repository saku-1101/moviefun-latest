import { AiOutlineSearch } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';

// import Search from '~/organisms/Search';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function SearchButton() {
  return (
    <Button href="/search">
      <AiOutlineSearch />
    </Button>
  );
}
