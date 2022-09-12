import {useEffect, useState} from 'react';
import Input from '../Input/Input';
import Select from '../Select/Select';
import SubmitButton from '../SubmitButton/SubmitButton';
import './ProjectForm.css';

function ProjectForm({btnText}){
    const [categories, setCategories] = useState([]);

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

    return(
        <form className='form'>
            <Input type='text' text='Nome do Projeto' name='name' placeholder='Insira o nome do projeto' />
            <Input type='number' text='Orçamento do Projeto' name='budget' placeholder='Insira o orçamento total' />
            <Select name='category-id' text='Selecione a categoria' options={categories} />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm;