import {useEffect, useState} from 'react';
import Input from '../Input/Input';
import Select from '../Select/Select';
import SubmitButton from '../SubmitButton/SubmitButton';
import './ProjectForm.css';

function ProjectForm({handleSubmit, btnText, projectData}){
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/Wesley-Nilton/costsapp/categories', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch((err => console.log(err)))
    }, []);

    const submit = e => {
        e.preventDefault();
        handleSubmit(project);
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value});
    }

    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
            }
        });
    }

    return(
        <form onSubmit={submit} className='form'>
            <Input handleOnChange={handleChange} type='text' text='Nome do Projeto' name='name' placeholder='Insira o nome do projeto' value={project.name ? project.name : ''} />
            <Input handleOnChange={handleChange} type='number' text='Orçamento do Projeto' name='budget' placeholder='Insira o orçamento total' value={project.budget ? project.budget : ''} />
            <Select handleOnChange={handleCategory} name='category-id' text='Selecione a categoria' options={categories} value={project.category ? project.category.id : ''} />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm;