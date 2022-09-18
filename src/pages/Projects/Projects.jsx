import {useLocation} from 'react-router-dom';
import Container from '../../components/Container/Container';
import LinkButton from '../../components/LinkButton/LinkButton';
import Message from '../../components/Message/Message';
import './Projects.css';

function Projects(){
    const location = useLocation();
    let message = '';
    
    if(location.state){
        message = location.state.message;
    }

    return(
        <div className='project-container'>
            <div className='title-container'>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type='sucess' msg={message} />}
            <Container customClass='start'>
                <p>Projetos...</p>
            </Container>
        </div>
    )
}

export default Projects;