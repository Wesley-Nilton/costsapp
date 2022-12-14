import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home/Home';
import Company from './pages/Company';
import NewProject from './pages/NewProject/NewProject';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact';
import Project from './pages/Project/Project';
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
          <Route path='/project/:id' element={<Project />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App;