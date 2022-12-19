import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import Create from './components/Create/Create';
import Detail from './components/Detail/Detail';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
    <div className="App">
      {/* <SearchBar
        setCurrentPage={setCurrentPage}
      /> */}
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/create' element={<Create />} />
        <Route exact path='/dogs/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
