import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './Project.css';

function Project(){
    const {id} = useParams();
    const [project, setProject] = useState([]);

    useEffect(() =>{
        fetch(`https://my-json-server.typicode.com/Wesley-Nilton/costsapp/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setProject(data))
        .catch(err => console.log(err))
    }, [id]);

    return(
        <p>{project.name}</p>
    )
}

export default Project;