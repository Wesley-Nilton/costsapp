import './Input.css';

function Input({type, text, name, placeholder, handleOnChange, value}){
    return(
        <div className='form-control'>
            <label htmlFor={name}>{text}:</label>
            <input type={type} id={name} name={name} placeholder={placeholder} onChange={handleOnChange} value={value} />
        </div>
    )
}

export default Input;