import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Loading from '../../components/Loading/Loading';
import Container from '../../components/Container/Container';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import Message from '../../components/Message/Message';
import './Project.css';

function Project(){
    const {id} = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() =>{
        setTimeout(() => {
            fetch(`https://my-json-server.typicode.com/Wesley-Nilton/costsapp/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(data => setProject(data))
            .catch(err => console.log(err))
        }, 300)
    }, [id]);

    function editPost(project){
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!');
            setType('error');
            return false;
        }

        fetch(`https://my-json-server.typicode.com/Wesley-Nilton/costsapp/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
            })
            .then(response => response.json())
            .then(data => {
                setProject(data);
                setShowProjectForm(false);
                setMessage('Projeto atualizado!');
                setType('success');
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    return(
        <>
            {project.name ? (
                <div className='project-details'>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className='details-container'>
                            <h1>Projeto: {project.name}</h1>
                            <button className='btn' onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className='project-info'>
                                    <p><span>Categoria:</span> {project.category.name}</p>
                                    <p><span>Total de Orçamento:</span> R${project.budget}</p>
                                    <p><span>Total Utilizado:</span> R${project.cost}</p>
                                </div>
                            ) : (
                                <div className='project-info'>
                                    <ProjectForm handleSubmit={editPost} btnText='Concluir Edição' projectData={project} />
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project;