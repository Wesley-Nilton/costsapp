import Input from '../Input/Input';
import Select from '../Select/Select';
import './ProjectForm.css';

function ProjectForm(){
    return(
        <form className='form'>
            <Input type='text' text='Nome do Projeto' name='name' placeholder='Insira o nome do projeto' />
            <Input type='number' text='Orçamento do Projeto' name='budget' placeholder='Insira o orçamento total' />
            <Select name='category-id' text='Selecione a categoria' />
            <input type="submit" value="Criar Projeto" />
        </form>
    )
}

export default ProjectForm;