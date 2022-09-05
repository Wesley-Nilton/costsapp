import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Company from './pages/Company';
import NewProject from './pages/NewProject';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Container from './components/Container/Container';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App(){
  return(
    <Router>
      <Navbar />
      <Container customClass='min-heigth'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/company' element={<Company />} />
          <Route path='/newproject' element={<NewProject />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App;