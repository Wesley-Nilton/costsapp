import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Company from './pages/Company';
import NewProject from './pages/NewProject';
import Contact from './pages/Contact';

function App(){
  return(
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/company'>Empresa</Link>
        <Link to='/newproject'>Novo Projeto</Link>
        <Link to='/contact'>Contato</Link>
      </div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/company' element={<Company />} />
        <Route path='/newproject' element={<NewProject />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <p>Footer</p>
    </Router>
  )
}

export default App;