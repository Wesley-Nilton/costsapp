import Input from '../Input/Input';
import './ProjectForm.css';

function ProjectForm(){
    return(
        <form className='form'>
            <Input type='text' text='Nome do Projeto' name='name' placeholder='Insira o nome do projeto' />
            <Input type='number' text='Orçamento do Projeto' name='budget' placeholder='Insira o orçamento total' />
            <div>
                <select name="category-id">
                    <option disabled selected>Selecione a categoria</option>
                </select>
            </div>
            <input type="submit" value="Criar Projeto" />
        </form>
    )
}

export default ProjectForm;