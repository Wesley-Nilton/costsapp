import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Loading from '../../components/Loading/Loading';
import Container from '../../components/Container/Container';
import './Project.css';

function Project(){
    const {id} = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() =>{
        setTimeout(() => {
            fetch(`https://my-json-server.typicode.com/Wesley-Nilton/costsapp/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(data => setProject(data))
            .catch(err => console.log(err))
        }, 300)
    }, [id]);

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    return(
        <>
            {project.name ? (
                <div className='project-details'>
                    <Container customClass='column'>
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
                                    <p>detalhes do projeto</p>
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