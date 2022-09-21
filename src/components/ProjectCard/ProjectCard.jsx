import {Link} from 'react-router-dom';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs';
import './ProjectCard.css';

function ProjectCard(id, name, budget, category, handleRemove){
    return(
        <div className='project-card'>
            <h4>{name}</h4>
            <p><span>Orçamento:</span> R${budget}</p>
            <p className='category-text'><span className={`${category.toLowerCase()}`}></span> {category}</p>
            <div className='project-card-actions'>
                <Link to='/'><BsPencil /> Editar</Link>
                <button><BsFillTrashFill /> Excluir</button>
            </div>
        </div>
    )
}

export default ProjectCard;