import { useCallback, useEffect, useRef, useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import './UserNode.css'
import AddHandle from '../../components/AddHandle/AddHandle';


export default function UserNode({ id, data, isConnectable }) {
    const [handlesCount, setHandlesCount] = useState(null)
    const [handleOne, handleTwo, handleThree, handleFour] = [useRef(false), useRef(false), useRef(false), useRef(false)]
    
    const updateNodeInternals = useUpdateNodeInternals();


    useEffect(() => {
        updateNodeInternals(id)

    }, [handlesCount])


    const handleClick = () => {

        if (handlesCount < 4) {

            if (handlesCount === null) {
                handleOne.current = true;

            } else if (handlesCount === 1) {
                handleTwo.current = true;

            } else if (handlesCount === 2) {
                handleThree.current = true;

            } else if (handlesCount === 3) {
                handleFour.current = true;

            }

            setHandlesCount(handlesCount + 1)

        }

    }


    return (
        <div className="user-node">
            {handlesCount < 4 && <AddHandle onClick={handleClick} />}

            {handleOne.current && <Handle
                id='a'
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
            />}

            {handleTwo.current && <Handle
                id="b"
                type="source"
                position={Position.Top}
                isConnectable={isConnectable}
            />}

            {handleThree.current && <Handle
                id="c"
                type="source"
                position={Position.Left}
                isConnectable={isConnectable}
            />}

            {handleFour.current && <Handle
                id="d"
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
            />}

            <div></div>
        </div>
    );
}