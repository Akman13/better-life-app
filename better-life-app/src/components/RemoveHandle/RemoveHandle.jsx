import './RemoveHandle.css'

export default function RemoveHandle( { style, onClick:handleClick } ) {

    return (
        <button style={style} className="remove-handle" onClick={handleClick}>
            -
        </button>
    )
}