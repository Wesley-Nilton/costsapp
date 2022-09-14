import {useNavigate} from 'react-router-dom';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import './NewProject.css';

function NewProject(){
    const navigate = useNavigate();

    function createPost(project){
        // initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch('https://my-json-server.typicode.com/Wesley-Nilton/costsapp/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(response => response.json())
        .then(data => navigate('/projects', {message: 'Projeto criado com sucesso!'}))
        .catch(err => console.log(err))
    }

    return(
        <div className='newproject-container'>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto' />
        </div>
    )
}

export default NewProject;