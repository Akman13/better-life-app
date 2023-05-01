import './AddHandle.css'

export default function AddHandle( { style, onClick:handleClick } ) {

    return (
        <button style={style} className="add-handle" onClick={handleClick}>
            +
        </button>
    )
}