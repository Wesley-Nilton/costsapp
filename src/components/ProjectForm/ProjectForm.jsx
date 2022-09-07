import './ProjectForm.css';

function ProjectForm(){
    return(
        <form className='form'>
            <div>
                <input type="text" placeholder="Insira o nome do projeto" />
                <input type="number" placeholder="Insira o orçamento total" />
            </div>
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