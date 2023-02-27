import './App.css';
import { Routes, Route } from 'react-router-dom';
import Search from './components/organisms/Search';
import Home from './components/templates/Home';
import NotFound from './components/templates/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
