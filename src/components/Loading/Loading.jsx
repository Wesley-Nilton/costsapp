import loading from '../../assets/img/loading.svg';
import './Loading.css';

function Loading(){
    return(
        <div className='loader-container'>
            <img className='loader' src={loading} alt="Imagem de carregamento" />
        </div>
    )
}

export default Loading