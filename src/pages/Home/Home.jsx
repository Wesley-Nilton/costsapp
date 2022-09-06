import LinkButton from '../../components/LinkButton/LinkButton';
import savings from '../../assets/img/savings.svg';
import './Home.css';

function Home(){
    return(
        <section className='home-container'>
            <h1>Bem-vindo(a) ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/newproject' text='Criar Projeto' />
            <img src={savings} alt="Imagem que representa o Costs" />
        </section>
    )
}

export default Home;