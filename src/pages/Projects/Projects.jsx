import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Container from '../../components/Container/Container';
import LinkButton from '../../components/LinkButton/LinkButton';
import Message from '../../components/Message/Message';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Loading from '../../components/Loading/Loading';
import './Projects.css';

function Projects(){
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    const location = useLocation();
    let message = '';
    
    if(location.state){
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('https://my-json-server.typicode.com/Wesley-Nilton/costsapp/projects', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch(err => console.log(err))
        }, 300)
    }, []);

    return(
        <div className='project-container'>
            <div className='title-container'>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type='sucess' msg={message} />}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map(project => (
                        <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name} key={project.id} />
                    ))
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects;