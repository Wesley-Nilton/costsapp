import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {parse, v4 as uuidv4} from 'uuid';
import Loading from '../../components/Loading/Loading';
import Container from '../../components/Container/Container';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import ServiceForm from '../../components/ServiceForm/ServiceForm';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import Message from '../../components/Message/Message';
import './Project.css';

function Project(){
    const {id} = useParams();
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
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
            .then(data => {
                setProject(data);
                setServices(data.services);
            })
            .catch(err => console.log(err))
        }, 300)
    }, [id]);

    function editPost(project){
        setMessage('');

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

    function createService(project){
        setMessage('');

        // Last service
        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        // Maximum value validation
        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço');
            setType('error');
            project.services.pop();
            return false;
        }

        // Add service cost to project total cost
        project.cost = newCost;

        // Update project
        fetch(`https://my-json-server.typicode.com/Wesley-Nilton/costsapp/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
            })
            .then(response => response.json())
            .then(data => setShowServiceForm(false))
            .catch(err => console.log(err))
    }

    function removeService(id, cost){
        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project;
        projectUpdated.services = servicesUpdate;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(`https://my-json-server.typicode.com/Wesley-Nilton/costsapp/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
            })
            .then(response => response.json())
            .then(data => {
                setProject(projectUpdated);
                setServices(servicesUpdate);
                setMessage('Serviço removido com sucesso!');
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
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
                        <div className='service-form-container'>
                            <h2>Adicione um serviço:</h2>
                            <button className='btn' onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className='project-info'>
                                {showServiceForm && <ServiceForm handleSubmit={createService} btnText='Adicionar Serviço' projectData={project} />}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            {services.length > 0 && services.map((service) => (
                                <ServiceCard id={service.id} name={service.name} cost={service.cost} description={service.description} key={service.id} handleRemove={removeService} />
                            ))}
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project;